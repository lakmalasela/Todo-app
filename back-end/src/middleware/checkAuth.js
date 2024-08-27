// const jwt = require('jsonwebtoken');
// const User = require('../model/user');

// module.exports = async(req,res, next)=>{
//     try{
//         const token = req.headers.authorization.split(' ')[1];//space eken Bearer kiyna eka seperate kra gnnwa ' ' white space eken wen kra gnne 0,1 kiyla
//         const decoded = jwt.verify(token,"Super_secret");//ape token ekai secrete key ekai compaire krla verify kra gnnwa 
//         req.user = decoded;

//         User.findOneAndReplace({_id:decoded.isu},{lastseen: new Date()});
//         next(); //next kiynne ape api ekata ynna kiyla
//         const {userId} = req.user; //user kawda kiyla attched krnwa
//     }catch(error){
//         const details = JSON.parse(JSON.stringify(error));
//         if(details.message){
//             return res.status(401).json(details.message);
//         }
//         return res.sendStatus(401);
//     }
// }

// src/middleware/authenticateToken.js

const jwt = require('jsonwebtoken');
const User = require('../model/user');

module.exports = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) return res.sendStatus(401); // No token provided

        const token = authHeader.split(' ')[1]; // Extract token from "Bearer [token]"
        if (!token) return res.sendStatus(401); // Token is missing

        // Verify token and decode it
        const decoded = jwt.verify(token, 'Super_secret');
        
        // Attach decoded user info to the request object
        req.user = decoded;

        // Update the last seen timestamp of the user
        await User.findOneAndUpdate(
            { _id: decoded.userId }, // Find user by ID (assuming decoded has userId)
            { lastseen: new Date() }, // Update lastseen field
            { new: true }             // Return the updated document
        );

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.log("Authentication Error:", error);

        // Handle specific JWT errors
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
        }

        // Generic error response
        return res.sendStatus(401);
    }
};
