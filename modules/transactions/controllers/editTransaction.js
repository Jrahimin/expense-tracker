const mongoose = require("mongoose");
const validator = require("validator");

const editTransaction = async (req, res) => {
    const userModel = mongoose.model('users');
    const transactionModel = mongoose.model('transactions');

    const {id, amount = null, remark = null} = req.body;

    if (!id || !validator.isMongoId(id.toString())) {
        throw "Please provide a valid id";
    }
    if (amount !== null && (!validator.isNumeric(amount.toString()) || amount < 0)) {
        throw "Amount must be a positive number";
    }

    const transaction = await transactionModel.findById(id);
    if (!transaction) {
        throw "Transaction is not found";
    }

    let amountDiff = 0;
    if (amount !== null) {
        amountDiff = transaction.amount - amount;
        transaction.amount = amount;
    }
    if (remark) {
        transaction.remark = remark;
    }

    await transaction.save();

    if (amountDiff !== 0) {
        const amountToAdjust = transaction.type === 'income' ? amountDiff * -1 : amountDiff;

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
    }

    return res.status(200).json({
        status: 'success',
        message: "Transaction updated successfully"
    });
}

module.exports = editTransaction;