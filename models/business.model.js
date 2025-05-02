const mongoose=require('mongoose')

const BusinessesSchema = new mongoose.Schema({
 Name:{
  type:String,
  required:true
 },
 Lastname:{
  required:true,
  type:String
 },Company:{
  type:String,
  required:true
 },
 Option:{
  required:true,
  type:String
 },ID:{
  type:String,
  required:true
 },
 Email:{
  required:true,
  type:String
 },Phone:{
  type:String,
  required:true
 },
})

const businesses=mongoose.model('business',BusinessesSchema)

module.exports = businesses