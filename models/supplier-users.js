const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var supplierSchema = new Schema({
  companyName: {
    type: String,
    required: true,
  },
  tinNumber: {
    type: String,
    required: true,
    uniqueCaseInsensitive:true
  },

});

supplierSchema.plugin(uniqueValidator, {
  message: 'Error expexted thing must be unique'
});
module.exports = mongoose.model('Supplier', supplierSchema);