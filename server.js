// Get the packages we need
var express = require('express');
var mongoose = require('mongoose');
var Llama = require('./models/llama');
var Task = require('./models/task');
var User = require('./models/user');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var router = express.Router();
//replace this with your Mongolab URL
mongoose.connect('mongodb://jacob:hershey5@ds045137.mongolab.com:45137/mp3');
// Create our Express application
var app = express();

var tasks = require('./routes/tasks');
var users = require('./routes/users');
var homeRoute = router.route('/');
// Use environment defined port or 4000
var port = process.env.PORT || 4000;

//Allow CORS so that backend and frontend could pe put on different servers
var allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
  //res.header("Content-Type", "application/json");
  next();
};
app.use(allowCrossDomain);

// Use the body-parser package in our application

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(express.bodyParser());
//app.use(app.router);
app.use(cookieParser());
// All our routes will start with /api
app.use('/api', router);

//adding routes in other folders for organization

app.use('/api/tasks', tasks);
app.use('/api/users', users);

//Default route here


homeRoute.get(function(req, res) {
  res.json({ message: 'Hello World!' });
});

//Llama route 
var llamaRoute = router.route('/llamas');

llamaRoute.get(function(req, res) {
  res.json([{ "name": "alice", "height": 12 }, { "name": "jane", "height": 13 }]);
});

//Add more routes here

// Start the server
app.listen(port);
console.log('Server running on port ' + port); 