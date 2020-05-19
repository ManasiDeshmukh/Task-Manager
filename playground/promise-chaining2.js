
require('../src/db/mongoose.js')
const Taskr=require('../src/models/task')
/* Taskr.findByIdAndRemove("5ec017f8174e3b0f5c6bffb2").then((task)=>
{
    console.log(task)
    return Taskr.countDocuments({completed:false})
}).then((t2)=>
{
    console.log(t2)
}).catch((e)=>
{
    console.log(e)
}) */
const deletedata = async(id) =>
{const data= await Taskr.findOneAndRemove(id)
    const count= await Taskr.countDocuments({completed:true})
    return count
}
deletedata("5ec02e525f40b913e8dd32fc").then((t2)=>
{
    console.log(t2)
}).catch((e)=>
{
    console.log(e)
}) 
