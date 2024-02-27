const express = require("express")
const router = express.Router()

const  {
    login,
    register,

} = require("../controller/auth")

router.post("/login",login)
router.post('/signup', register)
router.get("/gg", (req, res) => {
    res.json("sgfd")
})


module.exports = router


