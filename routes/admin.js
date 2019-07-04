const passport = require('passport');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin-user');
const Apply = require('../models/apply');
const config = require('../config/database');

module.exports = router => {
    router.post('/register', (req, res) => {
        let newAdmin = new Admin({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            contact: req.body.contact,
            password: req.body.password,
            job_profile: req.body.job_profile
        });
        Admin.addAdmin(newAdmin, (err, user) => {
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
                    message: "Admin registration is successful."
                });
            }
        });
    });

    router.post('/login', (req, res) => {

        const username = req.body.username;
        const password = req.body.password;

        Admin.getAdminByUsername(username, (err, admin) => {
            if (err) throw err;
            if (!admin) {
                return res.json({
                    success: false,
                    message: "Admin not found."
                });
            }

            Admin.comparePassword(password, admin.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    const token = jwt.sign({
                        type: "admin",
                        data: {
                            _id: admin._id,
                            username: admin.username,
                            name: admin.name,
                            email: admin.email,
                            contact: admin.contact,
                            job_profile: admin.job_profile
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
    // get list of all bid applicants
    router.get('/bid_applications', (req, res) => {
        Apply.find(
            { status: 'pending' }
        )
            .populate('applier')
            .populate('bid')
            .then(
                applications => {
                    res.status(200).json(applications);
                }
            )
            .catch(
                err => {
                    res.status(500).json(err)
                }
            )
    });

    // accept or reject bid application

    router.patch('/process_application/:id', (req, res) => {
        console.log(req.params.id);
        console.log(req.body);
        Apply.findByIdAndUpdate(req.params.id, req.body)
            .then(
                updatedApplication => {
                    console.log(updatedApplication);
                    res.status(200).json(updatedApplication);
                }
            )
       
    });

    /**
     * Get Authenticated user profile
     */

    router.get('/profile', passport.authenticate('jwt', {
        session: false
    }), (req, res) => {
        // console.log(req.user);
        return res.json(
            req.user
        );
    });

    return router;
};