const moongoose = require('mongoose')

const UserSchema = new moongoose.Schema({
    "name" : {type:String},
    "email" :{type:String,unique:true,required:true},
    "password" :{type:String,required:true},
    "role" : {type:String, enum:['user','admin'],default:'user'}
},{timestamps:true})


module.exports = moongoose.model("User",UserSchema)