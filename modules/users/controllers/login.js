const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwtManager = require("../../../managers/jwtManager");
require("dotenv").config();

const login = async (req, res) => {
    const userModel = mongoose.model('users');
    const {email, password} = req.body;

    if (!email) {
        throw "email is required";
    }
    if (!password) {
        throw "password is required";
    }

    const existingUser = await userModel.findOne({email});
    if (!existingUser) {
        throw "User doesn't exist with this email";
    }

    const passMatched = await bcrypt.compare(password, existingUser.password);
    if (!passMatched) {
        throw "User credentials did not match";
    }

    const accessToken = jwtManager(existingUser);

    return res.status(200).json({
        message: "User logged in successfully",
        accessToken
    });
}

module.exports = login;