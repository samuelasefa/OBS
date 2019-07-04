// importing node modle

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
// Validate Function to check Bid Name length
let bidnameLengthChecker = (bid_name) => {
  // Check if new post title  exists
  if (!bid_name) {
    return false; // Return error
  } else {
    // Check the length of title
    if (bid_name.length < 5 || bid_name.length > 250) {
      return false; // Return error if not within proper length
    } else {
      return true; // Return as valid title
    }
  }
};

// Validate Function to check if valid bidname format
let alphaNumericBidNameChecker = (bid_name) => {
  // Check if bidname exists
  if (!bid_name) {
    return false; // Return error
  } else {
    // Regular expression to test for a valid bidname
    const regExp = new RegExp(/^[a-zA-Z0-9 ]+$/);
    return regExp.test(bid_name); // Return regular expression test results (true or false)
  }
};

// Array of Title Validators
const bidnameValidators = [
  // First Title Validator
  {
    validator: bidnameLengthChecker,
    message: 'Bid Name must be more than 5 characters but no more than 50'
  },
  // Second Title Validator
  {
    validator: alphaNumericBidNameChecker,
    message: 'BidName must be alphanumeric'
  }
];

let bidnumberLengthChecker = (bid_number) => {
  // Check if new post bid_number  exists
  if (!bid_number) {
    return false; // Return error
  } else {
    // Check the length of bid_number
    if (bid_number.length == 10) {
      return false; // Return error if not within proper length
    } else {
      return true; // Return as valid title
    }
  }
};

// Validate Function to check if valid bidname format
let alphaNumericbid_numberChecker = (bid_number) => {
  // Check if bidname exists
  if (!bid_number) {
    return false; // Return error
  } else {
    // Regular expression to test for a valid bidname
    const regExp = new RegExp(/^[0-9]+$/);
    return regExp.test(bid_number); // Return regular expression test results (true or false)
  }
};

// Array of BidNumber Validators
const bidnumberValidators = [
  // First BidNumber Validator
  {
    validator: bidnumberLengthChecker,
    message: 'BidNumber must be 10 character'
  },
  // Second BidNumber Validator
  {
    validator: alphaNumericbid_numberChecker,
    message: 'BidNumber must be alphanumeric'
  }
];

let bidpostanddeadlinedateValidation = (bid_postdate,bid_deadline) => {
  if (!bid_postdate && !bid_deadline) {
    return false; // Return error
  } else {
    // Check the length of bid_postdate
    if (DateTim) {
      return false; // Return error if not within proper length
    } else {
      if(bid_deadline = bid_postdate){
        return false;
      }else{
        return true;
      }
    }
  }
};

// Array of bid_postdate and bid_postdate Validators
const dateValidators = [
  // First bidnpostanddeadline Validator
  {
    validator: bidpostanddeadlinedateValidation,
    message: 'Bid Postdate must be Less than Deadline date'
  }
];


const bidSchema = new Schema(
  {
    bid_name: {
      type: String,
      required: true,
      validate: bidnameValidators
    },
    bid_number: {
      type: Number,
      required: true,
      validate: bidnumberValidators
    },
    bid_postdate: {
      type: Date,
      default: Date.now()
    },
    bid_deadline: {
       type: Date,
       required: true,
       lowercase: true
     },
    bid_desc: {
      type: String
    },
    bid_inital: {
      type: Number,
      require: true
    },
    file: { 
      type: String
    },
    status: {
      type: String
    },
    isResolved: {
      type: Boolean,
      default: false
    },
    publicBody: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'PublicUser'
    },
    winner: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Supplier'
    }
  },
  { versionKey: false }
);
module.exports = mongoose.model("BidData", bidSchema);
