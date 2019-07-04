var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var passport = require('passport');
// var config = require('./config.js');

exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = function(user) {
    return jwt.sign(user, '1234-56789-9875-4321',
        {expiresIn: 3600});
};

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = '1234-56789-9875-4321';  
exports.jwtPassport = passport.use(new JwtStrategy(opts,
    (jwt_payload, done) => {
        // console.log("JWT payload: ", jwt.sign(jwt_payload, config.secretKey));
        User.findOne({_id: jwt_payload._id}, (err, user) => {
            if (err) {
                return done(err, false);
            }
            else if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    }));

exports.verifyUser = passport.authenticate('jwt', {session: false});

exports.verifyAdmin = function(req, res, next){
    if (req.user.userType === "admin") {
        next();
    }
    else {
        var error = new Error('You are not autherizied to perform this operation!');
        error.status = 403;
        next (error);
    }
}

exports.verifyPublicUser = function(req, res, next){
    if (req.user.userType === "publicUser"){
        next();
    }
    else {
         var error = new Error('You are not autherizied to perform this operation!');
         error.status = 403;
         next(error);
    }
}

exports.verifySupplierUser = function (req, res, next) {
    if (req.user.userType === "supplierUser") {
        next();
    } else {
        var error = new Error('You are not autherizied to perform this operation!');
        error.status = 403;
        next(error);
    }
}