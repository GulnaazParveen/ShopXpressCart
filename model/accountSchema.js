import mongoose, { mongo } from 'mongoose';
 const createAccountSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
    },
    email:{
        type:String,
        trim: true,
        unique: true,
        required: 'Please fill a valid email address',
    },
    password:{
        type:String,
        required:true,
    },
    Confirmpassword:{
        type:String,
        required:true,
    }
 })
//  create collection
 const usercollection = mongoose.model("userAccount",createAccountSchema)
 export default usercollection