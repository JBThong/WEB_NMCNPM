//app/controller/Login.js
var User = require('../model/user.js');
var passport = require('passport');
const pool = require('../model/pg');

var LoginController = {
	formLogin : function(req, res) {
		//console.log(req.flash('loginMessage'));
		// render the page and pass in any flash data if it exists
		res.render('user/login', { 
			message: req.flash('loginMessage')[0],
			success: req.flash('signupSuccess')[0] 
		});
	},
    formSignup : function(req, res) {
		//console.log(req.flash('loginMessage'));
		// render the page and pass in any flash data if it exists
		res.render('user/signup', { 
			message: req.flash('signupMessage')[0] 
		});
	},
	formLoginAdmin : function(req, res) {
		//console.log(req.flash('loginMessage'));
		// render the page and pass in any flash data if it exists
		res.render('admin/login', { 
			layout: false,
			message: req.flash('loginMessage')[0] 
		});
	},

	login : function(req, res, next) {
		passport.authenticate('local-login', function(err, user, info) {
			if (err) { return next(err); }
			// Redirect if it fails
			if (!user) { return res.redirect('/login'); }
			req.logIn(user, function(err) {
				if (err) { return next(err); }
				// Redirect if it succeeds
					return res.redirect('/');
				});
			})(req, res, next),
			function(req, res) {
	            //console.log("hello");
	            //remember me
	            if (req.body.remember) {
	              req.session.cookie.maxAge = 1000 * 60 * 3;
	            } else {
	              req.session.cookie.expires = false;
	            }
        }
	},
	adminlogin : function(req, res, next) {
		passport.authenticate('local-login-admin', function(err, user, info) {
			if (err) { return next(err); }
			// Redirect if it fails
			if (!user) { return res.redirect('/admin'); }
			req.logIn(user, function(err) {
				if (err) { return next(err); }
				// Redirect if it succeeds
					return res.redirect('/admin/dashboard');
				});
			})(req, res, next),
			function(req, res) {
	            //console.log("hello");
	            //remember me
	            if (req.body.remember) {
	              req.session.cookie.maxAge = 1000 * 60 * 3;
	            } else {
	              req.session.cookie.expires = false;
	            }
        }
	},
	
	logout: function(req, res) {
		req.logout();
		res.redirect('/');
	},
	logoutAdmin: function(req, res) {
		req.logout();
		res.redirect('/admin');
	},
	signup: function(req, res){
		passport.authenticate('local-signup', {
			successRedirect : '/', // redirect to the secure profile section
			failureRedirect : '/signup',
			failureFlash : true // allow flash messages
		});
	},
}

module.exports = LoginController;
