import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req,res) => {
    console.log("Message sent",req.params.id);
    try {
        const { message} = req.body;
        const {id: receiverId } = req.params;
        const senderId=req.user._id;

        let conversation = await Conversation.findOne({
            participants: {$all : [senderId,receiverId] }
        });

        if(!conversation){
            conversation= await Conversation.create({
                participants: [senderId,receiverId],
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        })

        if(newMessage){
            conversation.messages.push(newMessage._id); // pushing the message in this particiapnts conversationa array.
        }

        //SOCKET IO FUNCTIONALITY 

        await Promise.all([conversation.save(),newMessage.save()]); // make the process run in parallel
        // await conversation.save();
        // await newMessage.save();

        res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error in sendMessage controller: ",error.message);
        res.status(500).json({error:"Internal server error"});
    }
}

export const getMessages = async (req,res) =>{
    try {
        const {id:userToChatId} = req.params; //getting the user id 
        const senderId=req.user._id;
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId,userToChatId]},
        }).populate("messages"); //instead of returning the array of messages it will return us objects that will be the messages itself

        if(!conversation) return res.status(200).json([]);
        const messages=conversation.messages;
        res.status(200).json(messages);

    } catch (error) {
        console.log("error in get messages controller",error.message);
        res.status(500).json({error:"Internal server error"});
    }
}