import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        
        // Check if token is provided
        if (!token) {
            return res.status(401).json({ error: "Unauthorized - No token provided." });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if decoding failed
        if (!decoded) {
            return res.status(401).json({ error: "Unauthorized - Invalid Token" });
        }

        // Find the user by ID
        const user = await User.findById(decoded.userID).select("-password");

        // Check if user not found
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Attach user to the request object
        req.user = user;

        // Call the next middleware in the stack
        next();

    } catch (err) {
        console.error("Error in protectRoute middleware", err.message);

        // Differentiate between token verification errors and internal server errors
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: "Unauthorized - Invalid Token" });
        }

        res.status(500).json({ error: "Internal server error" });
    }
};

export default protectRoute;
