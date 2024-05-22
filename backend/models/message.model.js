import mongoose from "mongoose";
import { type } from "os";

const messageSchema = new mongoose.Schema({
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    receiverId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    message:{
        type:String, 
        required:true,
    }
},{timestamps:true}) ; // will save created at and updated at 

const Message = mongoose.model("Message",messageSchema);

export default Message;