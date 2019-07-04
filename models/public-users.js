const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var publicUserSchema = new Schema({
  publicBodyName: {
    type: String,
    required: true
  },
  tinNumber: {
    type: String,
    required: true
  },
  conactPersonName: {
    type: String,
  }
});


module.exports = mongoose.model('PublicUser', publicUserSchema);