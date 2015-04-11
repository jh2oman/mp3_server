var mongoose = require('mongoose');

// Define our User schema

var UserSchema   = new mongoose.Schema({
  name: {type: String, required: "name required"},
  email: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
  pendingTasks: [String],
  dateCreated: {type: Date, default: Date.now}
});

// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);