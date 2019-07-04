const PublicUser = require("../models/public-users");
const SupplierUser = require("../models/supplier-users");
const AdminUser = require('../models/admin-user');
const jwt = require("jsonwebtoken");
const config = require("../config/database");
var async = require("async");
var nodemailer = require("nodemailer");
var crypto = require("crypto");
const ResetPassword = require('../models/resetPassword');

module.exports = router => {
  router.post("/pubregister", (req, res) => {
    if (!req.body.public_body_name) {
      res.json({
        success: false,
        message: "you must provide a Public Body Name"
      });
    } else {
      if (!req.body.tin_no) {
        res.json({
          success: false,
          message: "you must provide a Tin No"
        });
      } else {
        if (!req.body.email) {
          res.json({
            success: false,
            message: "you must provide a email"
          });
        } else {
          if (!req.body.phone_no) {
            res.json({
              success: false,
              message: "you must provide an Phone Number"
            });
          } else {
            if (!req.body.con_per_name) {
              res.json({
                success: false,
                message: "you must provide an contact persone name"
              });
            } else {
              if (!req.body.con_per_email) {
                res.json({
                  success: false,
                  message: "you must provide an contact person email"
                });
              } else {
                if (!req.body.password) {
                  res.json({
                    success: false,
                    message: "you must provide an password"
                  });
                } else {
                  if (!req.body.confirm) {
                    res.json({
                      success: false,
                      message: "you must provide a confirm password"
                    });
                  } else {
                    let pubuser = new PublicUser({
                      public_body_name: req.body.public_body_name,
                      tin_no: req.body.tin_no,
                      email: req.body.email,
                      phone_no: req.body.phone_no,
                      con_per_name: req.body.con_per_name,
                      con_per_email: req.body.con_per_email,
                      password: req.body.password,
                      confirm: req.body.confirm
                    });

                    pubuser.save(err => {
                      if (err) {
                        if (err.code === 11000) {
                          res.json({
                            success: false,
                            message: "Public Body name or e-mail already exists"
                          });
                        } else {
                          if (err.errors) {
                            if (err.errors.email) {
                              res.json({
                                success: false,
                                message: err.errors.email.message
                              });
                            } else {
                              if (err.errors.public_body_name) {
                                res.json({
                                  success: false,
                                  message: err.errors
                                    .public_body_name
                                    .message
                                });
                              } else {
                                if (err.errors.password) {
                                  res.json({
                                    success: false,
                                    message: err.errors
                                      .password
                                      .message
                                  });
                                } else {
                                  res.json({
                                    success: false,
                                    message: err
                                  });
                                }
                              }
                            }
                          } else {
                            res.json({
                              success: false,
                              message: "Could not save user. Error",
                              err
                            });
                          }
                        }
                      } else {
                        res.json({
                          success: true,
                          message: "Account is registerd"
                        });
                      }
                    });
                  }
                }
              }
            }
          }
        }
      }
    }
  });
  // ============================================================
  // =========== supplier user registeration===================
  router.post("/supregister", (req, res) => {
    if (!req.body.companyname) {
      res.json({
        success: false,
        message: "you must provide a companyname"
      });
    } else {
      if (!req.body.tin_no) {
        res.json({
          success: false,
          message: "you must provide a Tin No"
        });
      } else {
        if (!req.body.cities) {
          res.json({
            success: false,
            message: "you must provide a cities"
          });
        } else {
          if (!req.body.email) {
            res.json({
              success: false,
              message: "you must provide email"
            });
          } else {
            if (!req.body.phone_no) {
              res.json({
                success: false,
                message: "you must provide phone number"
              });
            } else {
              if (!req.body.password) {
                res.json({
                  success: false,
                  message: "you must provide  password"
                });
              } else {
                if (!req.body.confirm) {
                  res.json({
                    success: false,
                    message: "you must provide an confirm password"
                  });
                } else {
                  let supuser = new SupplierUser({
                    companyname: req.body.companyname,
                    tin_no: req.body.tin_no,
                    cities: req.body.cities,
                    email: req.body.email,
                    phone_no: req.body.phone_no,
                    password: req.body.password,
                    confirm: req.body.confirm
                  });
                  supuser.save(err => {
                    if (err) {
                      if (err.code === 11000) {
                        res.json({
                          success: false,
                          message: "companyname or e-mail already exists"
                        });
                      } else {
                        if (err.errors) {
                          if (err.errors.email) {
                            res.json({
                              success: false,
                              message: err.errors.email.message
                            });
                          } else {
                            if (err.errors.tin_no) {
                              res.json({
                                success: false,
                                message: err.errors.tin_no.message
                              });
                            } else {
                              res.json({
                                success: false,
                                message: err
                              });
                            }
                          }
                        } else {
                          res.json({
                            success: false,
                            message: "Could not save user. Error",
                            err
                          });
                        }
                      }
                    } else {
                      res.json({
                        success: true,
                        message: "User succesfuly save to database"
                      });
                    }
                  });
                }
              }
            }
          }
        }
      }
    }
  });
  // =========== supplier user registeration===================
  router.post("/adminregister", (req, res) => {
    if (!req.body.username) {
      res.json({
        success: false,
        message: "you must provide a username"
      });
    } else {
      if (!req.body.email) {
        res.json({
          success: false,
          message: "you must provide a email"
        });
      } else {
        if (!req.body.password) {
          res.json({
            success: false,
            message: "you must provide a password"
          });
        } else {
          if (!req.body.confirm) {
            res.json({
              success: false,
              message: "you must provide confirm password"
            });
          } else {
            let adminuser = new AdminUser({
              username: req.body.username,
              email: req.body.email,
              password: req.body.password,
              confirm: req.body.confirm
            });
            adminuser.save(err => {
              if (err) {
                if (err.code === 11000) {
                  res.json({
                    success: false,
                    message: "username or e-mail already exists"
                  });
                } else {
                  if (err.errors) {
                    if (err.errors.email) {
                      res.json({
                        success: false,
                        message: err.errors.email.message
                      });
                    } else {
                      if (err.errors.username) {
                        res.json({
                          success: false,
                          message: err.errors.username.message
                        });
                      } else {
                        res.json({
                          success: false,
                          message: err
                        });
                      }
                    }
                  } else {
                    res.json({
                      success: false,
                      message: "Could not save user. Error",
                      err
                    });
                  }
                }
              } else {
                res.json({
                  success: true,
                  message: "User succesfuly save to database"
                });
              }
            });
          }
        }
      }
    }
  });

  /* ============================================================
     Route to check if user's email is available for registration
  ============================================================ */
  router.get('/checkEmail/:email', (req, res) => {
    // Check if email was provided in paramaters
    if (!req.params.email) {
      res.json({
        success: false,
        message: 'E-mail was not provided'
      }); // Return error
    } else {
      // Search for user's e-mail in database;
      PublicUser.findOne({
        email: req.params.email
      }, (err, pubuser) => {
        if (err) {
          res.json({
            success: false,
            message: err
          }); // Return connection error
        } else {
          // Check if user's e-mail is taken
          if (pubuser) {
            res.json({
              success: false,
              message: 'E-mail is already taken'
            }); // Return as taken e-mail
          } else {
            res.json({
              success: true,
              message: 'E-mail is available'
            }); // Return as available e-mail
          }
        }
      });
    }
  });

  /* ===============================================================
     Route to check if pubuser's Public body name is available for registration
  =============================================================== */
  router.get('/checkPublicBodyName/:public_body_name', (req, res) => {
    // Check if public_body_name was provided in paramaters
    if (!req.params.public_body_name) {
      res.json({
        success: false,
        message: 'public_body_name was not provided'
      }); // Return error
    } else {
      // Look for public_body_name in database
      PublicUser.findOne({
        public_body_name: req.params.public_body_name
      }, (err, pubuser) => { // Check if connection error was found
        if (err) {
          res.json({
            success: false,
            message: err
          }); // Return connection error
        } else {
          // Check if user's public_body_name was found
          if (pubuser) {
            res.json({
              success: false,
              message: 'public_body_name is already taken'
            }); // Return as taken public_body_name
          } else {
            res.json({
              success: true,
              message: 'public_body_name is available'
            }); // Return as vailable public_body_name
          }
        }
      });
    }
  });

  //=================== public login
  router.post("/publogin", (req, res) => {
    // Check if email was provided
    if (!req.body.email) {
      res.json({
        success: false,
        message: "No email was provided"
      }); // Return error
    } else {
      // Check if password was provided
      if (!req.body.password) {
        res.json({
          success: false,
          message: "No password was provided."
        }); // Return error
      } else {
        // Check if email exists in database
        PublicUser.findOne({
            email: req.body.email.toLowerCase()
          },
          (err, pubuser) => {
            // Check if error was found
            if (err) {
              res.json({
                success: false,
                message: err
              }); // Return error
            } else {
              // Check if email was found
              if (!pubuser) {
                res.json({
                  success: false,
                  message: "email not found."
                }); // Return error
              } else {
                const validPassword = pubuser.comparePassword(req.body.password); // Compare password provided to password in database
                // Check if password is a match
                if (!validPassword) {
                  res.json({
                    success: false,
                    message: "Password invalid"
                  }); // Return error
                } else {
                  const token = jwt.sign({
                      pubuserId: pubuser._id
                    },
                    config.secret, {
                      expiresIn: "24h"
                    }
                  ); // Create a token for client
                  res.json({
                    success: true,
                    message: "Success!",
                    token: token,
                    pubuser: {
                      public_body_name: pubuser.public_body_name,
                      tin_no: pubuser.tin_no,
                      email: pubuser.email,
                      phone_no: pubuser.phone_no,
                      con_per_name: pubuser.con_per_name,
                      con_per_email: pubuser.con_per_email
                    }
                  });
                }
              }
            }
          }
        );
      }
    }
  });
  // =======================supplier login==========================
  // supplier login login
  router.post("/suplogin", (req, res) => {
    // Check if email was provided
    if (!req.body.email) {
      res.json({
        success: false,
        message: "No email was provided"
      }); // Return error
    } else {
      // Check if password was provided
      if (!req.body.password) {
        res.json({
          success: false,
          message: "No password was provided."
        }); // Return error
      } else {
        // Check if email exists in database
        SupplierUser.findOne({
            email: req.body.email.toLowerCase()
          },
          (err, supuser) => {
            // Check if error was found
            if (err) {
              res.json({
                success: false,
                message: err
              }); // Return error
            } else {
              // Check if email was found
              if (!supuser) {
                res.json({
                  success: false,
                  message: "email not found."
                }); // Return error
              } else {
                const validPassword = supuser.comparePassword(req.body.password); // Compare password provided to password in database
                // Check if password is a match
                if (!validPassword) {
                  res.json({
                    success: false,
                    message: "Password invalid"
                  }); // Return error
                } else {
                  const token = jwt.sign({
                      supuserId: supuser._id
                    },
                    config.secret, {
                      expiresIn: "24h"
                    }
                  ); // Create a token for client
                  res.json({
                    success: true,
                    message: "Success!",
                    token: token,
                    supuser: {
                      companyname: supuser.companyname,
                      cities: supuser.cities,
                      tin_no: supuser.tin_no,
                      email: supuser.email,
                      phone_no: supuser.phone_no,
                    }
                  }); // Return success and token to frontend
                }
              }
            }
          }
        );
      }
    }
  });
  //=================== public login
  router.post("/adminlogin", (req, res) => {
    // Check if email was provided
    if (!req.body.email) {
      res.json({
        success: false,
        message: "No email was provided"
      }); // Return error
    } else {
      // Check if password was provided
      if (!req.body.password) {
        res.json({
          success: false,
          message: "No password was provided."
        }); // Return error
      } else {
        // Check if email exists in database
        AdminUser.findOne({
            email: req.body.email.toLowerCase()
          },
          (err, adminuser) => {
            // Check if error was found
            if (err) {
              res.json({
                success: false,
                message: err
              }); // Return error
            } else {
              // Check if email was found
              if (!adminuser) {
                res.json({
                  success: false,
                  message: "email not found."
                }); // Return error
              } else {
                const validPassword = adminuser.comparePassword(req.body.password); // Compare password provided to password in database
                // Check if password is a match
                if (!validPassword) {
                  res.json({
                    success: false,
                    message: "Password invalid"
                  }); // Return error
                } else {
                  const token = jwt.sign({
                      adminuserId: adminuser._id
                    },
                    config.secret, {
                      expiresIn: "24h"
                    }
                  ); // Create a token for client
                  res.json({
                    success: true,
                    message: "Success!",
                    token: token,
                    adminuser: {
                      username: adminuser.username,
                      email: adminuser.email
                    }
                  });
                }
              }
            }
          }
        );
      }
    }
  });
  /* ===============================================================
     GET ALL supplier list from the database
  =============================================================== */
  router.get('/allsupplierlist', (req, res) => {
    SupplierUser.find({}, (err, supuser) => {
      if (err) {
        res.json({
          success: false,
          message: err
        }); // Return error message
      } else {
        // Check if blogs were found in database
        if (!supusers) {
          res.json({
            success: false,
            message: 'No Supplier user is found in database.'
          }); // Return error of no blogs found
        } else {
          res.json({
            success: true,
            supuser: supuser
          }); // Return success and blogs array
        }
      }
    }).sort({
      '_id': -1
    }); // Sort bids from newest to oldest
  });
  /* ===============================================================
     GET ALL Public body from the database
  =============================================================== */
    router.get('/allpublic', (req, res) => {
      PublicUser.find({}, (err, pubusers) => {
        if (err) {
          res.json({
            success: false,
            message: err
          }); // Return error message
        } else {
          // Check if blogs were found in database
          if (!pubusers) {
            res.json({
              success: false,
              message: 'No Supplier user is found in database.'
            }); // Return error of no blogs found
          } else {
            res.json({
              success: true,
              pubusers: pubusers
            }); // Return success and blogs array
          }
        }
      }).sort({
        '_id': -1
      }); // Sort bids from newest to oldest
    });
  /* ================================================
  MIDDLEWARE - Used to grab user's token from headers
  ================================================ */
  router.use((req, res, next) => {
    const token = req.headers['authorization']; // Create token found in headers
    // Check if token was found in headers
    if (!token) {
      res.json({
        success: false,
        message: 'No token provided'
      }); // Return error
    } else {
      // Verify the token is valid
      jwt.verify(token, config.secret, (err, decoded) => {
        // Check if error is expired or invalid
        if (err) {
          res.json({
            success: false,
            message: 'Token invalid: ' + err
          }); // Return error for token validation
        } else {
          req.decoded = decoded; // Create global variable to use in any request beyond
          next(); // Exit middleware
        }
      });
    }
  });
  //  /* ===============================================================
  //    Route to get public user's profile data
  // =============================================================== */
  router.get('/pubprofile', (req, res) => {
    // Search for user in database
    PublicUser.findOne({
      _id: req.decoded.pubuserId
    }).select('public_body_name tin_no email phone_no con_per_name con_per_email').exec((err, pubuser) => {
      // Check if error connecting
      if (err) {
        res.json({
          success: false,
          message: err
        }); // Return error
      } else {
        // Check if user was found in database
        if (!pubuser) {
          res.json({
            success: false,
            message: 'User not found'
          }); // Return error, user was not found in db
        } else {
          res.json({
            success: true,
            pubuser: pubuser
          }); // Return success, send user object to frontend for profile
        }
      }
    });
  });
  // =========================supplier profile===================
  /* ===============================================================
Route to get supplier user's profile data
=============================================================== */
  router.get("/supprofile", (req, res) => {
    // Search for user in database
    SupplierUser.findOne({
        _id: req.decoded.supuserId
      })
      .select("companyname tin_no cities email phone_no")
      .exec((err, supuser) => {
        // Check if error connecting
        if (err) {
          res.json({
            success: false,
            message: err
          }); // Return error
        } else {
          // Check if user was found in database
          if (!supuser) {
            res.json({
              success: false,
              message: "User not found"
            }); // Return error, user was not found in db
          } else {
            res.json({
              success: true,
              supuser: supuser
            }); // Return success, send user object to frontend for profile
          }
        }
      });
  });

  //=========================Admin profile===================
  /* ===============================================================
Route to get Admin user's profile data
=============================================================== */
  router.get("/adminprofile", (req, res) => {
    // Search for user in database
    AdminUser.findOne({
        _id: req.decoded.adminuserId
      })
      .select("username email")
      .exec((err, adminuser) => {
        // Check if error connecting
        if (err) {
          res.json({
            success: false,
            message: err
          }); // Return error
        } else {
          // Check if user was found in database
          if (!adminuser) {
            res.json({
              success: false,
              message: "User not found"
            }); // Return error, user was not found in db
          } else {
            res.json({
              success: true,
              adminuser: adminuser
            }); // Return success, send user object to frontend for profile
          }
        }
      });
  });

  //  editing adimin profile
  router.put('/updateadminuser', (req, res) => {
    if (!req.body._id) {
      res.json({
        success: false,
        message: 'No user id is provided'
      })
    } else {
      AdminUser.findOne({
        _id: req.body._id
      }, (err, adminuser) => {
        if (err) {
          res.json({
            success: false,
            message: 'Not a valid user id'
          })
        } else {
          if (!adminuser) {
            res.json({
              success: false,
              message: 'adminuser id was not found'
            });
          } else {
            adminuser.username = req.body.username;
            adminuser.email = req.body.email;
            adminuser.save((err) => {
              if (err) {
                res.json({
                  success: false,
                  message: err
                });
              } else {
                res.json({
                  success: true,
                  message: 'Adminuser is Updated succesfully'
                })
              }
            })
          }
        }
      });
    }
  })
  // ====================editig public body user=======================
  // router.put('/updatepublicuser', (req, res) => {
  //   var conditions = {
  //     _id: req.params.id
  //   };
  //   PublicUser.update(conditions, req.body).then(doc => {
  //       if (!doc) {
  //         return res.status(404).end();
  //       }
  //       return res.status(200).json(doc);
  //     })
  //     .catch(err => next(err));
  // })
  router.put('/updatepubuser', (req, res) => {
    if (!req.body._id) {
      res.json({
        success: false,
        message: 'No user id is provided'
      })
    } else {
      AdminUser.findOne({
        _id: req.body._id
      }, (err, pubuser) => {
        if (err) {
          res.json({
            success: false,
            message: 'Not a valid user id'
          })
        } else {
          if (!pubuser) {
            res.json({
              success: false,
              message: 'adminuser id was not found'
            });
          } else {
            pubuser.public_body_name = req.body.public_body_name;
            pubuser.tin_no = req.body.tin_no;
            pubuser.email = req.body.email;
            pubuser.save((err) => {
              if (err) {
                res.json({
                  success: false,
                  message: err
                });
              } else {
                res.json({
                  success: true,
                  message: 'Adminuser is Updated succesfully'
                })
              }
            })
          }
        }
      });
    }
  })
  // ============== edit profile for supplier=====================\
 // get single bid
 router.get('/getAdminUser/:id', (req, res) => {
   if (!req.params.id) {
     res.json({
       success: false,
       message: 'No user id is provided'
     });
   } else {
     AdminUser.findOne({
       _id: req.params.id
     }, (err, adminuser) => {
       if (err) {
         res.json({
           success: false,
           message: 'Not Valid user Id'
         });
       } else {
         if (!adminuser) {
           res.json({
             success: false,
             message: 'user is not found'
           })
         } else {
           res.json({
             success: true,
             adminuser: adminuser
           })
         }
       }
     });
   }
 });

 // forgot password
 router.get('/forgot', function (req, res) {
   res.render('forgot');
 });

 router.post('/forgot', function (req, res, next) {
   async.waterfall([
     function (done) {
       crypto.randomBytes(20, function (err, buf) {
         var token = buf.toString('hex');
         done(err, token);
       });
     },
     function (token, done) {
       AdminUser.findOne({
         email: req.body.email
       }, function (err, adminuser) {
         if (!adminuser) {
           res.json({success:false, message:'no user with that email address'});
           return res.redirect('/forgot');
         }

         adminuser.resetPasswordToken = token;
         adminuser.resetPasswordExpires = Date.now() + 3600000; // 1 hour

         adminuser.save(function (err) {
           done(err, token, user);
         });
       });
     },
     function (token, user, done) {
       var smtpTransport = nodemailer.createTransport({
         service: 'Gmail',
         auth: {
           user: 'learntocodeinfo@gmail.com',
           pass: process.env.GMAILPW
         }
       });
       var mailOptions = {
         to: adminuser.email,
         from: 'learntocodeinfo@gmail.com',
         subject: 'Node.js Password Reset',
         text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
           'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
           'http://' + req.headers.host + '/reset/' + token + '\n\n' +
           'If you did not request this, please ignore this email and your password will remain unchanged.\n'
       };
       smtpTransport.sendMail(mailOptions, function (err) {
         console.log('mail sent');
         req.flash('success', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
         done(err, 'done');
       });
     }
   ], function (err) {
     if (err) return next(err);
     res.redirect('/forgot');
   });
 });

 router.get('/reset/:token', function (req, res) {
   AdminUser.findOne({
     resetPasswordToken: req.params.token,
     resetPasswordExpires: {
       $gt: Date.now()
     }
   }, function (err, adminuser) {
     if (!adminuser) {
       req.flash('error', 'Password reset token is invalid or has expired.');
       return res.redirect('/forgot');
     }
     res.render('reset', {
       token: req.params.token
     });
   });
 });

 router.post('/reset/:token', function (req, res) {
   async.waterfall([
     function (done) {
       User.findOne({
         resetPasswordToken: req.params.token,
         resetPasswordExpires: {
           $gt: Date.now()
         }
       }, function (err, adminuser) {
         if (!user) {
           req.flash('error', 'Password reset token is invalid or has expired.');
           return res.redirect('back');
         }
         if (req.body.password === req.body.confirm) {
           adminuser.setPassword(req.body.password, function (err) {
             adminuser.resetPasswordToken = undefined;
             adminuser.resetPasswordExpires = undefined;

             adminuser.save(function (err) {
               req.logIn(adminuser, function (err) {
                 done(err, adminuser);
               });
             });
           })
         } else {
           req.flash("error", "Passwords do not match.");
           return res.redirect('back');
         }
       });
     },
     function (adminuser, done) {
       var smtpTransport = nodemailer.createTransport({
         service: 'Gmail',
         auth: {
           user: 'learntocodeinfo@gmail.com',
           pass: process.env.GMAILPW
         }
       });
       var mailOptions = {
         to: adminuser.email,
         from: 'learntocodeinfo@mail.com',
         subject: 'Your password has been changed',
         text: 'Hello,\n\n' +
           'This is a confirmation that the password for your account ' + adminuser.email + ' has just been changed.\n'
       };
       smtpTransport.sendMail(mailOptions, function (err) {
         req.flash('success', 'Success! Your password has been changed.');
         done(err);
       });
     }
   ], function (err) {
     res.redirect('/dashboard');
   });
 });
  return router;
};
