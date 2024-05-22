import express from "express"
import { login, logout, signup } from "../controller/authController.js"; //.js is important here

const router = express.Router();

//rather than using complete code of apis here we can make their differenet files known as controllers
router.post("/signup",signup);
router.post("/login",login);
router.post("/logout",logout);

export default router;