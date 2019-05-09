//Libraries
var express = require('express');
var path = require('path');
const multer = require('multer');

// App Instance
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
// Log requests to console
var morgan = require('morgan');

// Set up Database connection
const mongoose=require('mongoose')
mongoose.connect('mongodb+srv://kavya:kavya@cluster0-uvoqn.mongodb.net/test?retryWrites=true',{ useNewUrlParser: true}, function(err) {
  if (err) throw err;
  else {
      console.log('Successfully connected to MongoDB');
  }
})

//use express session to maintain session data
app.use(session({
  secret              : 'cmpe273',
  resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
  saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
  duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
  activeDuration      :  5 * 60 * 1000
}));

//Allow Access Control
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

// Log requests to console
app.use(morgan('dev'));

// Routes and Backend Funcioncalities

app.use(express.static('public'));

// parse application/x-www-form-urlencoded
// for easier testing with Postman or plain HTML forms
app.use(bodyParser.urlencoded({extended: true}));

// parse application/json
app.use(bodyParser.json());



var orderroute = require('./routes/order');
app.use(orderroute);



// Execute App
app.listen(3001, () => {
  console.log('Quora Backend running on Port:',3001);
});
