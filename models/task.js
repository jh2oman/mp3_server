var mongoose = require('mongoose');

// Define our beer schema
var TaskSchema = new mongoose.Schema({
  name: {type: String, required: "name required"},
  description: {type:String, default: "default description"},
  deadline: {type: Date, required: "deadline Date required"},
  completed: {type:Boolean, default: false},
  assignedUser: {type:String, default: "unassigned"},
  assignedUserName: {type: String, default: "unassigned"},
  dateCreated: {type: Date, default: Date.now}
});

// Export the Mongoose model
module.exports = mongoose.model('Task', TaskSchema);