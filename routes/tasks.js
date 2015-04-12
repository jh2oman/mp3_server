var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Task = require('../models/task.js');

/* GET /tasks listing. */
router.get('/', function(req, res) {
  query = Task.find();

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

  query.exec(function (err, tasks) {
    if (err)
      res.status(500).json({message: "GET Request for Tasks Failed", data: err});
    else
      res.status(200).json({message: "OK", data: tasks});
  });
});

/* POST /tasks */
router.post('/', function(req, res) {
  var name = req.body.name;
  var deadline = req.body.deadline;

  if(name == null)
  {
    res.status(400).json({message:"Task must have a name", data: []});
  }
  else if(deadline == null)
  {
    res.status(400).json({message:"Task must have a deadline", data: []});
  }
    else {
      var tsk = new Task();
      tsk.name = name;
      tsk.deadline = deadline;
      tsk.completed=req.body.completed;
      tsk.description=req.body.description;
      tsk.assignedUser=req.body.assignedUser;
      tsk.assignedUserName=req.body.assignedUserName;
      tsk.save(function(err){
        if (err) {
          res.status(400);
          res.send(err);
          res.end();
        }
        else {
          res.status(201);
          res.json({'message':'OK','data':tsk});
          res.end();
        }
      });
    }
});


/* GET /tasks/id */
router.get('/:id', function(req, res) {
  Task.findById(req.params.id, function (err, task) {
    if (task == null)
      res.status(404).send({message: 'Sorry, we cannot find that Task!', data : err});
    else if (err)
      res.status(500).send({message: "GET Request for Tasks Failed", data: err});
    
    else
      res.status(200).json({message: 'Task Retrieved', data : task});
  });
});

// PUT /tasks/id
router.put('/:id', function(req, res) {
  Task.findById(req.params.id, function (err, task) {
    var name = req.body.name;
    var deadline = req.body.deadline;
    if(name == "" || name==null)
      res.status(400).send({'message':'Tasks must have names', data: []});
    else if(deadline == "" || deadline==null)
      res.status(400).send({'message':'Tasks must have deadlines', data: []});
    else{
    task.name=name;
    task.deadline=deadline;
    task.completed=req.body.completed;
    task.description=req.body.description;
    task.assignedUser=req.body.assignedUser;
    task.assignedUserName=req.body.assignedUserName;
    task.save(function(err){
    if (err) {
          res.status(400);
          res.send(err);
          res.end();
        }
    else
    {
      res.status(200).json({message: 'Task Updated', data : task});
      res.end();
    }
  });
  }
  });
});

/* DELETE /tasks/:id */
router.delete('/:id', function(req, res) {
  Task.findByIdAndRemove(req.params.id, function (err, task) {
    if (task == null)
      res.status(404).send({message: 'Sorry, we cannot find that Task!', data : err});
    else if (err)
      res.status(500).send({message: "DELETE Request for Task Failed", data: err});
    
    else
      res.status(200).json({message: 'Task Deleted', data : task});
  });
});

// OPTIONS /tasks
router.options(function(req, res){
      res.writeHead(200);
      res.end();
});



module.exports = router;