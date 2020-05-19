const express=require('express')
const router=express.Router()
const User =require('../models/user')

router.post('/users',async(req,res)=>
{
    const user=new User(req.body)
    console.log(user)
   /*  user.save().then((user)=>
    {
res.send(user)
    }).catch((e)=>
    {res.status(400)
        console.log(e)
res.send(e)
    }) */
try{
    await user.save()
    res.status(200).send(user)
}
catch(e){
    res.status(500).send(e) 
    console.log(e)
} 
})

router.post('/users/login',async(req,res)=>
{
    console.log(req.body)
    try{
const user= await User.findByCredentials(req.body.Email,req.body.password)
 res.send(user) 
console.log(user)
  }
    catch(e)
    {
        console.log(e)
res.status(404).send(e)
    }
})








router.get('/users',async(req,res)=>
{/* 
    User.find({}).then((users)=>
    {
        res.status(400).send(users)
    }).catch((e)=>
    {
        res.status(500).send(e)
    }) */
    try{
   const users= await  User.find({})
        res.status(400).send(users)
    }
    catch(e)
    {
        res.status(500).send(e)
    }
})
router.get('/users/:id',async(req,res)=>
{
    const _id=req.params.id
   /*  User.findById(_id).then((users)=>
    {
        if(!users)
        return res.status(404).send()
res.send(users)
    }).catch((e)=>
    {
res.status(500).send()
    }) */
    try{
     const users=await User.findById(_id)
        if(!users)
        return res.status(404).send()
        res.send(users)
    }
    catch(e)
    {
        res.status(500).send()
    }
 

})
router.patch('/users/:id',async(req,res)=>
{ 
    console.log(req.body)
    const updates=Object.keys(req.body)//keys in body in postman
const allowed=['name','age','password','Email']
const isvalidoperation=updates.every((update)=>
{
 allowed.includes(update)
})
if(!isvalidoperation)
{
    return res.status(404).send('invalid updates')
} 
try{//dynamic way
    const user=await User.findById(req.params.id)
    updates.forEach((update )=> {
      user[update]=req.body[update]
     
    
     //   const user=await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runvalidators:true})

    })
    await user.save()    
   // console.log(req.params.id)
      if(!user)
   return res.status(404).send()
   res.send(user)
console.log(user)
}
   catch(e)
   {
       res.status(500).send(e)
   }
   
})
router.delete('/users/:id',async(req,res)=>
{
    try{
const data= await User.findByIdAndDelete(req.params.id) 
if(!data)
return res.status(404).send()
res.status(200).send(data)

}
    catch(e)
    {
        res.status(500).send()   
    }
})
module.exports=router