 const request=require('supertest')
const app=require('../src/app')
const User=require('../src/models/user')
const Userone=
{
    name:"cjdendp",
    Email:"hihfiej@gmail.com",
    password:'fuhfndnjc'
}
beforeEach(async()=>
{
await User.deleteMany()
await new User(Userone).save()
})

test('should signup user',async()=>
{
await request(app).post('/users').send(
        {
            name:'andrew',
            Email:'deshmukhmanasi9@gmail.com',
            password:'manasi123'
         }
         ).expect(200)
})
// heroku config:set  MONGODBURL="mongodb+srv://taskapp:rc6zChUnXR0augis@cluster0-rjdun.mongodb.net/task-manager-app?retryWrites=true&w=majority"
