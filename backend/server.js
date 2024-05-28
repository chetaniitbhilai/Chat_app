import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";

import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import userRoutes from "./routes/userRoutes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app , server } from "./socket/socket.js";


dotenv.config(); // Load environment variables from .env file


const PORT = process.env.PORT || 5000; // Use port from env file, else default to 5000

const __dirname=path.resolve()

// Setting up middleware
app.use(express.json()); // Parse incoming requests with JSON payloads
app.use(cookieParser()); // Access cookies

// Setting up routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname,"/frontend/dist")))

app.get("*", (req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","dist","index.html"))
})

// Start the server and connect to MongoDB
server.listen(PORT, () => {
    connectToMongoDB(); // Connect to the MongoDB database
    console.log(`Listening on port ${PORT}`); // Log the port number
});
