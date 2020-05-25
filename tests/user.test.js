/*  const request=require('supertest')
const app=require('../src/app')
const jwt=require('jsonwebtoken')
const mongoose=require('mongoose')
const User=require('../src/models/user')
const Useroneid=new mongoose.Types.ObjectId()
const Userone=
{
    _id:Useroneid,
    name:"cjdendp",
    Email:"hihfiej@gmail.com",
    password:'fuhfndnjc',
    tokens:[
        {
             token:jwt.sign({_id:Useroneid.toString()},process.env.SECRET-TOKEN)
        }
    ]
}
beforeEach(async()=>{
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
test('should login ex user',async()=>
{
    await request(app).post('/users/login').send(
        {
            Email:Userone.Email,
            password:Userone.password  
        } ).expect(200)
})
test('should not login non existent user',async()=>
{
    await request(app).post('/users/login').send
(
    {
Email:Userone.Email,
password:'bcouenc'
    }
).expect(400)})

test('should get profile for user',async()=>
{
    await request(app)
    .get('/users/me')
    .set('Authorization',`Bearer ${Userone.tokens[0].token}`)
  .send()
    .expect(200)
})
test('should not get for unauthorised user',async()=>
{
await request(app)
.get('/users/me')
.send().expect(401)
})
test('should delete account of user',async()=>
{
    await request(app).delete('/users/me')
    .set('Authorization',`Bearer ${Userone.tokens[0].token}`)
    .send()
    .expect(200)
})
test('should nor delete for unauthorised user',async()=>
{
    await request(app)
    .delete('/users/me')
    .send()
    .expect(401)
    
}) */
const request = require('supertest')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const app = require('../src/app')
const User = require('../src/models/user')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'Mike',
    Email: 'mike@example.com',
    password: '56what!!',
    tokens: [{
        token: jwt.sign({_id: userOneId},process.env.SECRET-TOKEN)
    }]
}

beforeEach(async () => {
    await User.deleteMany()
    await new User(userOne).save()
})

test('Should signup a new user', async () => {
    const response = await request(app).post('/users').send({
        name: 'Andrew',
        Email: 'andrew@example.com',
        password: 'MyPass777!'
    }).expect(200)

    // Assert that the database was changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    // Assertions about the response
    expect(response.body).toMatchObject({
        user: {
            name: 'Andrew',
            Email: 'andrew@example.com'
        },
        token: user.tokens[0].token
    })
    expect(user.password).not.toBe('MyPass777!')
})

test('Should login existing user', async () => {
    const response = await request(app).post('/users/login').send({
        Email: userOne.email,
        password: userOne.password
    }).expect(200)
    const user = await User.findById(userOneId)
    expect(response.body.token).toBe(user.tokens[1].token)
})

test('Should not login nonexistent user', async () => {
    await request(app).post('/users/login').send({
        Email: userOne.email,
        password: 'thisisnotmypass'
    }).expect(400)
})

test('Should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not get profile for unauthenticated user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('Should delete account for user', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

test('Should not delete account for unauthenticate user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})
