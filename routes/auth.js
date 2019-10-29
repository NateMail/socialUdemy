const express = require('express');
const { signup } = require('../controllers/auth');
const { userSignupValidator } = require('../controllers/validator');

const router = express.Router();

router.post('/signup', userSignupValidator, signup);

module.exports = router;
