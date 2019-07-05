var express = require("express");
const bodyParser = require("body-parser");
var User = require("../models/user");
var Admin = require('../models/admin-user');
var Supplier = require("../models/supplier-users");
var PublicUser = require("../models/public-users");
var passport = require("passport");
var authenticate = require("../authenticate");
var router = express.Router();
var async = require("async");
var nodemailer = require("nodemailer");
var crypto = require("crypto");
router.use(bodyParser.json());
/* GET users listing. */
router.get("/", function (req, res, next) {
  User.find({})
    .then(users => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(users);
    })
    .catch(err => {
      next(err);
    });
});

router.post("/signup", (req, res, next) => {
  var userType = req.body.userType;
  console.log("User type ", userType);
  if (userType === "supplierUser") {
    User.register(
      new User({
        username: req.body.username
      }),
      req.body.password,
      (err, user) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.json({
            err: err
          });
        } else {
          passport.authenticate("local")(req, res, () => {
            Supplier.create({
              companyName: req.body.companyName,
              tinNumber: req.body.tinNumber,
            })
              .then(supplier => {
                var userInstance = req.user;
                userInstance.email = req.body.email;
                userInstance.phoneNumber = req.body.phoneNumber;
                userInstance.userType = userType;
                userInstance.supplier = supplier._id;

                userInstance
                  .save()
                  .then(updatedUser => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json({
                      success: true,
                      status: "Registration Successful!",
                      user: updatedUser
                    });
                  })
                  .catch(err => {
                    console.log("Error: ", err);
                  });
              })
              .catch(err => {
                console.log("Error: ", err);
              });
          });
        }
      }
    );
  } else if (userType === "publicUser") {
    User.register(
      new User({
        username: req.body.username
      }),
      req.body.password,
      (err, user) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.json({
            err: err
          });
        } else {
          passport.authenticate("local")(req, res, () => {
            PublicUser.create({
              publicBodyName: req.body.publicBodyName,
              tinNumber: req.body.tinNumber,
              contactPersonName: req.body.contactPersonName
            })
              .then(publicUser => {
                var userInstance = req.user;
                userInstance.email = req.body.email;
                userInstance.phoneNumber = req.body.phoneNumber;
                userInstance.userType = userType;
                userInstance.publicUser = publicUser._id;

                userInstance.save().then(updatedUser => {
                  res.statusCode = 200;
                  res.setHeader("Content-Type", "application/json");
                  res.json({
                    success: true,
                    status: "Registration Successfu0l!",
                    user: updatedUser
                  });
                });
              })
              .catch(err => {
                console.log("Error: ", err);
              });
          });
        }
      }
    );
  }
  else if (userType == 'admin') {
    User.register(
      new User({
        username: req.body.username
      }),
      req.body.password,
      (err, user) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.json({
            err: err
          });
        } else {
          passport.authenticate("local")(req, res, () => {
            Admin.create(
              {
                firstName: req.body.firstName,
                lastName: req.body.lastName
              }
            )
              .then(
                admin => {
                  var userInstance = req.user;
                  userInstance.email = req.body.email;
                  userInstance.phoneNumber = req.body.phoneNumber;
                  userInstance.userType = userType;
                  userInstance.admin = admin._id;
                  userInstance.save()
                    .then(
                      updatedUser => {
                        console.log('User created');
                        res.status(200).json({
                          success: true,
                          message: 'Registration successful!',
                          user: updatedUser
                        })
                      }
                    )
                    .catch(
                      err => {

                      }
                    );
                }
              )
              .catch(
                err => {

                }
              )
          });
        }
      }
    );
  }
  // console.log('signuping...')
});

router.post("/login", passport.authenticate("local"), (req, res, next) => {
  var token = authenticate.getToken({
    _id: req.user._id
  });
  console.log(req.body);
  var userType = req.user.userType;
  console.log("userType ", userType);
  if (userType === "admin") {
    User.findById({
      _id: req.user._id
    })
      .populate("admin")
      .then(admin => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json({
          user: admin,
          success: true,
          token: "bearer " + token,
          status: "You are successfully logged in!"
        });
      })
      .catch(err => {
        var error = new Error("Error while retrieving user data!");
        error.status = 500;
        next(error);
      });
  } else if (userType == "publicUser") {
    // console.log(publicUser)
    User.findById({
      _id: req.user._id
    })
      .populate("publicUser")
      .then(publicUser => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json({
          user: publicUser,
          success: true,
          token: "bearer " + token,
          status: "You are successfully logged in!"
        });
      })
      .catch(err => {
        var error = new Error("Error while retrieving user data!");
        error.status = 500;
        next(error);
      });
  } else if (userType === "supplierUser") {
    User.findById({
      _id: req.user._id
    })
      .populate("supplier")
      .then(supplierUser => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json({
          user: supplierUser,
          success: true,
          token: "bearer " + token,
          status: "You are successfully logged in!"
        });
      })
      .catch(err => {
        console.log(err);
        var error = new Error("Error while retrieving user data!");
        error.status = 500;
        next(error);
      });
  } else if (userType === "admin") {
    User.findById({
      _id: req.user._id
    })
      .populate("admin")
      .then(supplierUser => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json({
          user: supplierUser,
          success: true,
          token: "bearer " + token,
          status: "You are successfully logged in!"
        });
      })
      .catch(err => {
        console.log(err);
        var error = new Error("Error while retrieving user data!");
        error.status = 500;
        next(error);
      });
  }
});
// ===========**************=================
// ===================get user profile component
router.get("/profile", authenticate.verifyUser, (req, res) => {
  var userType = req.user.userType;
  if (userType == "supplierUser") {
    User.findById({ _id: req.user.id })
      .populate("supplier")
      .then(user => {
        res.json(user);
      });
  } else if (userType == "publicUser") {
    User.findById({ _id: req.user.id })
      .populate("publicUser")
      .then(user => {
        res.json(user);
      });
  } else if (userType == "admin") {
    User.findById({
      _id: req.user.id
    })
      .populate("admin")
      .then(user => {
        res.json(user);
      });
  }
});

// ======================***************==============//
// update the profile of user
router.put('/editprofile', authenticate.verifyUser, (req, res, next) => {
  var conditions = {
    _id: req.user._id
  };
  User.updateMany(conditions, req.body).then(resp => {
    if (!resp) {
      res.json({ success: false, message: "There is no resp" });
    }
    res.json({ success: true, message: "true success" });
  })
    .catch(err => next(err));
})

// req.user.companyName = req.body.companyName;
// req.user.tinNumber = req.body.tinNumber;
// req.user.phoneNumber = req.body.phoneNumber;
// req.user.username = req.body.username;
// req.user.email = req.body.email;
// req.user.save()
//   .then(
//     user => {
//       user: user;
//     }
//   )
// ====================**********===============//
//  get all the supplier list from the database
router.get("/allsupplierusers", (req, res) => {
  // var supplier = req.user
  User.find({
    userType: "supplierUser"
  }).populate('supplier').then(users => {
    res.json(users);
  });
});
// get all user from the database
router.get("/allusers", (req, res) => {
  // var supplier = req.user
  User.find({}).populate('supplier').then(users => {
    res.json(users);
  });
  console.log(users);
});
module.exports = router;
// ****************=======************//
// forgot password function
router.post('/forgot', function (req, res, next) {
  async.waterfall([
    function (done) {
      crypto.randomBytes(20, function (err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function (token, done) {
      User.findOne({
        email: req.body.email
      }, function (err, user) {
        console.log(user);
        if (!user) {
          res.json({ success: false, status: "No account with that email address exists." });
          return false;
          // return res.redirect('/forgot');
        }
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        user.save(function (err) {
          done(err, token, user);
        });
      });
      // console.log(email);
    },
    function (token, user, done) {
      var smtpTransport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        service: 'Gmail',
        auth: {
          user: 'samuelmam44@gmail.com',
          pass: 'samifeven'
        }
      });
      var mailOptions = {
        to: user.email,
        from: 'samuelmam44@gmail.com',
        subject: 'Online Bidding System Password Reset session',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://localhost:4200/reset/'+ token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      smtpTransport.sendMail(mailOptions, function (err) {
        console.log('mail sent');
        res.json({
          success: true,
          status: 'An e-mail has been sent to ' + user.username + ' with further instructions.'
        });
        done(err, 'done');
      });
    }
  ], function (err) {
    if (err) return next(err);
    // res.redirect('/forgot');
    return false;
  });
});

// // -------------to reset password*-------
// router.get('/reset/:token', function (req, res) {
//   User.findOne({
//     resetPasswordToken: req.params.token,
//     resetPasswordExpires: {
//       $gt: Date.now()
//     }
//   }, function (err, user) {
//     if (!user) {
//       res.json({
//         success: false,
//         message: "Password reset token is invalid or has expired."
//       })
//       return false;
//     }
//     res.send(
//       token = req.params.token
//     );
//     // res.render('reset', {
//     //   token: req.params.token
//     // });
//   });
// });

router.post('/reset/:token', function (req, res) {
  async.waterfall([
    function (done) {
      User.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: {
          $gt: Date.now()
        }
      }, function (err, user) {
        if (!user) {
          res.json({
            success: false,
            message: "Password reset token is invalid or has expired."
          })
          // return res.redirect('back');
          // res.js
        }
        if (req.body.password === req.body.confirm) {
          user.setPassword(req.body.password, function (err) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;

            user.save()
              .then(
                updatedUser => {
                  res.json({
                    success: true,
                    message: 'Successfully updated your password'
                  })
                }
              )
              .catch(
                err => {
                  res.json({
                    success: false,
                    message: 'Error while updating your password'
                  })
                }
              );
          })
        } else {
          res.json({
            success: false,
            message: "Passwords do not match."
          })
          // return res.redirect('back');
        }
      });
    },
    function (user, done) {
      var smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'samuelmam44@gmail.com',
          pass: samifeven
        }
      });
      var mailOptions = {
        to: user.email,
        from: 'samuelmam@gmail.com',
        subject: 'Your password has been changed',
        text: 'Hello,\n\n' +
          'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
      };
      smtpTransport.sendMail(mailOptions, function (err) {
        res.json({
          success: false,
          message: "Success! Your password has been changed"
        });
        done(err);
      });
    }
  ], function (err) {
    // res.redirect('/');
    res.json({
      success:false, message:"redirect to page"
    })
  });
});
