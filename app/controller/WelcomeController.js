//app/controller/WelcomeController.js


var WelcomeController = {
	index: function(req, res) {
		res.render('user/index',{
			
		});
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
	}
}

module.exports = WelcomeController;


