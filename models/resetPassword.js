const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;


const userSchema = new Schema({
   
    user: {
        type: String,
        required: true,
        unique: true,
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date
});

module.exports = mongoose.model('ResetPassword', userSchema);