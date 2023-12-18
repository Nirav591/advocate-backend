const express = require('express');
const { createUser, loginUser } = require('../controller/auth.controller');
const { checkUsernameOrEmail } = require('../middlewares/verify-signup');
const router = express.Router();

router.post('/sign-up', checkUsernameOrEmail, createUser);
router.post('/sign-in', loginUser);

module.exports = router;
