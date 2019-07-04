var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var notificationSchema = new Schema({
    publicUser: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'PublicUser'
    },
    supplierUser: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Supplier'
    },
    bidder: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'PublicUser'
    },
    winner: {
        type: Object
    },
    reason: {
        type: String
    },
    bid: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'BidData'
    },
    message: {
        type: String
    },
    dateTime: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Notification', notificationSchema);