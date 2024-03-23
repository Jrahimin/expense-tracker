const mongoose = require("mongoose");
const validator = require("validator");

const addExpense = async (req, res) => {
    const userModel = mongoose.model('users');
    const transactionModel = mongoose.model('transactions');

    const {amount, remark} = req.body;

    if (!amount) {
        throw "Amount is required";
    }
    if (!validator.isNumeric(amount.toString())) {
        throw "Amount must be a number";
    }
    if(amount < 0) {
        throw "Amount can not be negative";
    }

    await transactionModel.create({
        user_id: req.user._id,
        amount,
        remark,
        type: 'expense'
    });

    await userModel.updateOne(
        {
            _id: req.user._id
        },
        {
            $inc: {
                balance: amount * -1
            }
        },
        {
            runValidators: true
        }
    )

    return res.status(200).json({
        status: 'success',
        message: "Expense added successfully"
    });
}

module.exports = addExpense;