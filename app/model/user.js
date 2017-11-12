const pool = require('../model/pg');
var User = {
	getUserById: function(user) {
  var sql = `select * from users where id=${user.id}`;
  console.log(sql);
    return new Promise(function(resolve, reject) {
      pool.query(sql, function(errors, result) {
        if(errors) {
            reject(errors);
        } else {
            resolve(result.rows[0]);
        }
      });
    });
  },
}

module.exports = User;