require("express-async-errors") 
require("dotenv").config({path:"/home/bestin/Desktop/node-skelton/.env"})
const connect = require("./db/connect")

//express package
const express = require("express");
const app = express()

//extra packages

const cookieParser = require("cookie-parser")
const morgon = require("morgan")

app.use(cookieParser())
app.use(express.json())
app.use(morgon("tiny"));

// security packages

const ratelimiter = require('express-rate-limit');
const xssClean = require("xss-clean");
const helmet = require("helmet");
const cors = require("cors")

app.set('trust proxy', 1)
app.use(ratelimiter({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100}))

app.use(helmet())
app.use(xssClean())
app.use(cors())

//routers

const authRouter = require("./router/auth")

app.use("/api/v1/auth",authRouter)

//middlewares

const notFoundMiddleware = require("./middleware/not-found")
const errorHandleMiddleware = require("./middleware/error-handle")

app.use(notFoundMiddleware)
app.use(errorHandleMiddleware)


//main app

const port = 5000 || process.env.PORT

const start = async () => {
    try {
        await connect(process.env.MONGOOSE_URL)
        app.listen(port,() => {
            console.log(`Server is listening on port ${port}....`)
        })
    } catch (error) {
        console.log(error)   
    }
}

start()















