const mongoose = require('mongoose');
const valid = require("validator")

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    validate: {
      validator: valid.isEmail,
      message: 'enter a valid email',
    },
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  userName: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin', "moderator"],
    default: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})


const User = mongoose.model('User', userSchema);
module.exports = User
