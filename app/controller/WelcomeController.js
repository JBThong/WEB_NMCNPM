//app/controller/WelcomeController.js
var Articles = require('../model/articles.js');

var WelcomeController = {
	index: function(req, res) {
		var objUser = {};
		objUser.id = 3;
		var userInfo = Articles.getArticleById(objUser)
		.then(function(userIn){
			console.log(userIn);
			res.render('user/index',{
				userInfo: userIn
			});
		})
		.catch(function(errors) {
			console.log(errors);
		  });;
		
		
	},
	about: function(req, res) {
		res.render('user/about',{
			
		});
	},
	login: function(req, res) {
		res.render('user/login',{
			
		});
	},
	signup: function(req, res) {
		res.render('user/signup',{
			
		});
	},
	detail: function(req, res) {
		res.render('user/detail',{
			
		});
	},
	profile: function(req, res) {
		res.render('user/profile',{
			
		});
	}
}

module.exports = WelcomeController;


