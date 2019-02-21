const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    Title: String,
    Poster: String,
    Country: String,
    Year: String,
    imdbID: String,
    Runtime: String,
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    }
});

const Movie = mongoose.model('movie', movieSchema);

module.exports = Movie;


