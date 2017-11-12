//app/controller/catalogController.js


var express = require('express');
var router = express.Router();
var Catalog = require('../model/catalog.js');
var moment = require('moment');
var slug = require('slug');
router.get('/add', (req, res) => {
    res.render('admin/catalog/add',{
        layout: 'main-admin',
        title: 'Thêm danh mục mới'
    }); 
});

router.post('/add', (req, res) => {
    console.log(req.body.name);
    console.log(req.body.order);

    var temp = req.body.checkbox ? 'true' : 'false';
    var getTimeNow = moment().format('YYYY-MM-DD HH:mm:ss');
    var cataInfo = {
        name: req.body.name,
        orderb: req.body.order,
        slug: slug(req.body.name,"-").toLowerCase(),
        isHide: temp,
        created_at: getTimeNow,
        updated_at: getTimeNow
    };

    Catalog.newCata(cataInfo)
    .then(()=>{
        req.flash('messageCate', 'Đã thêm danh mục thành công!');
        res.redirect('/admin/catalog/list');
    })
    .catch(err=>console.log(err));
});

router.get('/list', (req, res) =>{
    Catalog.getAll()
    .then((result)=>{
        res.render('admin/catalog/list',{
            list: result,
            layout: 'main-admin',
            title: 'Danh sách danh mục',
            message: req.flash('messageCate')[0]
        });
    })
    .catch((err) => {
        console.log(err);
        res.end();
    });
        
});

router.get('/edit/:id', (req, res) => {

    Catalog.getById(req.params.id)
    .then(result => {
        res.render('admin/catalog/edit',{
            layout: 'main-admin',
            title: 'Sửa danh mục',
            cata: result,
        }); 
    })
    .catch(err=>console.log(err));
});

router.post('/edit/:id', (req,res)=>{
    var temp = req.body.checkbox  ? 'true' : 'false';
    console.log(req.body.checkbox);
    console.log(temp);
    var getTimeNow = moment().format('YYYY-MM-DD HH:mm:ss');
    var cataInfo = {
        id: req.body.id,
        name: req.body.name,
        orderb: req.body.order,
        slug: slug(req.body.name,"-").toLowerCase(),
        ishide: temp,
        updated_at: getTimeNow
    };
    console.log(cataInfo);
    Catalog.updateById(cataInfo)
    .then(() => {
        req.flash('messageCate', 'Đã Sửa danh mục thành công!');
        res.redirect('/admin/catalog/list');
    })
    .catch(err => console.log(err));
})

module.exports = router;


