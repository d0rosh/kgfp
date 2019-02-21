const jwt = require('jsonwebtoken'); 
const User = require('../models/user');
const Profile = require('../models/profile');
const keys = require('../configuration/keys');


module.exports = {
    login: async (req,res,next)=>{
        const candidate = await User.findOne({email: req.body.email});
        if(candidate){
            const profile = await Profile.findOne({user: candidate._id});
            const comparePass = candidate.checkPassword(req.body.password);
            if(comparePass){
                const token = jwt.sign({
                    email: candidate.email, 
                    userId: candidate._id
                }, keys.jwt, {expiresIn: 60 * 60})

                res.status(200).json({
                    token: `Bearer ${token}`,
                    user: {
                        lastName: candidate.lastName,
                        firstName: candidate.firstName,
                        email: candidate.email,
                        role: candidate.role,
                        _id: candidate._id,
                        avatar: profile.avatar,
                        date: profile.date
                    }
                });
            }else{
                const error = new Error('Password is false!');
                error.status = 401;
                next(error);
            }
        }else {
            const error = new Error('Such email does not exist!');
            error.status = 404;
            next(error);
        }
    },
    signup: async (req,res,next)=>{
        const candidate = await User.findOne({email: req.body.email})

        if(candidate){
            const error = new Error('Such email already exists!');
            error.status = 409;
            next(error);
        }else {
            const user = new User(req.body);
            const profile = new Profile({user: user._id});

            try {
                await user.save();
                await profile.save();
                
                res.status(201).json({
                    message: 'Success'
                })
            }catch(e){
                next(e);
            }
        }
    }
}