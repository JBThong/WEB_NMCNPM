// config/passport.js

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

var bcrypt = require('bcrypt-nodejs');
var facebook = require('./facebook.js');
var moment = require('moment');

var momentNow = moment();
var formatted = momentNow.format('YYYY-MM-DD HH:mm:ss');
module.exports = function(passport,pool) {

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
      done(null, user);
    });

    passport.use(new FacebookStrategy({

        // pull in our app id and secret from our auth.js file
        clientID        : '310019682781511',
        clientSecret    : '5406f26498d9c2cdb251e3dfa5c7b7c0',
        callbackURL     : 'http://localhost:3000/auth/facebook/callback',
        profileFields   : ['id', 'emails', 'name','profileUrl','photos','friends'] //get field recall

    },

    //config facebook login
    function(token, refreshToken, profile, done) {
        process.nextTick(function() {

            // find the user in the database based on their facebook id
            pool.query("SELECT * FROM user_facebook, users WHERE users.id = user_facebook.id and idfb = '"+ profile.id+"'", function(err, user) {
                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err)
                    return done(err);

                // if the user is found, then log them in
                if (user.rows.length > 0) {
                   return done(null, user.rows[0]);
                 
                } else {

                    var newFacebooker = {
                        id: profile.id,
                        token: token,
                        email: profile.emails[0].value,
                        fullname: profile.name.givenName + ' ' + profile.name.familyName,
                        url: profile.profileUrl,
                        picture: profile.photos[0].value
                    };
                    
                    console.log(profile.friends);
                    // if there is no user found with that facebook id, create them
                    var insertQuery = "insert into users(fullname,phone,email,password) values('" + 
                    newFacebooker.fullname  +"',"+ 
                    "null,'" + 
                    newFacebooker.email +"',null"+ 
                    ") RETURNING id";
                    pool.query(insertQuery,function(err, rows) {
                        if (err)
                            return console.log(err);

                        var insertQuery = "insert into user_facebook(id,idfb,token,picture,url) values('" + 
                        rows.rows[0].id  +"','"+ 
                        newFacebooker.id +"','"+ 
                        newFacebooker.token +"','"+ 
                        newFacebooker.picture +"','"+ 
                        newFacebooker.url +
                        "') RETURNING id";
                        pool.query(insertQuery,function(err, rows) {
                            if (err)
                                return console.log(err);     
                           
                        });
                    });

                    return done(null, newFacebooker);
                }

            });
        });

    }));



    passport.use(
        'local-signup',
        new LocalStrategy({

            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) {
            //check user input
            pool.query("SELECT * FROM users WHERE email = '" + email + "'", function(err, rows) {
                if (err) //error
                    return done(err);
                if (rows.rows.length > 0) { //if user existed
                    return done(null, false, req.flash('signupMessage', 'Email đã tồn tại!.'));
                } 
                else {
                    // if there is no user with that username
                    // create the user
                    var newUser = {
                        email: email,
                        fullname: req.body.fulname,
                        phone: req.body.phone,
                        password: bcrypt.hashSync(password, null, null)  // use the generateHash function in our user model
                    };
                    console.log(newUser);
                    var insertQuery = "insert into users(fullname,phone,email,password) values('" + newUser.fullname +"','"+ newUser.phone +"','" + newUser.email + "','" + newUser.password +"') RETURNING id";
                    pool.query(insertQuery,function(err, rows) {
                         if (err)
                            return done(err);
                        newUser.id = rows.rows[0].id;
                        return done(null, newUser);
                    });
                }
            });
        })
    );

   
    //config local login
    passport.use(
        'local-login',
        new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) { // callback with email and password from our form
            pool.query("SELECT * FROM users WHERE email = '" + email + "'", function(err, rows){
                 //console.log(rows.rows[0].password);
                // console.log(bcrypt.hashSync(123456, null, null));
                
                if (err){
                    return done(err);
                }
                if (rows.rows.length == 0) {
                    console.log("Email not found!!!")
                    return done(null, false, req.flash('loginMessage', 'Thông tin đăng nhập không chính xác!')); // req.flash is the way to set flashdata using connect-flash
                }

                // if the user is found but the password is wrong
                if (!bcrypt.compareSync(password, rows.rows[0].password)){
                    console.log("Password not matched")
                    return done(null, false, req.flash('loginMessage', 'Thông tin đăng nhập không chính xác!')); // create the loginMessage and save it to session as flashdata
                }
                console.log('Auth successful!!!');
                // all is well, return successful user
                return done(null, rows.rows[0]);
            });
        })
    );
    passport.use(
        'local-login-admin',
        new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) { // callback with email and password from our form
            pool.query("SELECT * FROM users WHERE email = '" + email + "' and role > 0", function(err, rows){
                 //console.log(rows.rows[0].password);
                // console.log(bcrypt.hashSync(123456, null, null));
                
                if (err){
                    return done(err);
                }
                if (rows.rows.length == 0) {
                    console.log("Email not found!!!")
                    return done(null, false, req.flash('loginMessage', 'Thông tin đăng nhập không chính xác!')); // req.flash is the way to set flashdata using connect-flash
                }

                // if the user is found but the password is wrong
                if (!bcrypt.compareSync(password, rows.rows[0].password)){
                    console.log("Password not matched")
                    return done(null, false, req.flash('loginMessage', 'Thông tin đăng nhập không chính xác!')); // create the loginMessage and save it to session as flashdata
                }
                console.log('Auth successful!!!');
                // all is well, return successful user
                return done(null, rows.rows[0]);
            });
        })
    );
};
