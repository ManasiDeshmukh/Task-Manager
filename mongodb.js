/* const mongodb=require('mongodb')
const MongoClient=mongodb.MongoClient
const ObjectID=mongodb.ObjectID */
//will give access to functions which are required to perform CRUD operations on database
const{MongoClient,ObjectID}=require('mongodb')//destructuring
const connectionUrl='mongodb://127.0.0.1:27017'
const databasename='task-manager'
const id=new ObjectID()//constructor
console.log(id)
console.log(id.getTimestamp())
//connecting database is a asynchronous task
MongoClient.connect(connectionUrl,{useNewUrlParser:true,useUnifiedTopology: true },(error,client)=>
{
if(error)
return console.log('unable to connect to databse')
console.log('connected correctly')
const db=client.db(databasename)

// ===========deleteone=========
//db.collection('users').deleteOne({
//     age:20
// }).then((results)=>
// {
// console.log(results)
// }).catch((error)=>
// {
// console.log(error)
// })

db.collection('users').deleteMany({
    age:20
}).then((results)=>
{
    console.log(results)
}).catch((error)=>
{
    console.log(error)
})
/* ==================update one=================
db.collection('users').updateOne({_id:new ObjectID('5ebe17a38c18241c3c61ea5c')},
{ 
    $set:{
    name:'andrew'
} 
$inc:
{
    age:1//incerement age by 1
}can use eithr $set or $inc
}
).then((result)=>
{
console.log(result)
}).catch((error)=>
{
if(error)
return console.log(error)
})
 */
/* ==========update many===========================
db.collection('tasks').updateMany({status:"incomplete"},
{ 
    $set:{
    status:"completed"
} 

}
).then((result)=>
{
console.log(result.modifiedCount)
}).catch((error)=>
{
if(error)
return console.log(error)
})
 */


/* =========fetch data===========
db.collection('tasks').findOne({_id:new ObjectID('5ebe1f0b17ae1514780dbb45')},(error,task)=>
{
    if(error)
    return console.log(error)
    console.log(task)
})


db.collection('tasks').find({status:'completed'}).toArray((error,task)=>
{
    if(error)
    return console.log("error in fetching")
    console.log(task)

}) */
// db.collection('users').find({age:19}).count((error,count)=>
// {
//     if(error)
//     return console.log("error in fetching")
//     console.log(count)

// })

//collection means table ,users is tablename
/*============insert data=====================
db.collection('users').insertOne({
    _id:id,
    name:'ani',
    age:20
},(error,results)=>
{
if(error)
return console.log("error in inserting")
console.log(results.ops )
//ops is used to get data from databse
})
 */
/* 
db.collection('users').insertMany(
    [{
    name:'sanyu',
    age:20
}
    ,{
name:'himani',
age:20
    }],(error,results)=>
    {
        if(error)
        return console.log('error in inserting')
        console.log(results.ops)
    }
) */
/* db.collection('tasks').insertMany(
    [
        {
            desc:"weather-app",
            status:'completed'
        },
        {
            desc:"note-app",
            status:"incomplete"
        }
    ],(error,results)=>
    {
        if(error)
        return console.log("error")
        console.log(results.ops)
    }
) */


})