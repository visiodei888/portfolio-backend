const { StatusCodes } = require('http-status-codes')
const { BadRequest, Unauthenticated, Unauthorized } = require('../customError')
const Comment = require('../model/comment')
const User = require('../model/user')

const comment = async (req, res) => {
  let userDetails = ({ answers, userEmail } = req.body)

  console.log("als;dkfjl;askdfjlasdfjlaskdfjlkjdfsla")
  const commentedUser = await User.findOne({ email:userEmail })
  const data = {
    answers:userDetails.answers,
    user:commentedUser
  }

  const userData = await Comment.create(data)
  
  console.log('user commented')
  res.status(StatusCodes.CREATED).json({ ok: true })
}



module.exports = {
    comment
}
