const express = require('express');
const router = express.Router();
const { addTransactionHandler, getTransaction } = require('../controllers/transaction-handler');

router.post('/add-transactions', addTransactionHandler);
router.get('/get-transaction/:id', getTransaction);

module.exports = router;
