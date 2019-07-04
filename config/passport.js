const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const PublicUser = require('../models/public-users');
const Supuser = require('../models/supplier-users');
const passport = require('passport');
const Admin = require('../models/admin-user');
const config = require('../config/database');

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
opts.secretOrKey = config.secret;
module.exports =  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    console.log(jwt_payload);
    PublicUser.findById(jwt_payload.pubuserId, (err, pubuser) => {
        console.log('User found in jwt strategy', pubuser)
        if (err) return done(err, false);
        if (pubuser) return done(null, pubuser);
        return done(null, false);
    });
}));

//  if (userType == 'supuser') {
//    Supuser.getSupuserById(jwt_payload.data._id, (err, supuser) => {
//      if (err) return done(err, false);
//      if (supuser) return done(null, supuser);
//      return done(null, false);
//    });
//  }
//  if (userType == 'pubuser') {
//    Pubuser.getPubuserById(jwt_payload.data._id, (err, pubuser) => {
//      if (err) return done(err, false);
//      if (pubuser) return done(null, pubuser);
//      return done(null, false);
//    });
//  }