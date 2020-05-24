const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const task=require('./task')

const userSchema=new mongoose.Schema(
    {name:{
        type:String,
        required:true,
        trim:true,
        default:'anonymous'
    },
    age:{
        type:Number,
        required:false,
        validate(value)
        {
if(value<0)
throw new Error('age should be positive')
if(value<18)
throw new Error('age must br greater than 18')
        }
    } ,
    Email:
    {
        type:String,
        required:true,
        trim:true,
        unique:true,
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
      //  lowercase:true,
        validate(value)
        {
            if(value.includes('password'))
            throw new Error('password cant contain password string') 
        }
    },
    
    avatar:
    {
        type:Buffer
    },
    tokens:[
        {
            token:
            {
                type:String,
                required:true
            }
        }
    ]
},
{
    timestamps:true
})
//=========not going to store in  databse only state the rel bet user and task
userSchema.virtual('tasks',{
    ref:'Task',
    localField:'_id',
    foreignField:'owner'
})
userSchema.methods.toJSON= function()
{//toJSON this hiding od data apply to all routers
    const user=this
    const userobj=user.toObject()
    delete userobj.password
    delete userobj.tokens
    delete userobj.avatar
    return userobj

}
userSchema.methods.generateAuthToken=async function()
{
//methods are accesible on specific instance methods
const user=this
const token=jwt.sign({_id:user._id.toString()},'process.env.SECRET-TOKEN')
user.tokens=user.tokens.concat({token:token})
await user.save()

return token
}
//==============login==============================
userSchema.statics.findByCredentials=async(Email,password)=>
{//Statics is useful for defining that the method is a model method not instance method
const user=await User.findOne({Email})
 if(!user)
 throw new Error('Unable to login')
 //const password1= await bcrypt.hash(password, 8)
 const isMatch= await bcrypt.compare(password,user.password)
 //console.log(isMatch)
 if(!isMatch)
  throw  new Error('unalble to login!')
return user
}

//hash plain text password before saving
userSchema.pre('save', async function(next)
{
    //2nd args function should be normal func not arrow funtion because arrow func does not bind 'this'
const user=this

if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
}

//next:next tells above code get done ready to save 
//if not provide next then it will hang over forever thinking that something is runnuing inside
next()
}) 

userSchema.pre('remove',async function(next)
{
await task.deleteMany({owner:this._id})
next()
})
const User=mongoose.model('User',userSchema)
module.exports=User