const pool = require('../model/pg');
var Articles = {
	getArticleById: function(article) {
  var sql = `select * from articles where id=${article.id}`;
  console.log(sql);
    return new Promise(function(resolve, reject) {
      pool.query(sql, function(errors, result) {
        if(errors) {
            reject(errors);
        } else {
            //console.log(result);
            resolve(result.rows[0]);
        }
      });
    });
  },
}

module.exports = Articles;