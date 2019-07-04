var mongoose = require('mongoose');


var bidChangeRequestSchema = new mongoose.Schema({
    bid: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'BidData'
    },
    requester: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'PublicUser'
    },
    timeOfRequest: {
        type: Date,
        default: Date.now()
    },
    changeType: {
        type: String
    },
    changedFields: {
        type: Array
    },
    status: {
        type: String,
        default: 'pending'
    }
    
});

module.exports = mongoose.model('BidChangeRequest', bidChangeRequestSchema);