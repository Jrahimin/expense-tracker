const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwtManager = require("../../../managers/jwtManager");
const nodeMailerTransportManager = require("../../../managers/nodeMailerTransportManager");

const register = async (req, res) => {
    const userModel = mongoose.model('users');
    const {name, email, password, confirm_password, balance} = req.body;

    if (!name) {
        throw "name is required";
    }
    if (!email) {
        throw "email is required";
    }
    if (!password) {
        throw "password is required";
    }
    if (!confirm_password) {
        throw "confirm password is required";
    }
    if (password !== confirm_password) {
        throw "confirm password did not match";
    }

    const existingUser = await userModel.findOne({email});
    if (existingUser) {
        throw "User already registered with this email";
    }

    const hashedPass = await bcrypt.hash(password, 16);

    const user = await userModel.create({
        name,
        email,
        password: hashedPass,
        balance
    });

    const accessToken = jwtManager(user);

    nodeMailerTransportManager().sendMail({
        to: user.email,
        from: 'info@expensetracker.com',
        text: 'Welcome to Expense Tracker. Enjoy the platform and make your daily budget calculation easy.',
        html: '<h1>Welcome to Expense Tracker</h1>. <br/><br/> Enjoy the platform and make your daily budget calculation easy.',
        subject: "Registration successful"
    });

    return res.status(200).json({
        message: "User is registered successfully",
        accessToken
    });
}

module.exports = register;