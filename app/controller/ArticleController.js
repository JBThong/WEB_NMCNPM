//app/controller/ArticleController.js
var express = require('express');
var router = express.Router();

router.get('/add', function(req, res) {
    res.render('admin/article/add',{
        layout: 'main-admin',
    });
});

router.get('/list', function(req, res) {
    res.render('admin/article/list',{
        layout: 'main-admin',
    });
});

router.get('/edit', function(req, res) {
    res.render('admin/article/edit',{
        layout: 'main-admin',
    });
});

module.exports = router;



