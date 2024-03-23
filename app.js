require('express-async-errors');
const express = require('express');
const cors = require('cors');
require("dotenv").config();
const errorHandler = require('./handlers/errorHanlder');
const mongoose = require('mongoose');
const userRoutes = require('./modules/users/users.routes');
const transactionRoutes = require('./modules/transactions/transactions.routes');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_CONNECTION, {})
    .then(() => {
        console.log('connection to mongo db successful');
    }).catch(() => {
    console.log('connection to mongo db failed');
});

// Starting the server
app.listen(9000, () => {
    console.log("Server started successfully!");
});

require('./modules/users/users.model');
require('./modules/transactions/transactions.model');

app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);

app.all('*', (req, res, next) => {
    return res.status(404).json({
        status: 'failed',
        message: 'Not found',
    })
});

app.use(errorHandler);