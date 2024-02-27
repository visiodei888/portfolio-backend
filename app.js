require('express-async-errors')
require('dotenv').config({})
const connect = require('./db/connect')

const express = require('express')
const app = express()

const cookieParser = require('cookie-parser')
const morgon = require('morgan')

app.use(cookieParser())
app.use(express.json())
app.use(morgon('tiny'))

const ratelimiter = require('express-rate-limit')
const xssClean = require('xss-clean')
const helmet = require('helmet')
const cors = require('cors')

app.set('trust proxy', 1)
app.use(
  ratelimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
  })
)

app.use(helmet())
app.use(xssClean())
app.use(cors())

//routers

const authRouter = require('./router/auth')
const commentRouter = require('./router/comment')

app.use('/auth', authRouter)
app.use('/comments', commentRouter)

//middlewares

const notFoundMiddleware = require('./middleware/not-found')
const errorHandleMiddleware = require('./middleware/error-handle')

app.use(notFoundMiddleware)
app.use(errorHandleMiddleware)


//main app

const port = 3002 || process.env.PORT

try {
  await connect(process.env.MONGO_URL)
} catch (error) {
  console.log(error)
}


start()
app.listen(port, () => {
  console.log(`Server is listening on port ${port}....`)
})