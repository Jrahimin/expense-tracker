const mongoose = require("mongoose");
const validator = require("validator");

const deleteTransaction = async (req, res) => {
    const userModel = mongoose.model('users');
    const transactionModel = mongoose.model('transactions');

    const {id} = req.params;

    if (!validator.isMongoId(id.toString())) {
        throw "Please provide a valid id";
    }

    const transaction = await transactionModel.findById(id);
    if (!transaction) {
        throw "Transaction is not found";
    }

    const amountToAdjust = transaction.type === 'income' ? transaction.amount * -1 : transaction.amount;

    await userModel.updateOne(
        {
            _id: req.user._id
        },
        {
            $inc: {
                balance: amountToAdjust
            }
        },
        {
            runValidators: true
        }
    );

    await transaction.deleteOne();

    return res.status(200).json({
        status: 'success',
        message: "Transaction deleted successfully"
    });
}

module.exports = deleteTransaction;