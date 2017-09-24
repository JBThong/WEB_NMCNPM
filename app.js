// server.js

// setup 
// setup 
var express  = require('express');
var session  = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var exphbs = require('express-handlebars')


var app      = express();
var port     = process.env.PORT || 3000;

var passport = require('passport');
var flash    = require('connect-flash');

const pool = require('./app/model/pg');

require('./config/passport')(passport,pool);

var hbs = exphbs.create({ defaultLayout: 'main-admin' ,
	helpers: {
		inc : function(value, options)
			{
			    return parseInt(value) + 1;
			},
		ifCond: function (v1, operator, v2, options) {
		    switch (operator) {
		        case '==':
		            return (v1 == v2) ? options.fn(this) : options.inverse(this);
		        case '===':
		            return (v1 === v2) ? options.fn(this) : options.inverse(this);
		        case '!=':
		            return (v1 != v2) ? options.fn(this) : options.inverse(this);
		        case '!==':
		            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
		        case '<':
		            return (v1 < v2) ? options.fn(this) : options.inverse(this);
		        case '<=':
		            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
		        case '>':
		            return (v1 > v2) ? options.fn(this) : options.inverse(this);
		        case '>=':
		            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
		        case '&&':
		            return (v1 && v2) ? options.fn(this) : options.inverse(this);
		        case '||':
		            return (v1 || v2) ? options.fn(this) : options.inverse(this);
		        default:
		            return options.inverse(this);
		    }
		},
		fmNum: function(value) {
		    var parts = value.toString().split(".");
		    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		    return parts.join(".");
		},
		tenPercent: function(value) {
		    return parseInt(value) + parseInt(value*0.1);
		},
		total: function(value,qty) {
			value = value*qty;
			var parts = value.toString().split(".");
		    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		    return parts.join(".");
		}
	},
});



require('./config/express')(app,hbs,express, session,morgan,cookieParser,bodyParser,passport,flash);


// routes ======================================================================
require('./route/routes.js')(app, passport,pool); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('Server started on port ' + port);
