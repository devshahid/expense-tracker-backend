const express = require('express');
const router = express.Router();
const userRoute = require('./user-route');
const transactionRoute = require('./transaction-route');
router.use('/user', userRoute);
router.use('/transactions', transactionRoute);

router.get('/allUsers', (req, res) => {
  res.send('all users list');
});

module.exports = router;
