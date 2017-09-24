const pool = require('../model/pg');
var Cate = {
	newCate: function(cateInfo, callback){
		var query = "insert into cates(name,alias,orderb,created_at,updated_at,hide) values('" 
		+ cateInfo.name + "','" 
		+ cateInfo.alias + "'," 
		+ cateInfo.order + ",'" 
		+ cateInfo.created_at + "','" 
		+ cateInfo.updated_at + "'," 
		+ cateInfo.hide + ")";
		console.log(query);
		pool.query(query, function(err, res){
			if (err){
				callback(err, null);
			}
			else
				callback(null, null);
		});
	},
	getAll: function(callback){
		pool.query("select * from cates order by orderb asc, id desc", function(err, result){
			if (err){
				callback(err, null);
			}
			else
				callback(null, result.rows);
		});
	},
	getById: function(id,callback){
		pool.query("select * from cates where id=" + id, function(err, result){
			if (err){
				callback(err, null);
			}
			else
				callback(null, result.rows[0]);
		});
	},
	updateById: function(cateInfo,callback){
		var query = "update cates set name = '" 
		+ cateInfo.name + "', alias = '" 
		+ cateInfo.alias + "', orderb = " 
		+ cateInfo.order + ", updated_at = '" 
		+ cateInfo.updated_at + "', hide = " 
		+ cateInfo.hide + " where id = " + cateInfo.id;
		pool.query(query, function(err, result){
			if (err){
				callback(err, null);
			}
			else
				callback(null, result.rows);
		});
	},
	visible: function(cateInfo,callback){
		var query = 'update cates set hide = ' + cateInfo.hide + ' where id = ' + cateInfo.id;
		pool.query(query, function(err, result){
			if (err){
				callback(err, null);
			}
			else
				callback(null, null);
		});
	},
	delete: function(id,callback){
		var query = 'delete from cates where id=' + id;
		pool.query(query, function(err, result){
			if (err){
				callback(err, null);
			}
			else
				callback(null, null);
		});
	},
	listOrderb: function(idcate,callback){
		var orderb = '';
		for (var i = 1; i <= 9; i++) {
			if(i == idcate){
				orderb += '<option selected value="'+ i +'">Vị trí '+ i +'</option>';
			}
			else
				orderb += '<option value="'+ i +'">Vị trí '+ i +'</option>';
		}
		callback(orderb);
	}
}

module.exports = Cate;