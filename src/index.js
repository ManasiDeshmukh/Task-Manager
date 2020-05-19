const express = require('express')
require('./db/mongoose')
const userRouter = require('./router/user')
const taskRouter = require('./router/task')

const app = express()
const port = process.env.PORT || 3000
app.use(express.json())
app.use(express.json())//its going to automatically pass incoming json to object so we can access it in request handlers
app.use(userRouter)
app.use(taskRouter)




app.listen(port,()=>
{
console.log('server listen on port',port)
})

const jwt=require('jsonwebtoken')

const bcrypt=require('bcryptjs')

const myfunction=async ()=>
{/* 
    const password='red123'
    const hash1=await bcrypt.hash(password,8)
    console.log(password)
    console.log(hash1)
const match=await bcrypt.compare('red123',hash1)
{console.log(match)

} */
const token=jwt.sign({_id:'5ec2e0d614704227c486569d'},'This is my new course',{expiresIn:'8 days'})
//1st arg:unique arg so we provide id of user
//2nd arg:secret key ,it canbe random chars
//3rd:token expires time it can be string like 3 days 4 weeks or any sec
console.log(token)
//divided in 3 parts 1st is base64 json string known as header it contain basic info like algo used
//2nd is:payload or load encoded json string (idwe provided)
//3rd:encoded secret key or signature 
const data=jwt.verify(token,'This is my new course')//return  payload if token is verified
//
console.log(data)
}
myfunction() 