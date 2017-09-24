var pg = require('pg');
require('dotenv').config()
var config = {
	user: process.env.DB_USER, //env var: PGUSER
	database: process.env.DB_DATABASE, //env var: PGDATABASE
	password: process.env.DB_PASS, //env var: PGPASSWORD
	host: process.env.DB_HOST, // Server hosting the postgres database
	port: 5432, //env     var: PGPORT
	max: 20, // max number of clients in the pool
	idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

const pool = new pg.Pool(config);

module.exports = pool;

