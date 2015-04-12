var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = require('../models/user.js');

/* GET /users listing. */
router.get('/', function(req, res) {
  query = User.find();

  if(req.query.where){
    query = query.where(JSON.parse(req.query.where));
  }

  if(req.query.sort){
    query = query.sort(JSON.parse(req.query.sort));
  }

  if(req.query.skip){
    query = query.skip(JSON.parse(req.query.skip));
  }

  if(req.query.limit){
    query = query.limit(JSON.parse(req.query.limit));
  }

  if(req.query.count){
    query = query.count(JSON.parse(req.query.count));
  }

  if(req.query.select){
    query = query.select(JSON.parse(req.query.select));
  }

  query.exec(function (err, users) {
    if (err)
      res.status(500).json({message: "Get Request for Users Failed", data: err});
    else
      res.status(200).json({message: "OK", data: users});
  });

});


/* POST /users */
router.post('/', function(req, res){
  var name = req.body.name;
  var email = req.body.email;

  if(name == null)
  {
    res.status(400).json({message:"User must have a name", data: []});
  }
  else if(email == null)
  {
    res.status(400).json({message:"User must have an email", data: []});
  }
    else {
      var usr = new User();
      usr.name = name;
      usr.email = email;
      usr.save(function(err){
        if (err) {
          res.status(400);
          if (err['code'] == 11000) {
            res.json({'message':'Email already exists.', data:err});
          }
          else {
            res.send(err);
          }
          res.end();
        }
        else {
          res.status(201);
          res.json({'message':'OK','data':usr});
          res.end();
        }
      });
    }
});
/* GET /users/id */
router.get('/:id', function(req, res) {
  User.findById(req.params.id, function (err, user) {
    if (user == null)
      res.status(404).send({message: 'Sorry, we cannot find that User!', data : err});
    else if (err)
      res.status(500).send({message: "GET Request for Users Failed", data: err});
    
    else
      res.status(200).json({message: 'User Retrieved', data : user});
  });
});

// PUT /users/id
router.put('/:id', function(req, res) {
  User.findById(req.params.id, function (err, user) {
    var name = req.body.name;
    var email = req.body.email;
    var tasks = req.body.pendingTasks;
    if(name == "" || name==null)
      res.status(400).send({'message':'Users must have names', data: []});
    else if(email == "" || email==null)
      res.status(400).send({'message':'Users must have emails', data: []});
    else{
    user.name=name;
    user.email=email;
    user.pendingTasks=tasks;
    user.save(function(err){
    if (err) {
          res.status(400);
          if (err['code'] == 11000) {
            res.send({'message':'Email already exists.', data:err});
          }
          else {
            res.send(err);
          }
          res.end();
        }
    else
    {
      res.status(200).json({message: 'User Updated', data : user});
      res.end();
    }
  });
  }
  });
});

/* DELETE /users/:id */
router.delete('/:id', function(req, res) {
  User.findByIdAndRemove(req.params.id, req.body, function (err, user) {
    if (user == null)
      res.status(404).send({message: 'Sorry, we cannot find that User!', data : err});
    else if (err)
      res.status(500).send({message: "DELETE Request for User Failed", data: err});
    
    else
      res.status(200).json({message: 'User Deleted', data : user});
  });
});

// OPTIONS /users
router.options(function(req, res){
      res.writeHead(200);
      res.end();
});



module.exports = router;