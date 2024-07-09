const jwt= require('jsonwebtoken');
const privateKey = require('./private_key');
import { Express, Request, Response, NextFunction } from "express";

module.exports = (req: Request, res: Response, next: NextFunction) => {
    const authorizationHeader = req.headers.authorization;
    
    if(!authorizationHeader) {
        const message = `You didn't furnished the Authentication Token. Add one in the request.`
        return res.status(401).json({message});
    }

    const token = authorizationHeader.split(' ')[1]
    try {
        const decodedToken = jwt.verify(token, privateKey); 
        const userId = decodedToken.userId;

        if (req.body.userId && req.body.userId !== userId) {
            const message = 'The identifier of the user is invalid';
            return res.status(401).json({ message });
        } else {
            next(); // Let's dive to the next Middleware !
        }
    } catch (error) {
        const message = 'The user is not authorized to access this page.';
        return res.status(401).json({ message });
    }
}