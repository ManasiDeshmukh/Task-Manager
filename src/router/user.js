const express=require('express')
const router=express.Router()
const User =require('../models/user')
const multer=require('multer')
const sharp=require('sharp')
const bcrypt=require('bcryptjs')
const {sendWelcomeEmail}=require('../emails/account')
const {sendcancelEmail}=require('../emails/account')
const auth=require('../middleware/auth')
//heroku config:set  MONGODBURL="mongodb+srv://taskapp:<rc6zChUnXR0augis>@cluster0-rjdun.mongodb.net/task-manager-app?retryWrites=true&w=majority"

//===================sign in=============================
router.post('/users',async(req,res)=>
{
    const user=new User(req.body)

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
   // sendWelcomeEmail(user.Email,user.name)
    const token=await user.generateAuthToken()
    res.send({user,token})
}
catch(e){
    res.status(500).send(e) 
   console.log(e)
} 
})
//==========================login=======================================
router.post('/users/login',async(req,res)=>
{
   console.log(req.body)
    try{
const user=await User.findByCredentials(req.body.Email,req.body.password)
const token=await user.generateAuthToken()
res.send({user,token}) 
  }
    catch(error)
    {
        console.log(error)
res.status(400).send(error)
    }
})

//logout
router.post('/users/logout',auth,async(req,res)=>
{
    try{
req.user.tokens=req.user.tokens.filter((token)=>
{
    return token.token!=req.token
})
await req.user.save()
res.send()
    }
    catch(e)
    {
    res.status(500).send(e)
    
    }
})

//logout from all devicec
router.post('/users/logoutall',auth,async(req,res)=>
{
try{
req.user.tokens=[]
await req.user.save()
res.send()
}
catch(e)
{
    res.status(500).send(e)
}

})
//to fetch our profile
router.get('/users/me',auth,async(req,res)=>
{res.send(req.user)
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
router.patch('/users/me',auth,async(req,res)=>
{ 

    const updates=Object.keys(req.body)//keys in body in postman
const allowed=['name','age','password','Email']
const isvalidoperation=updates.every((update)=>
{
 return allowed.includes(update)
})
if(!isvalidoperation)
{
    return res.status(404).send('invalid updates')
} 
try{//dynamic way
       updates.forEach((update )=> {
      req.user[update]=req.body[update]
      //   const user=await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runvalidators:true})
  })
    await req.user.save()    
   
   res.send(req.user)
}
   catch(e)
   {
       res.status(500).send(e)
   }
   
})
/* router.delete('/users/:id',async(req,res)=>
{ ==========================if admin want to delete=================================
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
}) */
//===================if user want to delete his own profile
router.delete('/users/me',auth,async(req,res)=>
{
    try{
await req.user.remove()
//sendcancelEmail(req.user.Email,req.user.name)
res.send(req.user)

}
    catch(e)
    {
        res.status(500).send()   
        console.log(e)
    }
})
//====================upload image====================
const upload=multer(
    {
        limits:
        {
         fileSize:10000000000// after removing 4 zero it will 1 megabytes
        },
        // fileFilter allow to filter file type
        fileFilter(req,file,cb)
        {
//if(!file.originalname.endsWith('.pdf'))
if(!file.originalname.match(/\.(JPG|JPEG|png)$/))
//match contain regular exp $means end and ./ matches the extension ie string after dot
return cb(new Error('please upload a image'))
return cb(undefined,true)        
}
    }
)
router.post('/users/me/avatar',auth,upload.single('avatar'),async(req,res)=>
{
    const buffer=await sharp(req.file.buffer).resize({height:250,width:250}).png().toBuffer()   
       req.user.avatar=buffer
        await req.user.save()
        res.send()
},(error,req,res,next)=>
{
res.status(400).send({error:error.message})

})
//after deleting file or image should get delete

router.delete('/users/me/avatar',auth,async(req,res)=>
{
    try{
req.user.avatar=undefined
await req.user.save()
res.send()

}
    catch(e)
    {
        res.status(500).send()   
    }
})


router.get('/users/:id/avatar',async(req,res)=>
{
    try{
        const user=await User.findById(req.params.id)
        if(!user||!user.avatar)
        throw new Error() 
      //  res.set('Content-Type','image/jpg')
        res.send(user.avatar)
    }
    catch(e)
    {
        res.status(404).send()

    }
})


module.exports=router