const mongoose=require('mongoose')

const messageSchema = new mongoose.Schema({
 email:{
  type:String,
  required:true
 },
 message:{
  type:String,
  required:true
 }
})

const messages = mongoose.model('messages',messageSchema)

module.exports = messages