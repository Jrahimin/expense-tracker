const mongoose = require("mongoose");

const userDashboard = async (req, res) => {
    const userModel = mongoose.model('users');
    const transactionModel = mongoose.model('transactions');

    const user = await userModel.findById(req.user._id)
        .select("-password");

    const transactions = await transactionModel.find({
        user_id: req.user._id
    }).sort('-createdAt').limit(5);

    return res.status(200).json({
        status: "success",
        data: user,
        transactions
    });
}

module.exports = userDashboard;