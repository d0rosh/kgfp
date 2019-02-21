const express = require('express');
const router = express.Router();
const passport = require('passport');
const ProfileController = require('../controllers/profile');

router.get('/current_user', passport.authenticate('jwt', {session: false}), ProfileController.getUser);
router.get('/get_users', passport.authenticate('jwt', {session: false}), ProfileController.getUsers);

module.exports = router;