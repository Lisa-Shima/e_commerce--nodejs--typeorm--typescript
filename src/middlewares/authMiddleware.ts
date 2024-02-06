import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"

import { User } from '../entities/User'; // Import your User type

declare global {
    namespace Express {
        interface Request {
            user?: User; // Define the user property as optional
        }
    }
}


export const authMiddleware = async (req:Request, res:Response, next: NextFunction) => {
    try{
        const authHeader = req.headers.authorization
        if(!authHeader){
            return res.status(401).json({ message: "Auth header missing"})
        }

        const token = authHeader.split(' ')[1]

        await jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if(err){
                return res.status(403).json({ message: "Invalid token"})
            }
            req.user = decoded
            next()
        })
    }catch(err){
        console.error("Error in authentication: ", err);
        res.status(401).json({ error: "Could not perform authentication", err})
        
    }
}