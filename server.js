const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const methodOverride = require('method-override');
const flash = require('express-flash');
const logger = require('morgan');
const connectDB = require('./config/database');
require('dotenv').config({path: './config/.env'})
const homeRoutes = require('./routes/home');
const dashboardRoutes = require('./routes/dashboard');
const profileRoutes = require('./routes/profile');

require('./config/passport')(passport);


//connect to database
connectDB();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger('dev'));
app.use(methodOverride('_method'));

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});


app.use('/', homeRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/profile', profileRoutes);

app.listen(process.env.PORT, ()=> {
  console.log(`Server is running on port ${process.env.PORT}`);
})
