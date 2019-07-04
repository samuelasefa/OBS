const BidData = require('../models/bid-data');
const PublicUser = require("../models/public-users");
const SupplierUser = require("../models/supplier-users");
const Apply = require("../models/apply");
const Notification = require('../models/notifiation');
const BidChangeRequest = require('../models/bid-change-request');
const authenticate = require('../authenticate');
const User = require('../models/user');
const jwt = require("jsonwebtoken");
const config = require("../config/database");
var path = require('path');
// const upload = require('../uploadHandler');

module.exports = router => {
  router.post('/newBid', authenticate.verifyUser, (req, res) => {
    if (!req.body.bid_name) {
      res.json({
        success: false,
        message: 'must provide bid name'
      })
    } else {
      if (!req.body.bid_number) {
        res.json({
          success: false,
          message: 'must provide bid_number'
        })
      } else {
        if (!req.body.bid_deadline) {
          res.json({
            success: false,
            message: 'must provide bid deadline date'
          })
        } else {
          //  console.log(Date.parse(req.body.bid_deadline.toString()));
          var deadline = Date.parse(req.body.bid_deadline.toString());
          var currentTime = Date.now();
          // console.log("it is working: ", );
          if (deadline > currentTime) {
            const bid = new BidData(req.body);
            bid.save((err, bid) => {
              if (err) {
                if (err.code === 11000) {
                  res.json({
                    success: false,
                    message: "Bid is arlready created before !!!"
                  });
                } else {
                  if (err.errors) {
                    if (err.errors.bid_name) {
                      res.json({
                        success: false,
                        message: err.errors.bid_name.message
                      });
                    } else {
                      if (err.errors.bid_number) {
                        res.json({
                          success: false,
                          message: err.errors.bid_number.message
                        });
                      } else {
                        if (err.errors.bid_deadline) {
                          res.json({
                            success: false,
                            message: err.errors.bid_deadline.message
                          });
                        } else {
                          res.json({
                            success: false,
                            message: err.errmsg
                          });
                        }
                      }
                    }
                  } else {
                    res.json({
                      success: false,
                      message: err
                    });
                  }
                }
              } else {
                res.json({
                  success: true,
                  message: 'Bid is creted succesfully',
                  bid: bid
                })
              }
            });
          } else {
            res.json({
              success: false,
              message: 'Deadline must be ahead of current time'
            })
          }

        }
      }
    }
  });

  /* ===============================================================
     GET ALL Bids thie futture for the bids
  =============================================================== */
  router.get('/allBids', authenticate.verifyUser, (req, res) => {

    if (req.user.userType === 'supplierUser') {
      BidData.find({
        bid_deadline: {
          $gte: Date.now()
        }
      }, (err, bids) => {
        if (err) {
          res.json({
            success: false,
            message: err
          }); // Return error message
        } else {
          // Check if blogs were found in database
          if (!bids) {
            res.json({
              success: false,
              message: 'No bids found.'
            }); // Return error of no blogs found
          } else {
            res.json({
              success: true,
              bids: bids
            }); // Return success and blogs array
          }
        }
      }).sort({
        '_id': -1
      });
    } else {
      BidData.find({
        publicBody: req.user.publicUser._id
      }, (err, bids) => {
        if (err) {
          res.json({
            success: false,
            message: err
          }); // Return error message
        } else {
          // Check if blogs were found in database
          if (!bids) {
            res.json({
              success: false,
              message: 'No bids found.'
            }); // Return error of no blogs found
          } else {
            res.json({
              success: true,
              bids: bids
            }); // Return success and blogs array
          }
        }
      }).sort({
        '_id': -1
      });
    }
    // Sort bids from newest to oldest
  });
  // get single bid
  router.get('/singleBid/:id', authenticate.verifyUser, (req, res) => {
    if (!req.params.id) {
      res.json({
        success: false,
        message: 'No bid id is provided'
      });
    } else {
      BidData.findById(
        req.params.id
      )
        .populate('winner')
        .populate('publicBody')
        .then(
          bid => {
            res.json(
              {
                success: true,
                bid: bid
              }
            )
          }
        )
        .catch(
          err => {
            res.json({
              success: false,
              message: 'Error while getting bid...'
            });
          }
        );

    }
  });
  // geting the supplier list
  router.get('/supplierlist', (req, res) => {
    SupplierList.find({}, (err, lists) => {
      if (err) {
        res.json({
          success: false,
          message: err
        }); // Return error message
      } else {
        // Check if blogs were found in database
        if (!lists) {
          res.json({
            success: false,
            message: 'No list is found.'
          }); // Return error of no blogs found
        } else {
          res.json({
            success: true,
            lists: lists
          }); // Return success and blogs array
        }
      }
    }).sort({
      '_id': -1
    }); // Sort bids from newest to oldest
  });

  // update bid
  router.post('/updateBid', authenticate.verifyUser, (req, res) => {
    // console.log('The id', req.params.id);
    console.log('the body', req.body)
    var bidId = req.body[req.body.length - 1].bid_id;
    console.log('The bid is ', bidId)
    req.body.pop();
    console.log(' The updated ', req.body)
    BidChangeRequest.create(
      {
        bid: bidId,
        requester: req.user.publicUser,
        changedFields: req.body,
        changeType: 'update'
      }
    )
      .then(
        bidRequest => {
          res.json(
            {
              success: true,
              message: 'successfully submitted your change request'
            }
          )
        }
      )
      .catch(
        err => {
          res
            .status(500)
            .json(
              {
                success: false,
                message: 'Error while submitting your change request'
              }
            )
        }
      )
  })

  router.get('/updateRequests', (req, res) => {
    BidChangeRequest.find({
      status: 'pending'
    })
      .populate('bid')
      .populate('requester')
      .then(
        requests => {
          res.json(requests)
        }
      )
      .catch(
        err => {
          res.status(500).json(err);
        }
      )
  });

  router.post('/approveChangeRequest', (req, res) => {
    BidData.findById(req.body._id)
      .then(
        bid => {
          bid.bid_name = req.body.bid_name;
          bid.bid_postdate = req.body.bid_postdate;
          bid.bid_number = req.body.bid_number;
          bid.bid_deadline = req.body.bid_deadline;
          bid.bid_desc = req.body.bid_desc;
          bid.bid_inital = req.body.bid_inital;
          bid.status = req.body.status;
          bid.save()
            .then(
              resp => {
                res.json(
                  {
                    success: true,
                    message: 'Succesfully approved change request'
                  }
                )

              }
            )
            .catch(
              err => {
                res.status(500).json(
                  {
                    success: false,
                    message: 'Error while approving chage request'
                  }
                )
              }
            )
        }
      )
      .catch(
        err => {

        }
      )

  });

  router.get('/updateRequests/:id', (req, res) => {
    BidChangeRequest.findById(req.params.id)
      .populate('bid')
      .populate('requester')
      .then(
        requests => {
          res.json(requests)
        }
      )
      .catch(
        err => {
          res.status(500).json(err);
        }
      )
  });

  /* ===============================================================
       DELETE Bid POST
    =============================================================== */
  router.delete('/deleteBid/:id', (req, res) => {
    // Check if ID was provided in parameters
    if (!req.params.id) {
      res.json({
        success: false,
        message: 'No id provided'
      }); // Return error message
    } else {
      BidData.findOne({
        _id: req.params.id
      }, (err, bid) => {
        // Check if error was found
        if (err) {
          res.json({
            success: false,
            message: 'Invalid id'
          }); // Return error message
        } else {
          // Check if blog was found in database
          if (!bid) {
            res.json({
              success: false,
              messasge: 'Bid was not found'
            }); // Return error message
          } else {
            bid.remove((err) => {
              if (err) {
                res.json({
                  success: false,
                  message: err
                }); // Return error message
              } else {
                res.json({
                  success: true,
                  message: 'Bid is deleted!'
                }); // Return success message
              }
            });
          }
        }
      });
    }
  });
  router.post('/apply', authenticate.verifyUser, (req, res) => {
    if (req.body) {
      // console.log(req.body.applier)
      // check that the user did n't applied more than triple before
      Apply.find(
        {
          applier: req.user.supplier,
          status: 'pending'
        }
      )
        .then(
          applicationsBefore => {
            console.log('already applied ', applicationsBefore.length)
            if (applicationsBefore.length >= 3) {
              res.json({
                success: false,
                message: 'You have reached three applications, wait for approval'
              })
            }
            else {
              Apply.find({
                bid: req.body.bid,
                applier: req.user.supplier
              }).then(
                applications => {
                  console.log('The length of bid', applications.length);
                  if (applications.length > 0) {
                    res.json({
                      success: false,
                      message: 'You have already applied to this bid'
                    })
                  } else {
                    Apply.create({
                      bid: req.body.bid,
                      companyName: req.body.companyName,
                      transaction: req.body.transaction,
                      // amount: req.body.amount,
                      applier: req.user.supplier
                    })
                      .then(
                        application => {
                          res.json({
                            success: true,
                            message: 'Succesfully submitted your application'
                          })
                        }
                      )
                      .catch(
                        err => {
                          res.json(err)
                        }
                      )
                  }
                }
              )
                .catch(
                  err => {
                    res.json(err)
                  }
                )
            }
          }
        )
        .catch(
          err => {

          }
        );

    }
  });

  router.get('/bid_document/:bidName',authenticate.verifyUser, (req, res) => {
   
    // console.log('the bid name ', req.params.bidName);
    var filepath = path.join(__dirname, '../uploads') + '/' + req.params.bidName
    console.log('the file path is ',filepath);
    res.download(filepath);
  });

  /* ============================================================
     Route to check if user's  is available for apply
  ============================================================ */
  router.get('/applyedbid/:id', authenticate.verifyUser, (req, res) => {
    if (!req.params.id) {
      res.json({
        success: false,
        message: 'No bid id is provided'
      });
    } else {
      Apply.findOne({
        _id: req.params.id
      }, (err, apply) => {
        if (err) {
          res.json({
            success: false,
            message: 'Not Valid applyed bid Id'
          });
        } else {
          if (!apply) {
            res.json({
              success: false,
              message: 'bid is not found'
            })
          } else {
            res.json({
              success: true,
              apply: apply
            })
          }
        }
      });
    }
  });
  // ========get all applied bids ===========
  router.get('/applyedBids', authenticate.verifyUser, (req, res) => {

    Apply.find({
      applier: req.user.supplier
    })
      .populate('bid')
      .sort({
        '_id': -1
      })
      .then(
        applys => {
          if (!applys) {
            res.json({
              success: false,
              message: 'No bids found.'
            }); // Return error of no blogs found
          } else {
            res.json({
              success: true,
              applys: applys
            }); // Return success and blogs array
          }

        }
      )
      .catch(
        err => {

        }
      ); // Sort bids from newest to oldest
  });

  router.get('/getApplicantsList/:bidId', (req, res) => {
    Apply.find(
      {
        bid: req.params.bidId,
        areDocumentsSubmitted: true
      }
    )
      .populate('applier')
      .populate('bid')
      .then(
        applications => {
         if(applications.length > 0){
          var initialAmount = applications[0].bid.bid_inital;

          var leastAppliers = [];
          var mediumAppliers = [];
          var topAppliers = [];

          // Categorize appliers to different classes based on their amount of application

          for (var i = 0; i < applications.length; i++) {
            // If the amount of applicaiton is not greater than by 15% of inital amount,
            // then add to the least appliers amount list
            if (applications[i].amount < (initialAmount + (initialAmount * 0.15))) {
              leastAppliers.push(applications[i]);
            }
            // If the amount of application is not greater than by 30% of initial amont,
            // then add to the medium appliers amount list
            else if (applications[i].amount < (initialAmount + (initialAmount * 0.30))) {
              mediumAppliers.push(applications[i]);
            }
            // If the amount of application is greater than or equal to the initial amount,
            // then add to the top appliers list
            else if (applications[i].amount >= (initialAmount + (initialAmount * 0.50))) {
              topAppliers.push(applications[i]);
            }
          }

          res.status(200).json({ top: topAppliers, medium: mediumAppliers, least: leastAppliers })
       
         }
         else {
           res.status(200).json({top: [], medium: [], least: []})
         }
        }
      )
      .catch(
        err => {
          console.log(err)
          res.status(500).json({ err: err })
        }
      )
  });
  // resolves(determines) winner of the bid, sends notification to all appliers and
  // the winner user
  router.post('/resolve/:bidId', (req, res) => {
    console.log('The bid id is ', req.params.bidId);
    console.log(req.body);
    // find the in consideration bid
    BidData.findById(req.params.bidId)
      .then(
        bid => {
          // setup resolve and assign the winner user
          bid.isResolved = true;
          bid.winner = req.body.winner;
          bid.save()
            .then(
              updatedBid => {
                // find all the appliers who submitted document and bided
                Apply.find({
                  bid: updatedBid._id,
                  areDocumentsSubmitted: true
                })
                  .then(
                    applications => {
                      // create  and send notification for all usrs who applied for
                      var resolveNotifications = [];
                      // The winner applier 
                      var winnerApplyer = {};
                      for(var h = 0; h < applications.length; h++){
                        if(updatedBid.winner === applications[h]._id){
                          winnerApplyer = applications[h];
                          break;
                        }
                      }

                      for (var i = 0; i < applications.length; i++) {
                        resolveNotifications.push({
                          supplierUser: applications[i].applier,
                          bid: updatedBid._id,
                          bidder: updatedBid.publicBody,
                          reason: 'bidClosed',
                          winner: winnerApplyer
                        })
                      }

                      Notification.create(resolveNotifications)
                        .then(
                          notifications => {
                            // create and send notification for user who won the bid
                            Notification.create(
                              {
                                supplierUser: updatedBid.winner,
                                bid: updatedBid._id,
                                reason: 'bidWin',
                                bidder: updatedBid.publicBody,
                                message: 'You won the bid, contact the public user at its address'
                              }
                            )
                              .then(
                                notification => {
                                  res.json(
                                    {
                                      success: true,
                                      message: 'Winner marked',
                                      allNotification: notifications,
                                      winnerNotification: notification
                                    }
                                  )
                                }
                              )
                              .catch(
                                err => {
                                  res.json(
                                    {
                                      success: false,
                                      message: 'Error while sending notification to the winner'
                                    }
                                  );
                                }
                              )
                          }
                        )
                        .catch(
                          err => {
                            console.log(err);
                            res.json(
                              {
                                success: false,
                                message: 'Error while sending notification to the appliers'
                              }
                            );
                          }
                        );
                    }
                  )
                  .catch(
                    err => {
                      res.json(
                        {
                          success: false,
                          message: 'Error while fetching appliers'
                        }
                      );
                    }
                  );
              }
            )
        }
      )
      .catch(
        err => {
          res.json(
            {
              success: false,
              message: 'Error while fetching bid information'
            }
          );
        }
      );

  });

  router.get('/notifications', authenticate.verifyUser, (req, res) => {
    console.log(req.user);
    if (req.user.userType === 'supplierUser') {
      Notification.find(
        {
          supplierUser: req.user.supplier
        }
      )
        .populate('bid')
        .populate('bidder')
        .populate('winner')
        .then(
          notifications => {
            res.json({
              success: true,
              notifications: notifications
            })
          }
        )
        .catch(
          err => {
            res.json(
              {
                success: false
              }
            )
          }
        )
    }
    else if (req.user.userType === 'publicUser') {
      Notification.find(
        {
          publicUser: req.user.publicUser
        }
      )
        .populate('bid')
        .populate('bid.publicBody')
        .populate('applier')
        .then(
          notifications => {
            res.json({
              success: true,
              notifications: notifications
            })
          }
        )
        .catch(
          err => {
            res.json(
              {
                success: false
              }
            )
          }
        )
    }
    // res.json(
    //   {
    //     success: true
    //   }
    // )
  });

  router.post('/repost/:bidId', authenticate.verifyUser, (req, res) => {
    BidData.findById(req.params.bidId)
      .then(
        biddata => {
          var newDeadline = Date.parse(req.body.newDeadline)
          if(newDeadline < Date.now()){
            res.json({
              success: false,
              message: 'Deadline must be ahead of current time'
            })
          }
          else {
            biddata.bid_deadline = req.body.newDeadline;
            biddata.save()
              .then(
                bidData => {
                  res.json(
                   {
                    success: true,
                    message: 'Your bid has been reposted',
                    updatedBid: biddata
                   }
                  )
                }
              )
          }
        }
      )
  });

  router.get('/unresolvedBids', authenticate.verifyUser, (req, res) => {
    BidData.find({
      bid_deadline: {
        $lte: Date.now()
      },
      isResolved: false
    })
      .populate('publicBody')
      .then(
        bids => {
          res.json({
            success: true,
            bids: bids
          });
        }
      )
      .catch(
        err => {
          res.json(
            {
              success: false,
              message: 'Error while getting unresolved bids list'
            }
          )
        }
      )
  });
  // alert bidder who did not resolve on deadlne
  router.post('/alert', authenticate.verifyUser, (req, res) => {
    Notification.create(
      {
        publicUser: req.body.bidderId,
        bid: req.body.bidId,
        reason: 'bidOutdated'
      }
    )
      .then(
        notification => {
          res.json({
            success: true,
            notification: notification
          })
        }
      )
      .catch(
        err => {
          res.json({
            success: false,
            error: err
          })
        }
      )
  });
  // get the winnier form database;
  router.get('/winner', authenticate.verifyUser, (req, res) => {
    console.log(req.body);
  })
  router.get('/allapplyedBids', (req, res) => {
    Apply.find({}, (err, apply) => {
      if (err) {
        res.json({
          success: false,
          message: err
        }); // Return error message
      } else {
        // Check if blogs were found in database
        if (!apply) {
          res.json({
            success: false,
            message: 'No apply found.'
          }); // Return error of no blogs found
        } else {
          res.json({
            success: true,
            apply: apply
          }); // Return success and blogs array
        }
      }
    });
  });
  return router;
}