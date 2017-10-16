//app/controller/AdminController.js

var express = require('express');
var router = express.Router();

router.get('/dashboard', function(req, res) {
    res.render('admin/dashboard',{
        layout: 'main-admin',
    });
});

module.exports = router;
