const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
var passportLocalMongoose = require('passport-local-mongoose');

// email length checker
let emailLengthChecker = (email) => {
  // Check if e-mail exists
  if (!email) {
    return false; // Return error
  } else {
    // Check the length of e-mail string
    if (email.length < 5 || email.length > 30) {
      return false; // Return error if not within proper length
    } else {
      return true; // Return as valid e-mail
    }
  }
};

// Validate Function to check if valid e-mail format
let validEmailChecker = (email) => {
    // Check if e-mail exists
    if (!email) {
        return false; // Return error
    } else {
        // Regular expression to test for a valid e-mail
        const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return regExp.test(email); // Return regular expression test results (true or false)
    }
};

// Array of Email Validators
const emailValidators = [
    // First Email Validator
    {
        validator: emailLengthChecker,
        status: 'E-mail must be at least 5 characters but no more than 30'
    },
    // Second Email Validator
    {
        validator: validEmailChecker,
        status: 'Must be a valid e-mail'
    }
];

const User = new Schema({
    email: {
        type: String,
        validate: emailValidators
    },
    phoneNumber: {
        type: String,
    },
    userType: {
        type: String,
        default: 'supplierUser'
    },  
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    },
    publicUser: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PublicUser'
    },
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier'
    }
});

User.plugin(passportLocalMongoose);
User.plugin(uniqueValidator,{message:'Error expexted thing must be unique'});
module.exports = mongoose.model('User', User); 