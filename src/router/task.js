const express=require('express')

const Task =require('../models/task')
const auth=require('../middleware/auth')
const router=express.Router()
router.post('/tasks',auth,(req,res)=>
{
    //const tasks=new Task(req.body)
    const tasks=new Task(
        {
            ...req.body ,//it load all data provide by user
            owner:req.user._id
        }
    )
    tasks.save().then((tasks)=>
    {
        res.status(201).send(tasks)

    }).catch((e)=>
    {res.status(400)
        console.log(e)
res.send(e)
    })
    
})
router.get('/tasks', auth, async (req, res) => {
    const match = {}
const sort={}
    if (req.query.completed) {
        match.completed = req.query.completed 
    }
if(req.query.Sortedby)
{
  const parts=req.query.Sortedby.split(':')
  sort[parts[0]]=parts[1]==='desc'?-1:1
}
    try {
        await req.user.populate({
            path: 'tasks',
            match:match,
            options:
            {
                limit:parseInt(req.query.limit),
                skip:parseInt(req.query.skip),
               sort
            }
        }).execPopulate()
        
        res.send(req.user.tasks)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/tasks/:id',auth,async(req,res)=>
{
    const _id=req.params.id
   
    try{
const tasks=await Task.findOne({_id,owner:req.user._id})
        //const tasks= await Task.findById(_id)
        if(!tasks)
        return res.status(404).send()
res.send(tasks)
    }
    catch(e)
    {
        res.status(500).send()   
    }
}) 

router.patch('/tasks/:id',auth,async(req,res)=>
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
    const task=await Task.findOne({_id:req.params.id,owner:req.user._id})
   // const task= await Task.findById(req.params.id)
      //  const task=await Task.findByIdAndUpdate(req.params.id,req.body,{new:true,runvalidators:true})
   if(!task)
   return res.status(404).send()
   updates.forEach((update )=> {
    task[update]=req.body[update]})
    await task.save()    

   res.send(task)
}
   catch(e)
   {
       res.status(500).send(e)
       console.log(e)
   }
   
})

router.delete('/tasks/:id',auth,async(req,res)=>
{
    try{
const data= await Task.findOneAndDelete({_id:req.params.id,owner:req.user._id}) 
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