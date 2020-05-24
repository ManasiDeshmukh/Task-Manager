const nodemailer=require('nodemailer')
const transporter=nodemailer.createTransport({
    service:'gmail',
    auth:
    {
        user:'deshmukhmanasi9@gmail.com',
        pass:'Manasi123Manasi123'
    }

})
const sendWelcomeEmail=(Email,name)=>
{
    var mailOptions=
    {
        from:'deshmukhmanasi9@gmail.com',
        to:Email,
        subject:'nodejs',
        text:`heloo ,welcome to nodejs ,${name},`
    }

    transporter.sendMail(mailOptions,function(err,info)
    {
        if(err)
        console.log(err)
        console.log('mail sent'+info.response)
    })}
    const sendcancelEmail=(Email,name)=>
{
    var mailOptions=
    {
        from:'deshmukhmanasi9@gmail.com',
        to:Email,
        subject:'deleting account',
        text:`Heyyy ,${name},is their any reason behind deleting account .see u soon`
    }

    transporter.sendMail(mailOptions,function(err,info)
    {
        if(err)
        console.log(err)
        console.log('mail sent'+info.response)
    })}

module.exports={
    sendWelcomeEmail,
    sendcancelEmail
}