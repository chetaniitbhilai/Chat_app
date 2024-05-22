import express from 'express';
import { sendMessage,getMessages } from '../controller/message.controller.js';
import  protectRoute  from '../middleware/protectRoute.js'

const router = express.Router();

router.get("/:id",protectRoute,getMessages);
router.post("/send/:id", protectRoute,  sendMessage); // to check user is logged in or not 

export default router;