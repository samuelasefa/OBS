var express = require('express');
var _router = express.Router();
var multer = require('multer');
var path = require('path');
var cors = require('cors');
var BidData = require('../models/bid-data');
var Apply = require('../models/apply');
var fs = require('fs');

var store = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.' + file.originalname);
    }
});


var upload = multer({
    storage: store
}).single('file');
// _router.use(cors());
var multiUpload = multer({
    storage: store
}).array('files');

_router.post('/upload/:id', function (req, res, next) {
    console.log(req.params.id);
    upload(req, res, function (err) {
        if (err) {
            return res.status(501).json({
                error: err
            });
        }
        //do all database record saving activity
        else {
            console.log(req.file)
            BidData.findById(req.params.id)
                .then(
                    bid => {
                        bid.file = req.file.filename;
                        bid.save()
                            .then(updatedBid => {
                                res.status(200).json(
                                    {
                                        originalname: req.file.originalname,
                                        uploadname: req.file.filename
                                    }
                                )
                            })
                            .catch(
                                err => {
                                    return res.status(501).json({
                                        error: err
                                    });
                                }
                            )
                    }
                )
                .catch(
                    err => {
                        return res.status(501).json({
                            error: err
                        });
                    }
                )
        }
    });
});

_router.post('/submitBidInfo/:applyId', (req, res) => {
    multiUpload(req, res, function (err) {
        if (err) {
            res.status(500).json({
                message: 'Error while storing files'
            })
        }
        else {
            var biddingAmount = parseInt(req.body.amount);
            var license = req.files[0].filename;
            var cpo = req.files[1].filename;
            var bidInfoDocument = req.files[2].filename;

            Apply.findById(
                req.params.applyId
            )
                .populate('bid')
                .then(
                    application => {
                        console.log(biddingAmount);
                        if (biddingAmount < application.bid.bid_inital) { 

                            fs.unlinkSync(path.join(__dirname, '../uploads') + '/' + license);
                            fs.unlinkSync(path.join(__dirname, '../uploads') + '/' + cpo);

                            res.status(200).json(
                                {
                                    success: false,
                                    message: 'The amount must be greater than bidding intial ('+application.bid.bid_inital+' ETB)'
                                }
                            );
                        }
                        else {
                            application.documentsFiles = {
                                bussinessLicense: license,
                                cpoScan: cpo,
                                bidInformation: bidInfoDocument
                            }
                            application.amount = biddingAmount;
                            application.areDocumentsSubmitted = true;
                            application.save()
                                .then(
                                    updatedApplication => {
                                        console.log(updatedApplication)
                                        res.json({
                                            success: true,
                                            message: 'Succesfully submitted your application'
                                        })
                                    }
                                )
                                .catch(
                                    err => {
                                        console.log(err)
                                    }
                                )
                        }
                    }
                )
                .catch(
                    err => {
                        console.log(err)
                    }
                )
        }
    });

});
_router.post('/download', function (req, res, next) {
    filepath = path.join(__dirname, '../uploads') + '/' + req.body.filename;
    res.sendFile(filepath);
});

module.exports = _router;