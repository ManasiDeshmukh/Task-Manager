require('../src/db/mongoose.js')
const User=require('../src/models/user')
//5ebf5f592bc7250524a2a620
//mongoosejs.com
/* User.findByIdAndUpdate("5ebf5f592bc7250524a2a620",{
    age:19
}).then((user)=>
{
    console.log(user)
return User.countDocuments({age:1})
}).then((user1)=>
{
console.log(user1)
}).catch((e)=>
{
    console.log(e)
}) */
const update=async(id,age)=>
{
    const user= await User.findByIdAndUpdate(id,{age})
    const count= await User.countDocuments({age})
return user;
}
update("5ebf5f592bc7250524a2a620",20).then((result)=>
{
    console.log(result)
}).catch((e)=>
{
    console.log(e)
}) 