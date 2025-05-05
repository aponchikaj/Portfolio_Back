const express=require('express')
const cors=require('cors')
const bparser=require('body-parser')
const mongoose=require('mongoose')
const nodemailer=require('nodemailer')
// const { createClient } = require('redis');
require('dotenv').config()
const messages = require('./models/message.model')
const businesses =require('./models/business.model')
const students = require('./models/students.model')

const app=express()
const port=process.env.PORT||3000
app.use(cors({origin:'http://localhost:4200',credentials:true}))
app.use(bparser.json())

//Nodemailer Config to send mails.
const Mail_Config = nodemailer.createTransport({
 service:'gmail',
 auth:{
  user:process.env.GMAIL_USER,
  pass:process.env.GMAIL_PASS
 }
})

app.post('/api/message',async(req,res)=>{
 const {email,message} = req.body

 if(!email||!message||!email.includes('@')){
  res.status(400).send({Message:'Enter valid Email',Success:false})
 }else{
    res.send({Success:true,Message:'Sent.'})
    //Message To DB
    const NewMessage = await messages({
    email:email,
    message:message
    })
    NewMessage.save()
    //Mail to Me
    await Mail_Config.sendMail({
    from:process.env.GMAIL_USER,
    to:process.env.GMAIL_USER,
    subject:'NEW MESSAGE FROM PORTFOLIO',
    text:`New Message From ${email} Message: ${message}`
    })
    //Mail to Client
    await Mail_Config.sendMail({
    from:process.env.GMAIL_USER,
    to:email,
    subject:'Message Was Sent',
    text:`Hey, Message was sent I'm going to respond as soon as I can. Thanks :)`
    })
    }
})

app.post('/api/newStudent',async(req,res)=>{
 const {name,lastname,email,course} = req.body

 if(!name||!lastname||!email||!course){
  res.status(400).send({Message:'Enter Valid Information.',Success:false})
 }else if(name&&lastname&&email&&course){
    //Getting id and checking id.
    let id = Math.floor(Math.random() * (9999-1000)+1000)
    const findUserWID = await students.findOne({ID:id})
    while(findUserWID){
    id = Math.floor(Math.random() * (9999-1000)+1000)
    }
    res.send({Success:true,Message:'Sent.'})
    //NEW STUDENT FOR DB.
    const NewStudent = await students({
    Name:name,
    Lastname:lastname,
    ID:id,
    Course:course,
    Email:email
    })
    NewStudent.save()
    //Mail to Student
    await Mail_Config.sendMail({
    from:process.env.GMAIL_USER,
    to:email,
    subject:`Welcome to Lazare's Community.`,
    text:`Hey ${name}, It's good to see new Student. I'm Lazare Your Teacher. We are going to learn how to write code. I'm going to respond as soon as I can :) NOTE: IF I WON'T RESPOND WITHIN 4-5 DAYS CALL ME ${process.env.PHONE_NUMBER}. Have a Great Day.`
    }).then()
    //Mail to Me
    await Mail_Config.sendMail({
    from:process.env.GMAIL_USER,
    to:process.env.GMAIL_USER,
    subject:'NEW STUDENT!!!',
    text:`Sup Lazare. u have a new student. INFO: MONGO: ${NewStudent}`
    }).then()
 }
})

app.post('/api/NewBusiness', async (req,res)=>{
 const {email,name,lastname,company,option,phone} = req.body

 if(!name||!lastname||!email||!company||!option||!phone){
  res.status(400).send({Message:'Enter Valid Information.',Success:false})
 }else if(name&&lastname&&email&&company&&option&&phone){
    //Getting and checking ID
    let id = Math.floor(Math.random() * (9999-1000)+1000)
    let FindBusiness = await businesses.findOne({ID:id})
    while(FindBusiness){
    id = Math.floor(Math.random() * (9999-1000)+1000)
    FindBusiness = await businesses.findOne({ID:id})
    }
    res.send({Success:true,Message:'Success.'})
    //New Business to DB
    const newBusiness =await businesses({
    Name:name,
    Lastname:lastname,
    Company:company,
    Option:option,
    Email:email,
    Phone:phone,
    ID:id
    })
    newBusiness.save() 
    //Sending email to Client
    await Mail_Config.sendMail({
    to:email,
    from:process.env.GMAIL_USER,
    subject:'Creating Website.',
    text:`Hello ${name}, It's Good To see new Customer. I'm going to respond within 3-4 days. NOTE IF I WON'T RESPOND WITHIN 3-4 DAYS CALL ME ${process.env.PHONE_NUMBER}. Thank you.`
    }).then()
    await Mail_Config.sendMail({
    to:process.env.GMAIL_USER,
    from:process.env.GMAIL_USER,
    subject:'New Customer',
    text:`New Customer : MONGO: ${newBusiness}`
    }).then()
    }
})

mongoose.connect(process.env.MONGO_STRING).then(()=>{
 app.listen(port,()=>console.log('Listening on port:',port))
}).catch((e)=>console.log(e))