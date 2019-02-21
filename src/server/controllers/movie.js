const Movie = require('../models/movie');

module.exports = {
    getMovies: async (req, res, next)=>{
        const movies = await Movie.find({user: req.user._id})

        if(movies) {
            res.status(200).json(movies);
        }else {
            const error = new Error('Movies not found!');
            error.status = 404;
            next(error);
        }
    },
    addMovie: async (req, res, next)=>{
        req.body.user = req.user._id;
        const movie =  new Movie(req.body);

        try {
            await movie.save();
            
            res.status(201).json({
                message: 'Successfully added!'
            })
        }catch(e){
            next(e);
        }
    },
    deleteMovie: async (req, res, next)=>{
        const movie = Movie.findOne({user: req.user._id, imdbID: req.params.id})
        // await Movie.deleteOne({user: req.user._id, imdbID: req.params.id});

        try{
            await Movie.deleteOne(movie);
            res.status(201).json({
                message: 'Successsuccessfully deleted!'
            });
        }catch(e){
            next(e);
        }
    }
}