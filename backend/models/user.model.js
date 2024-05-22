import mongoose from "mongoose";
import { type } from "os";

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    username:{
        type: String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        minlength:6,
    },
    gender:{
        type:String,
        required:true,
        enum:["male","female"]
    },
    profilePic:{
        type:String,
        default:""
    },
},{timestamps:true});
// above is schema
const User = mongoose.model("User",userSchema) // now creating the model 

export default User;