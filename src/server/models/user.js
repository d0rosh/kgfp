const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');


const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    }

});

userSchema.pre('save', function(next){
    const self = this;
    const salt = bcrypt.genSaltSync(10);
    const password = self.password;
    self.password = bcrypt.hashSync(password, salt);
    next();
});

userSchema.methods.checkPassword = function(password){
    const self = this;
    return bcrypt.compareSync(password, self.password);
}

const User = mongoose.model('users', userSchema);


module.exports = User;