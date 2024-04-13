const express = require('express');
const router = express.Router();
const { loginHandler, signupHandler, getUsersHandler } = require('../controllers/user-handler');

// authentication middleware
const Authenticate = require('../helpers/authenticate');
router.post('/login', loginHandler);
router.post('/sign-up', signupHandler);
router.get('/getAllUsers', Authenticate, getUsersHandler);
router.post('/logout', loginHandler);

module.exports = router;
