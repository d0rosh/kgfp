const express = require('express');
const router = express.Router();
const passport = require('passport');
const MovieController = require('../controllers/movie');

router.get('/get_movies', passport.authenticate('jwt', {session: false}), MovieController.getMovies);
router.post('/add_movie', passport.authenticate('jwt', {session: false}), MovieController.addMovie);
router.delete('/delete_movie/:id', passport.authenticate('jwt', {session: false}), MovieController.deleteMovie);


module.exports = router;