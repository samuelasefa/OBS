const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var adminSchema = new Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    }

})


module.exports = mongoose.model('Admin', adminSchema);