// app/routes.js

var WelcomeController = require('../app/controller/WelcomeController');
var ArticleController = require('../app/controller/ArticleController');
var CatalogController = require('../app/controller/CatalogController');
var CategoryController = require('../app/controller/CategoryController');
var AdminController = require('../app/controller/AdminController');
var UserController = require('../app/controller/UserController');
var LoginController = require('../app/controller/LoginController');

var mw = require('../config/middleware');

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
	
	app.get('/profile', WelcomeController.profile);

	app.use("/admin",AdminController);
	app.use("/admin/article",ArticleController);
	app.use("/admin/catalog",CatalogController);
	app.use("/admin/category",CategoryController);
	app.use("/admin/user",UserController);

	

	//Login area
	

	app.get('/login', mw.Logged,LoginController.formLogin);
	app.post('/login', mw.Logged,LoginController.login);


	app.get('/signup', mw.Logged,LoginController.formSignup);
	app.post('/signup', mw.Logged, passport.authenticate('local-signup', {
			successRedirect : '/login', // redirect to the secure profile section
			failureRedirect : '/signup',
			failureFlash : true, // allow flash messages
			session: false
		}));


	app.get('/logout', LoginController.logout);


	app.get('/auth/facebook', passport.authenticate('facebook', { scope : ['email','user_friends'] }));

	
	// handle the callback after facebook has authenticated the user
	app.get('/auth/facebook/callback',
		passport.authenticate('facebook', {
			successRedirect : '/',
			failureRedirect : '/login'
		}));

	app.use(function(req,res,next){
		res.locals = ({
			user: req.user
		});
		return next();
	});

};

// route middleware to make sure

