const jwt=require('jsonwebtoken')
const User=require('../models/user')
const auth=async(req,res,next)=>
{
    try{//token set in header
const token=req.header('Authorization').replace('Bearer ','')
console.log(token)
const decoded=jwt.verify(token,'This is my new course')
const user=await User.findOne({_id:decoded._id,'tokens.token':token})
//find user with that id with having validaded id

if(!user)
throw new Error()
req.user=user
req.token=token
next()
    }catch(e)
    {
        res.status(401).send({error:'authentication error'})
    }
//next()
}
module.exports=auth
//https://www.udemy.com/course/the-complete-nodejs-developer-course-2/learn/lecture/13728970#questions/7784794