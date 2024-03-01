if(process.env.NODE_ENV !=="production")
{
   require('dotenv').config();
}
// Importing required modules
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');

const Override = require('method-override');
const Mate = require('ejs-mate');
const passportLocal = require('passport-local');
const passport = require('passport');
const User = require('./models/userModel');

const AppError = require('./utils/AppError');
const Userroute = require('./routes/user');
const Houseroute = require('./routes/houses');


const dbUrl=process.env.Db_url;

// Connecting to MongoDB database
mongoose.connect(dbUrl, {
 useNewUrlParser: true,
 useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
 console.log('connected Successful');
});

// Setting up Express app
const app = express();

app.engine('ejs', Mate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(Override('_method'));

// Setting up session and flash middleware
const sessionConfig = {
 secret: 'SecretCode',
 resave: false,
 saveUninitialized: true,
 cookie: {
    HttpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24,
    maxAge: 1000 * 60 * 60 * 24,
 },
};

app.use(session(sessionConfig));
app.use(flash());

// Setting up Passport middleware
app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Setting up global variables and error handling middleware
app.use((req, res, next) => {
 res.locals.CurrentUser = req.user;
 res.locals.success = req.flash('success');
 res.locals.error = req.flash('error');
 next();
});

// Setting up routes
app.use('/', Userroute);
app.use('/house', Houseroute);

app.get('/', (req, res) => {
 res.render('houses/home');
});

app.all('*', (req, res, next) => {
 next(new AppError('Page not found', 404));
});

app.use((err, req, res, next) => {
 const { status = 500 } = err;
 if (!err.message) {
    err.message = 'Something went wrong';
 }
 res.status(status).render('error', { err });
});

// Starting server
app.listen(2222, () => {
 console.log('Running');
});
