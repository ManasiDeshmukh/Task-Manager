const mongoose=require('mongoose')
//const validator=require('validator')
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser:true,useCreateIndex:true
})
/*const User=mongoose.model('User',
{
    name:{
        type:String,
        required:true,
        trim:true,
        default:'anonymous'
    },
    age:{
        type:Number,
        validate(value)
        {
if(value<0)
throw new Error('age should be positive')
if(value<18)
throw new Error('age must br greater than 18')
        }
    } ,
    email:
    {
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        validate(value)
        {
            if(!validator.isEmail(value))
            throw new Error("invalid email")
        }
    },
    password:
    {
        type:String,
        trim:true,
        required:true,
        minlength:8,
        lowercase:true,
        validate(value)
        {
            if(value.includes('password'))
            throw new Error('password cant contain password string') 
        }
    }
})

const me=new User({
    name:'   manasiiii  ',
    age:19,
    email:'manasi@gmail.com',
    password:'password'
})
me.save().then((me)=>
{
    console.log(me)
}
).catch((error)=>
{
if(error)
return console.log(error)
})
 
 const Task=mongoose.model('Task',
{
    Description:{
        type:String,
        trim:true,
        required:true
    },
    completed:{
        type:Boolean,
        default:false
    } 
})

const me=new Task({
    Description:'learn React nATIVE',
   // completed:true
})
me.save().then((me)=>
{
    console.log(me)
}
).catch((error)=>
{
if(error)
return console.log(error)
}) 
module.exports=User*/