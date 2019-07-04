const passport = require('passport');
const jwt = require('jsonwebtoken');
const PublicUser = require('../models/public-users');
const authenticate = require('../authenticate');
const config = require('../config/database');

module.exports = router => {
    router.post('/register', (req, res) => {
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

    router.post('/login', (req, res) => {
    //    Check if email was provided
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
                             expiresIn: 7200
                           }
                         ); // Create a token for client
                         res.json({
                           success: true,
                           message: "Success!",
                           token: "JWT " + token,
                           pubuser: {
                             _id: pubuser._id,
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
    /**
     * Get Authenticated pubuser profile
     */

    // router.get('/profile', passport.authenticate('jwt', {
    //     session: false
    // }), (req, res) => {
    //     // console.log(req.pubuser);
    //     return res.json(
    //         req.pubuser
    //     );
    // });
      //  /* ===============================================================
      //    Route to get public user's profile data
      // =============================================================== */
      router.get('/profile', authenticate.verifyUser ,(req, res) => {
        console.log(req.user);
        return res.json(
             req.pubuser
        );
      });
    return router;
};