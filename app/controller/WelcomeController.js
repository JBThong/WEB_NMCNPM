//app/controller/WelcomeController.js
var Articles = require('../model/articles.js');
var WelcomeController = {
	index: function(req, res) {
		// var objUser = {};
		// objUser.id = 3;
		// var userInfo = Articles.getArticleById(objUser)
		// .then(function(userIn){
		// 	//console.log(userIn);
		// 	res.render('user/index',{
		// 		userInfo: userIn
		// 	});
		// })
		// .catch(function(errors) {
		// 	console.log(errors);
		//   });;
		
		res.render('user/index',{
			message: req.flash('signupSuccess')[0] 
		});
		
	},
	about: function(req, res) {
		res.render('user/about',{
			
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


