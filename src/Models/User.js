const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('users', UserSchema);