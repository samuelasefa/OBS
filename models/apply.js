const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
    bid: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'BidData'
    },
    companyName: {
        type: String
    },
    transaction: {
        type: String,
        required: true,
        unique: true
    },
    amount: {
        type: Number
    },
    applier: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Supplier'
    },
    documentsFiles: {
        type: Object,
    },
    status: {
        type: String,
        default: 'pending'
    },
    timeOfApplication: {
        type: Date,
        default: Date.now()
    },
    areDocumentsSubmitted: {
        type: Boolean,
        default: false
    }
});
userSchema.plugin(uniqueValidator)
module.exports = mongoose.model('Apply', userSchema);