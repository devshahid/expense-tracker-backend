const express = require('express');
const router = express.Router();
const { addTransactionHandler } = require('../controllers/transaction-handler');

router.post('/add-transactions', addTransactionHandler);

module.exports = router;
