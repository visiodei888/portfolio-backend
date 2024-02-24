const { StatusCodes } = require("http-status-codes");
const { BadRequest, Unauthenticated, Unauthorized } = require("../customError");
const User = require("../model/user");
const { createToken, attachCookies } = require("../utils");

const register = async (req, res) => {
  let userDetails = ({ email, password, username } = req.body);

  if (!email || !password || !username) {
    throw new BadRequest("please enter all the details");
  }


  const checkDupEmail = await User.findOne({ email });
  if (checkDupEmail) {
    throw new BadRequest("email already exists");
  }


  console.log(userDetails);
  const userData = await User.create(userDetails);


  res.status(StatusCodes.CREATED).json({ data: "ok" });
};


const login = async (req, res) => {
  
  const {email,password} = req.body
  if(!email || !password) {
    throw new BadRequest("please enter all the details")
  }

  const user = await User.findOne({email:email})
  
  if (password !== user.password) {
    throw new Unauthorized('Invalid Credentials')
  }

  console.log("User Logged In Successfully!");
  res.status(StatusCodes.OK).json({ data: user });
}



module.exports = {
  login,

  register,

};
