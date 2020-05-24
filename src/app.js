const express = require('express')

require('./db/mongoose')
const userRouter = require('./router/user')
const taskRouter = require('./router/task')

const app = express()


app.use(express.json())//its going to automatically pass incoming json to object so we can access it in request handlers
app.use(userRouter)
app.use(taskRouter)

module.exports=app