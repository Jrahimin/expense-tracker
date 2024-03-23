const express = require('express');
const auth = require("../../middlewares/auth");
const addIncome = require("./controllers/addIncome");
const addExpense = require("./controllers/addExpense");
const getTransactions = require("./controllers/getTransactions");
const deleteTransaction = require("./controllers/deleteTransaction");
const editTransaction = require("./controllers/editTransaction");
const transactionsRoutes = express.Router();

transactionsRoutes.use(auth);
transactionsRoutes.post('/', getTransactions);
transactionsRoutes.post('/add-income', addIncome);
transactionsRoutes.post('/add-expense', addExpense);
transactionsRoutes.patch('/', editTransaction);
transactionsRoutes.delete('/:id', deleteTransaction);

module.exports = transactionsRoutes;