var path = require('path'),
    express = require('express')
    routes = require('./routes'),
    exphbs = require('express-handlebars'),
    router  = express.Router(),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    morgan       = require('morgan'),
    errorhandler = require('errorhandler');
var createError = require('http-errors');


// New stuff to add
//---------------------------------------------------
// const hbs = require('hbs');
const MongoClient = require('mongodb').MongoClient;
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const authUtils = require('../utils/auth');
const session = require('express-session');
const flash = require('connect-flash');
// --------------------------------------------------


var indexRouter = require('../routes/index');
var usersRouter = require('../routes/users');

// Add new routes
// --------------------------------------------------
const authRouter = require('../models/register');
// --------------------------------------------------


// const authUtils = require('../utils/auth');
// const passport  = require('passport');
// const flash = require('connect-flash');


var worker = require('../models/workers');
var house  = require('../models/house');
var assistance = require('../models/customer');
var register  = require('../models/register');


module.exports = function(app){
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({'extended': false}));
    app.use(bodyParser.json());
    app.use(cookieParser('some-secret-text-here'));
    routes(app) // moving the routes to the routes folder
    app.use('/public', express.static(path.join(__dirname,'../public')));

    // these code below excutes the handlebars as the default template engine with the main file as the default file
    app.engine('handlebars', exphbs({
        extname: 'handlebars',
        defaultLayout: 'main',
        layoutDir: app.get('views') + '/layouts',
        partialsDir : [app.get('views') + '/partials']
    }));
    app.set('view engine', 'handlebars');

   
    app.use('/workers', worker);
    app.use('/', house);
    app.use('/assistance', assistance);
    
    



MongoClient.connect('mongodb://localhost', (err, client) => {
    if (err) {
        throw err;
    }

    const db = client.db('smarthome');
    const users = db.collection('users');
    app.locals.users = users;
});
// --------------------------------------------------


// Configure passport
// --------------------------------------------------
passport.use(new Strategy(
    (username, password, done) => {
        app.locals.users.findOne({ username }, (err, user) => {
            if (err) {
                return done(err);
            }

            if (!user) {
                return done(null, false);
            }

            if (user.password != authUtils.hashPassword(password)) {
                return done(null, false);
            }

            return done(null, user);
        });
    }
));

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    done(null, { id });
});
// --------------------------------------------------

// Configure session, passport, flash
// --------------------------------------------------
app.use(session({
    secret: 'session secret',
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use((req, res, next) => {
    res.locals.loggedIn = req.isAuthenticated();
    next();
});
// --------------------------------------------------



// Add new routes
// --------------------------------------------------
app.use('/auth', authRouter);
// --------------------------------------------------
app.use('/', indexRouter);
app.use('/users', usersRouter); 
//catch 404 and forward to error handler
app.use(function(req, res, next) {
    // next(createError(404));
    var err  = new Error('The page is not found');
    err.status = 404;
    next(err);
    // res.send('The Request Not Found');   
});
 
// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
    // res.redirect('/', indexRouter)
});
// app.use('/', indexRouter);
// app.use('/users', usersRouter);


if('development' === app.get('env')){
    app.use(errorhandler());

}

return app;
};