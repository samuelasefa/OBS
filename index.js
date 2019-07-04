// importing node_module
const BidData = require('./models/bid-data');
const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const config = require('./config/database');
const path = require('path');
const passport = require('passport');
// const authentication = require("./routes/authentication")(router);
const pubusers = require("./routes/pubuser")(router);
const supusers = require("./routes/supuser")(router);
const admin = require("./routes/admin")(router);
const bids = require("./routes/bidroute")(router);
const usersRoute = require('./routes/users');
const bodyParser = require('body-parser');
const webpush = require('web-push');
const fileRouter = require("./routes/file");
const multer = require('multer');
const fs = require('fs');
// CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
const cors = require('cors');


// notification key
const PUBLIC_VAPID = 'BIADmoilncnT9V-FIikQpBNLL6_2mx0fvFBXKkyiYt1sDg3y_iMY_iu7aQ95d44ACYnSUMjjjKbJ0MIlsNlx6gI';
const PRIVATE_VAPID = '_aR9eGeiWf8dQokoFT2BwBQM6AG8nhVEllSUTgLjJsA';

mongoose.Promise = global.Promise;

// connect to database using mongoos
mongoose.connect(config.uri, { useNewUrlParser: true }, (err) => {
	if (err) {
		console.log('could not connect to database:', err)
	} else {
		console.log('Connected to database:' + config.db);
	}
});
// mongodb config
mongoose.set('useCreateIndex', true);

// providing static directry for frontend
app.use(cors());

const DIR = './uploads';

let storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, DIR);
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + '-' + Date.now() + '.' + path.extname(file.originalname));
	}
});
let upload = multer({
	storage: storage
});
app.use(bodyParser.json({ limit: "5mb" }));
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));

// Create a custom middleware function
// const checkUserType = function (req, res, next) {
// 	const userType = req.originalUrl.split('/')[2];
// 	// Bring in the passport authentication starategy
require('./authenticate');
// 	next();
// };

// app.use(checkUserType);

// parse application/json
app.use(bodyParser.json());

// Bring in the passport authentication starategy
// require('./config/passport')(passport);
app.use(express.static(__dirname + '/obsclient/dist'));
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
// app.use("/authentication", authentication);
app.use("/bids", bids);
app.use("/file", fileRouter);
app.use("/supusers", supusers);
app.use("/pubusers", pubusers);
app.use("/admin", admin);
app.use("/users", usersRoute);

app.use(function (req, res, next) {
	//set headers to allow cross origin request.
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

// subscription route
app.post('/subscription', (req, res) => {
	const sub = req.body
	res.set('Content-Type', 'application/json')
	// registering plugin
	webpush.setVapidDetails('mailto:you@domain.com', PUBLIC_VAPID, PRIVATE_VAPID);
	const Payload = JSON.stringify({
		notification: {
			title: 'Bid Winnier Resolved',
			body: 'Subscribe to the site and then Cheack Bid winner',
			icon: 'assets/images/logo.png',
		},
	});
	Promise.resolve(webpush.sendNotification(sub, Payload)).then(() => res.status(200).json({
		message: 'Notification sent'
	})).catch(err => {
		console.error(err);
		res.sendStatus(500);
	})
});

// send notification
app.post('/sendNotification', (req, res) => {
	const notificationPayload = {
		notification: {
			title: 'Bid Winnier Notifyed',
			body: 'Subscribe to the site and then Cheack Bid winner',
			icon: 'assets/images/logo.png',
		},
	}

	const promises = []
	BidData.forEach(subscription => {
		promises.push(
			webpush.sendNotification(
				subscription,
				JSON.stringify(notificationPayload)
			)
		)
	})
	Promise.all(promises).then(() => res.sendStatus(200))
})
app.post('/upload', upload.single('photo'), function (req, res) {
	if (!req.file) {
		console.log("No file received");
		return res.send({
			success: false
		});

	} else {
		console.log('file received');
		return res.send({
			success: true
		})
	}
});
// connect server to angular index file
// app.get('*', (req, res)=>{
// 	res.sendFile(path.join(__dirname + '/obsclient/dist/index.html'));
// })


app.listen(8080, () => {
	console.log('Listening on Port 8080');
});