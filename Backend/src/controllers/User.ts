import { Request, Response } from "express";
import zod from 'zod';
import { User } from "../models/User";
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../constants/env";
import { comparePassword, hashPassword } from "../util/bcrypt";
import Content from "../models/Content";
import Tag from "../models/Tag";
import Link from "../models/Link";

const signupSchema = zod.object({
    username: zod.string()
        .min(3, 'username must be atleast 3 characters')
        .max(10, 'username must not exceed 10 characters')
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[@$!%*?&]/, "Password must contain at least one special character (@$!%*?&)"),
    password: zod.string().min(8).max(20)
})

type SignupBody = zod.infer<typeof signupSchema>;

export const signup = async (req: Request, res: Response): Promise<any> => {
    const validReq = signupSchema.safeParse(req.body);
    if (!validReq.success) {
        return res.status(411).json({
            message: 'invalid request',
            error: validReq.error.format()
        })
    }
    try {
        const { username, password } = validReq.data;
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(403).json({
                message: 'user already exists'
            })
        }
        const encryptedPassword = hashPassword(password);
        const user = await User.create({
            username,
            password: encryptedPassword
        })
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
            audience: ['User'],
            expiresIn: '1h'
        });
        res.cookie('token', token, {
            path: '/',
            expires: new Date(Date.now() + 3600000),
            httpOnly: true
        })
        return res.status(201).json({
            message: 'user created succesfully!',
            user
        })
    } catch (error) {
        console.log('signup error' + error);
        return res.status(500).json({
            message: 'internal server error'
        })
    }
}


const loginSchema = signupSchema;
export const login = async (req: Request, res: Response): Promise<any> => {
    const validReq = loginSchema.safeParse(req.body);
    if (!validReq.success) {
        return res.status(411).json({
            message: 'invalid request',
            error: validReq.error.format()
        })
    }
    try {
        const { username, password } = validReq.data;

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(403).json({
                message: 'incorrect username or password'
            })
        }
        const passwordMatch = comparePassword(password, user.password);
        if (!passwordMatch) {
            return res.status(403).json({
                message: 'incorrect username or password'
            })
        }
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
            audience: ['User'],
            expiresIn: '1h'
        });
        res.cookie('token', token, {
            path: '/',
            expires: new Date(Date.now() + 3600000),
            httpOnly: true
        })
        return res.status(200).json({
            message: 'user logged in succesfully!',
            user
        })
    } catch (error) {
        console.log('signup error' + error);
        return res.status(500).json({
            message: 'internal server error'
        })
    }
}


const contentSchema = zod.object({
    type: zod.enum(["document", "tweet", "youtube", "link"]),
    link: zod.string().url(),
    title: zod.string().min(3).max(50),
    tags: zod.array(zod.string().toLowerCase().min(1).max(20)).max(5).min(1)
})
export const addContent = async (req: Request, res: Response): Promise<any> => {
    const validBody = contentSchema.safeParse(req.body);
    if (!validBody.success) {
        return res.status(403).json({
            message: 'invalid request body'
        })
    }
    try {
        const { type, link, title, tags } = validBody.data
        const tagIds: Array<any> = [];
        tags.forEach(async (tag) => {
            const tagDocument = await Tag.findOne({ title: tag })
            if (!tagDocument) {
                const newTag = await Tag.create({
                    title: tag
                });
                tagIds.push(newTag._id);
            } else {
                tagIds.push(tagDocument._id);
            }
        })
        await Link.create({
            hash: link,
            userId: req.user?._id
        })
        const content = await Content.create({
            type,
            link,
            title,
            tags: tagIds
        })

        return res.status(201).json({
            message: 'content added successfully!',
            content
        })

    } catch (error) {
        console.error('error in adding content:' + error);
        return res.status(500).json({
            message: 'internal server error'
        })
    }
}

export const getContent = async (req: Request, res: Response): Promise<any> => {
    try {
        const content = await Content.find({
            userId: req.user?._id
        })
            .populate('tags')
            .populate({
                path: 'userId',
                select: '-password'
            });
        return res.status(200).json({
            message: 'content fetched succefully',
            content
        })
    } catch (error) {
        console.error('error in fetching data' + error);
        return res.status(500).json({
            message: 'error in fetching data'
        })
    }
}

export const deleteContent = async (req: Request, res: Response): Promise<any> => {
    if (!req.body.contentId) {
        return res.status(403).json({
            message: 'invalid request'
        })
    }
    try {
        const id = req.body.contentId;
        const content = await Content.findById(id);
        if (!content) {
            return res.status(403).json({
                message: 'content not found'
            })
        }
        await Link.deleteOne({
            hash: content.link
        })
        await Content.deleteOne({ _id: id });
        return res.status(200).json({
            message: 'content deleted'
        })

    } catch (error) {
        console.error('error in deleting content:' + error);
        return res.status(500).json({
            message: 'internal server error'
        })
    }
}