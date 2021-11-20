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
const userRouter = require("./routes/user");
// const commentRouter = require("./routes/comment");
const markRouter = require("./routes/mark");
// const ratingRouter = require("./routes/rating");
// const replyRouter = require("./routes/reply");
// const savedRouter = require("./routes/reply");


// initalize an express app
const app = express();

// initialize cookie session
app.use(session({ 
  secret: 'bluber-gang-of-four', 
  resave: true, 
  saveUninitialized: false
}));

// allow express to reroute umatched urls to Vue frontend
app.use(history());

// allows us to make requests from POSTMAN
app.use(cors());

// set up the app to use dev logger
app.use(logger('dev'));

// accept json
app.use(express.json());

// https://stackoverflow.com/questions/29960764/what-does-extended-mean-in-express-4-0
// allows object nesting in POST
app.use(express.urlencoded({ extended: false }));

// cookies for sessions
app.use(cookieParser());

// declare the root directory depending on the current env
const isProduction = process.env.NODE_ENV === 'production';
app.use(express.static(path.join(__dirname, isProduction ? 'dist' : 'public')));

// connect url hierarchies to our routers
app.use("/api/user", userRouter);
app.use("/api/mark", markRouter);
// app.use("/api/comment", commentRouter);
// app.use("/api/rating", ratingRouter);
// app.use("/api/reply", replyRouter);
// app.use("/api/saved", savedRouter);


// catch all the other routes and display error message
app.all('*', (req, res) => {
  res.status(404).json({
    message: "Page not found"
  }).end();
});

module.exports = app;
