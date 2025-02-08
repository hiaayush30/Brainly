import { Request, Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const askGPT = async (req: Request, res: Response): Promise<any> => {
    try {
        const { text } = req.body;
        if (!text) return res.status(400).json({ message: 'invalid request' });
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GPT_KEY}`
        const context = "you are a chatbot for an application known as Brainly which is where you can save links for videos,webpages etc which you can later refer to.There are option sofr adding post,adding collection etc.You can also create folders(collections) to organize these links.Keeping this in mind answer the following in around 10 words"
        //@ts-ignore
        const genAI = new GoogleGenerativeAI(process.env.GPT_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = context + text;
        const result = await model.generateContent(prompt);
        const answer = result?.response?.text();
        if (answer) {
            return res.status(200).json({
                message: 'request succesfull!',
                data: answer
            })
        } else {
            return res.status(400).json({
                message: 'request failed!'
            })
        }

    } catch (error) {
        console.log('error in chatbot' + error);
        return res.status(500).json({
            message: 'internal server error'
        })
    }
}