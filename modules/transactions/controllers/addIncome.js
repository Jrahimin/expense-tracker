const mongoose = require("mongoose");
const validator = require("validator");

const addIncome = async (req, res) => {
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
        type: 'income'
    });

    await userModel.updateOne(
        {
            _id: req.user._id
        },
        {
            $inc: {
                balance: amount
            }
        },
        {
            runValidators: true
        }
    );

    return res.status(200).json({
        status: 'success',
        message: "Income added successfully"
    });
}

module.exports = addIncome;