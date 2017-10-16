//app/controller/CategoryController.js


var express = require('express');
var router = express.Router();

router.get('/add', function(req, res) {
    res.render('admin/category/add',{
        layout: 'main-admin',
    });
});

router.get('/list', function(req, res) {
    res.render('admin/category/list',{
        layout: 'main-admin',
    });
});


module.exports = router;


