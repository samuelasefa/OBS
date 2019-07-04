const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
    UserType: {
        type: String,
        required: true,
        unique: true
    },
    post: {
        type: Number,
        required: true
    },
    price: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        validate: emailValidators
    },
    Date: {
        type: Number,
    },
});

userSchema.plugin(uniqueValidator)
module.exports = mongoose.model('MangeUser', userSchema);