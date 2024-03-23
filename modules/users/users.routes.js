const express = require('express');
const register = require('./controllers/register');
const login = require("./controllers/login");
const userDashboard = require("./controllers/userDashboard");
const auth = require("../../middlewares/auth");
const forgotPassword = require("./controllers/forgotPassword");
const resetPassword = require("./controllers/resetPassword");
const userRoutes = express.Router();

userRoutes.post('/register', register);
userRoutes.post('/login', login);
userRoutes.post('/forgot-pass', forgotPassword);
userRoutes.post('/reset-pass', resetPassword);

userRoutes.use(auth);
userRoutes.post('/dashboard', userDashboard);

module.exports = userRoutes;