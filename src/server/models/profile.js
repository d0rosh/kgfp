const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    avatar: {
        type: String,
        default: ''
    },
    date: {
        type: Date,
        default: Date.now
    },
    gender: {
        type: String
    },
    age: {
        type: String
    },
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    }
});

const Profile = mongoose.model('profile', profileSchema);

module.exports = Profile;


