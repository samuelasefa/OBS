const passport = require('passport');
const jwt = require('jsonwebtoken');
const SupplierUser = require('../models/supplier-users');
const config = require('../config/database');

module.exports = router => {
router.post('/register', (req, res) => {
    let newUser = new Supuser({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        contact: req.body.contact,
        password: req.body.password
    });
    SupplierUser.addUser(newUser, (err, supuser) => {
        if (err) {
            let message = "";
            if (err.errors.username) message = "Username is already taken. ";
            if (err.errors.email) message += "Email already exists.";
            return res.json({
                success: false,
                message
            });
        } else {
            return res.json({
                success: true,
                message: "User registration is successful."
            });
        }
    });
});

router.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    SupplierUser.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({
                success: false,
                message: "User not found."
            });
        }

        SupplierUser.comparePassword(password, supuser.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign({
                    type: "supuser",
                    data: {
                        _id: supuser._id,
                        username: supuser.username,
                        name: supuser.name,
                        email: supuser.email,
                        contact: supuser.contact
                    }
                }, config.secret, {
                    expiresIn: 604800 // for 1 week time in milliseconds
                });
                return res.json({
                    success: true,
                    token: "JWT " + token
                });
            } else {
                return res.json({
                    success: true,
                    message: "Wrong Password."
                });
            }
        });
    });
});

/**
 * Get Authenticated user profile
 */

router.get('/profile', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    // console.log(req.user);
    return res.json(
        req.supuser
    );
});
 return router;
 };