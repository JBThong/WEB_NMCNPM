//app/controller/CategoryController.js


var express = require('express');
var router = express.Router();


router.get('/list', function(req, res) {
    res.render('admin/user/list',{
        layout: 'main-admin',
    });
});

router.get('/edit', function(req, res) {
    res.render('admin/user/edit',{
        layout: 'main-admin',
    });
});

module.exports = router;


