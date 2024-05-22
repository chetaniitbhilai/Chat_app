import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import userRoutes from "./routes/userRoutes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";

dotenv.config(); // Load environment variables from .env file

const app = express(); // Create an Express server
const PORT = process.env.PORT || 5000; // Use port from env file, else default to 5000

// Setting up middleware
app.use(express.json()); // Parse incoming requests with JSON payloads
app.use(cookieParser()); // Access cookies

// Setting up routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// Start the server and connect to MongoDB
app.listen(PORT, () => {
    connectToMongoDB(); // Connect to the MongoDB database
    console.log(`Listening on port ${PORT}`); // Log the port number
});
