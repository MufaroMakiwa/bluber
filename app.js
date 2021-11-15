const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
var cors = require('cors');
const logger = require('morgan');
const history = require('connect-history-api-fallback');


// require dotenv which allows setting variables in .env file
require('dotenv').config();

// require routers
// TODO

// initalize an express app
const app = express();

// allow express to reroute umatched urls to Vue frontend
app.use(history());

// allow cross origin with POSTMAN
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// declare the root directory depending on the current env
const isProduction = process.env.NODE_ENV === 'production';
app.use(express.static(path.join(__dirname, isProduction ? 'dist' : 'public')));

// initialize cookie session
app.use(session({ 
  secret: 'bluber-gang-of-four', 
  resave: true, 
  saveUninitialized: false
}));

// catch all the other routes and display error message
app.all('*', (req, res) => {
  res.status(404).json({
    message: "Page not found"
  }).end();
});

module.exports = app;
