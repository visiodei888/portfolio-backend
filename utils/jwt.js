const jwt = require("jsonwebtoken")

const createJWT = async (customToken) => {

    return jwt.sign(customToken,process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_LIFETIME
    })
}

const checkJWT = async(token) => {
    return jwt.verify(token,process.env.JWT_SECRET)
}

const attachCookies = async (res,customToken) => {
    
    const token = await createJWT(customToken)
    const day = 1000 * 60 * 60 * 24
    res.cookie("tokenCookie",token,{
        httpOnly:true,
        expires:new Date(Date.now() + day),
        secure:false,
        sighned: false,
    })
}

module.exports = {
    createJWT,
    checkJWT,
    attachCookies
}