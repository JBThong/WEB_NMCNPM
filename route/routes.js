// app/routes.js

var WelcomeController = require('../app/controller/WelcomeController');
var ArticleController = require('../app/controller/ArticleController');
var CategoryController = require('../app/controller/CategoryController');
var AdminController = require('../app/controller/AdminController');
var UserController = require('../app/controller/UserController');

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
	app.get('/detail',  WelcomeController.detail);
	app.get('/about',  WelcomeController.about);
	app.get('/signup', WelcomeController.signup);
	app.get('/login', WelcomeController.login);
	app.get('/profile', WelcomeController.profile);

	app.use("/admin",AdminController);
	app.use("/admin/article",ArticleController);
	app.use("/admin/category",CategoryController);
	app.use("/admin/user",UserController);

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
