const express=require('express')
const router=express.Router()
const Task =require('../models/task')

router.post('/tasks',(req,res)=>
{
    const tasks=new Task(req.body)
    tasks.save().then((tasks)=>
    {
        res.status(201).send(tasks)

    }).catch((e)=>
    {res.status(400)
        console.log(e)
res.send(e)
    })
    
})
router.get('/tasks',async(req,res)=>
{
   /*  Task.find({}).then((tasks)=>
    {
        res.status(400).send(tasks)
    }).catch((e)=>
    {
        res.status(500).send(e)
    })
     */

try{
    const tasks=await Task.find({})
    res.status(400).send(tasks)
}
catch(e)
{
    res.status(500).send(e)  
}

})
router.get('/tasks/:id',async(req,res)=>
{
    const _id=req.params.id
   /*  Task.findById(_id).then((tasks)=>
    {
        if(!tasks)
        return res.status(404).send()
res.send(tasks)
    }).catch((e)=>
    {
res.status(500).send()
    }) */
    try{
        const tasks= await Task.findById(_id)
        if(!tasks)
        return res.status(404).send()
res.send(tasks)
    }
    catch(e)
    {
        res.status(500).send()   
    }
})

router.patch('/tasks/:id',async(req,res)=>
{  const updates=Object.keys(req.body)//keys in body in postman
const allowed=['Description','completed']
const isvalidoperation=updates.every((update)=>
{
return allowed.includes(update)
})
if(!isvalidoperation)
{
    return res.status(404).send('invalid updates')
}

try{
    const task= await Task.findById(req.params.id)
    updates.forEach((update )=> {
        user[update]=req.body[update]})
        await user.save()    
      //  const task=await Task.findByIdAndUpdate(req.params.id,req.body,{new:true,runvalidators:true})
   if(!task)
   return res.status(404).send()
   res.send(task)
}
   catch(e)
   {
       res.status(500).send()
   }
   
})

router.delete('/tasks/:id',async(req,res)=>
{
    try{
const data= await Task.findByIdAndDelete(req.params.id) 
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