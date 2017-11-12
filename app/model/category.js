const pool = require('../model/pg');
var Category = {
	newCate: (cateInfo) => {
        return new Promise((resolve,reject)=>{
            var query = `insert into category(name,slug,orderb,ishide,catalog_id,created_at,updated_at) values('${ cateInfo.name }','${ cateInfo.slug }', ${cateInfo.orderb },${ cateInfo.isHide},${cateInfo.catalog_id},'${ cateInfo.created_at }','${ cateInfo.updated_at }')`;
            console.log(query);
            pool.query(query, function(err, res){
                if (err){
                    reject(err);
                }
                else{
                    console.log(res);
                    resolve(res);
                }
                    
            });
        });
	},
	getAll: ()=>{
        return new Promise((resolve,reject)=>{
            pool.query(`select category.*,catalog.name as cataname from category,catalog where category.catalog_id = catalog.id order by orderb asc, id desc`, function(err, result){
                if (err){
                    reject(err);
                }
                else
                    resolve(result.rows);
            });
        })
		
	},
	getById: (id)=>{
        return new Promise((resolve,reject)=>{
            pool.query(`select * from category where id=${id}`, function(err, result){
                if (err){
                    reject(err);
                }
                else
                    resolve(result.rows[0]);
            });
        });
	},
	updateById: function(cateInfo){
        return new Promise((resolve,reject)=>{
            var query = `update category set catalog_id = ${cateInfo.catalog_id},name = '${ cateInfo.name }', slug = '${ cateInfo.slug }', orderb = ${ cateInfo.orderb }, updated_at = '${ cateInfo.updated_at }', ishide = ${ cateInfo.ishide } where id = ${ cateInfo.id}`;
            console.log(query);
            pool.query(query, function(err, result){
                if (err){
                    reject(err);
                }
                else
                    resolve( result.rows);
            });
        });
	},
	visible: function(cateInfo,callback){
		var query = `update category set hide = ${cateInfo.hide} where id = ${cateInfo.id}`;
		pool.query(query, function(err, result){
			if (err){
				callback(err, null);
			}
			else
				callback(null, null);
		});
	},
	delete: function(id,callback){
		var query = `delete from category where id= ${id}`;
		pool.query(query, function(err, result){
			if (err){
				callback(err, null);
			}
			else
				callback(null, null);
		});
	}, 
}

module.exports = Category;