const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const nodeMailerTransportManager = require("../../../managers/nodeMailerTransportManager");

const resetPassword = async (req, res) => {
    const userModel = mongoose.model('users');
    const {email, new_password, reset_code} = req.body;

    if (!email) {
        throw "email is required";
    }
    if (!new_password) {
        throw "new password is required";
    }
    if (!reset_code) {
        throw "reset code is required";
    }

    const existingUser = await userModel.findOne({email});
    if (!existingUser) {
        throw "No user found with this email";
    }

    if (existingUser.reset_code !== parseInt(reset_code)) {
        throw "Reset code does not match";
    }

    existingUser.password = await bcrypt.hash(new_password, 16);
    existingUser.reset_code = "";
    await existingUser.save();

    nodeMailerTransportManager().sendMail({
        to: existingUser.email,
        from: 'info@expensetracker.com',
        text: 'Your password has been reset successfully',
        html: 'Your password has been reset successfully',
        subject: "Password Reset"
    });

    return res.status(200).json({
        status: 'success',
        message: "Password has been reset successfully"
    });
}

module.exports = resetPassword;