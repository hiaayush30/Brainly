import { Router } from "express";
import { addContent, deleteContent, getContent, login, signup} from "../controllers/User";
import { auth } from "../middlewares/auth";
const userRouter=Router();

userRouter.post('/signup',signup);
userRouter.post('/login',login);
userRouter.post('/content',auth,addContent);
userRouter.get('/content',auth,getContent);
userRouter.delete('/content',auth,deleteContent);

export default userRouter;