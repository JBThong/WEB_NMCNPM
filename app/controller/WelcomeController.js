//app/controller/WelcomeController.js


var WelcomeController = {
	index: function(req, res) {
		res.render('admin/dashboard',{
			trimap: 'Nhập môn công nghệ phần mềm - K15'
		});
	}
}

module.exports = WelcomeController;


