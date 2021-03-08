var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose");
var bodyParser = require('body-parser');
const cors = require('cors');
import passport from 'passport';
import routes from './routes/user.route';
import secureRoutes from './routes/secure-routes';

require('dotenv').config();
require('./config/passport');

var app = express();

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: true,
  useCreateIndex: true
}, (err) => {
  if (err) console.log('Error during mongoose connection: ' + err);
  else {
      console.log('Successful mongoose connection.');
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const routess = require('./routes/index');


app.use('/', routess);

app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
// We plugin our jwt strategy as a middleware so only verified users can access specified routes
secureRoutes(app, passport);
routes(app);



module.exports = app;
