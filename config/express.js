
module.exports = function(app,hbs,express, session,morgan,cookieParser,bodyParser,passport,flash) {
    app.engine('handlebars', hbs.engine);
    app.set('view engine', 'handlebars');// set up ejs for templating

    app.use(express.static('public'));
    //set up application
    app.use(morgan('dev')); // log every request to the console -> need to debug
    app.use(cookieParser()); // read cookie => for auth
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());


    // required for passport
    app.use(session({
        secret: 'tangliang',
        resave: true,
        saveUninitialized: true
     } )); // session secret
    app.use(passport.initialize());
    app.use(passport.session()); // persistent login sessions
    app.use(flash()); // session flash message

    app.use(function(req,res,next){
        res.locals = ({
            user: req.user
        });
        return next();
    });
};
