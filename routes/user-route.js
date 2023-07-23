const express = require('express');
const router = express.Router();
const { loginHandler, signupHandler, getUsersHandler } = require('../controllers/user-handler');

router.post('/login', loginHandler);
router.post('/sign-up', signupHandler);
router.get('/getAllUsers', getUsersHandler);

module.exports = router;
