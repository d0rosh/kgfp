const Profile = require('../models/profile');
const User = require('../models/user');

module.exports = {
    getUser: async (req, res, next) => {
        const profile = await Profile.findOne({ user: req.user._id })
        if (profile) {
            res.status(200).json({
                lastName: req.user.lastName,
                firstName: req.user.firstName,
                email: req.user.email,
                role: req.user.role,
                _id: req.user._id,
                avatar: profile.avatar,
                date: profile.date
            });
        } else {
            next(error);
        }
    },
    getUsers: async (req, res, next) => {
        const users = await User.find({});
        if(users) {
            res.status(200).json(users);
        }else {
            const error = new Error('Users not found!');
            error.status = 404;
            next(error);
        }
    }
}