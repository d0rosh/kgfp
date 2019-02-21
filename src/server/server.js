const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const keys = require('./configuration/keys');



mongoose.connect(keys.mongoURI)
    .then(()=>console.log('MongoDB connected.'))
    .catch(error => console.log(error))


// ****MIDDLEWARES****
app.use(passport.initialize());
require('./middleware/passport')(passport);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());


const auth = require('./routes/auth');
const profile = require('./routes/profile');
const movie = require('./routes/movie');
app.use('/auth', auth);
app.use('/profile', profile);
app.use('/movie', movie);


// ****HANDLING ERRORS****

app.use((req,res,next)=>{
    const err = new Error('not found!')
    err.status = 404;
    next(err);
})


app.use((err,req,res,next)=>{
    const status = err.status || 500;
    res.status(status).json({
        message: err.message
    })
})

const port = process.env.PORT || 3333;
app.listen(port, function(){
    console.log(`Server listen port ${port}`);
});

module.exports = app;