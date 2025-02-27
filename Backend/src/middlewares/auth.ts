import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../constants/env";
import { User } from "../models/User";
import { Types } from "mongoose";

// Extend Request type to include `user`
interface UserType{
    _id:Types.ObjectId,
    username:string,
}
declare module "express-serve-static-core" {
    interface Request {
        user?: UserType;
    }
}

export const auth = async (req: Request, res: Response, next: NextFunction):Promise<any> => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({
            message: 'token not found'
        })
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as {userId:string} ;
        const user = await User.findById(decoded.userId).select('-password');
        if(!user){
            return res.status(400).json({
                message:'user not found'
            })
        }
        req.user = {
            _id:user._id as Types.ObjectId,
            username:user.username
        };
        next();
    } catch (error) {
        console.log('error in auth' + error);
        return res.status(403).json({
            message: 'invalid or expired token'
        })
    }
}