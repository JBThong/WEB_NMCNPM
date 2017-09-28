// app/routes.js

var WelcomeController = require('../app/controller/WelcomeController');

var multer  =   require('multer');
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'public/product');
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() +"-" + file.originalname);
  }
});

var upload = multer({ storage : storage });

module.exports = function(app, passport,pool) {

	//Home
	app.get('/',  WelcomeController.index);

	app.get('/amp', (req,res) => res.render('amp'));

};

// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/login');
}

function Logged(req, res, next) {

	// if user isnt authenticated in the session, carry on
	if (!req.isAuthenticated())
		return next();

	// if they are redirect them to the home page
	res.redirect('/');
}

function LoggedAdmin(req, res, next) {

	// if user isnt authenticated in the session, carry on
	if (!req.isAuthenticated())
		return next();

	// if they are redirect them to the home page
	res.redirect('/admin/dashboard');
}

function isAdmin(req, res, next) {

	// if user isnt authenticated in the session, carry on
	if ( req.isAuthenticated() && req.user.role > 0)
		return next();

	// if they are redirect them to the home page
	res.redirect('/admin');
}

function isAdminAccess(req, res, next) {

	// if user isnt authenticated in the session, carry on
	if (req.user.role == 1)
		return next();

	// if they are redirect them to the home page
	res.end("401 - Unauthorized: Access is denied due to invalid credentials");
}
