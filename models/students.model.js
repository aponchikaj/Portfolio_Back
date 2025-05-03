const mongoose=require('mongoose')

const StudentSchema = new mongoose.Schema({
 Name:{
  type:String,
  required:true
 },
 Lastname:{
  type:String,
  required:true
 },
 Email:{
  type:String,
  required:true
 },
 Course:{
  type:String,
  required:true
 },
 ID:{
  type:Number,
  required:true
 },
})

const students = mongoose.model('students',StudentSchema)

module.exports = students;