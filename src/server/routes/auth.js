const express = require('express');
const router = express.Router();
const passport = require('passport');
const AuthController = require('../controllers/auth');

router.post('/login' , AuthController.login);
router.post('/signup', AuthController.signup);
// passport.authenticate('jwt', {session: false})
module.exports = router;