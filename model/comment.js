const mongoose = require('mongoose')


const commentSchema = new mongoose.Schema({
  answers: {
        type: String,
        require: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})



const User = mongoose.model('Comments', commentSchema)
module.exports = User
