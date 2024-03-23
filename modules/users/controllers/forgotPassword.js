const mongoose = require('mongoose');
const nodeMailerTransportManager = require("../../../managers/nodeMailerTransportManager");

const forgotPassword = async (req, res) => {
    const userModel = mongoose.model('users');
    const {email} = req.body;

    if (!email) {
        throw "email is required";
    }

    const existingUser = await userModel.findOne({email});
    if (!existingUser) {
        throw "No user found with this email";
    }

    const resetCode = Math.floor(10000 + Math.random() * 90000);

    existingUser.reset_code = resetCode;
    await existingUser.save();

    nodeMailerTransportManager().sendMail({
        to: existingUser.email,
        from: 'info@expensetracker.com',
        text: 'Your password reset code is: ' + resetCode,
        html: 'Your password reset code is: ' + resetCode,
        subject: "Forgot Password Code"
    });

    return res.status(200).json({
        status: 'success',
        message: "Reset code sent to email"
    });
}

module.exports = forgotPassword;