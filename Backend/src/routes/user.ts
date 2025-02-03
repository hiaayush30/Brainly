import { Router } from "express";
import { addContent, deleteContent, getContent, getSharedContent, login, myInfo, share, signup} from "../controllers/User";
import { auth } from "../middlewares/auth";
const userRouter=Router();

userRouter.get('/me',auth,myInfo)
userRouter.post('/signup',signup);
userRouter.post('/login',login);
userRouter.post('/content',auth,addContent);
userRouter.get('/content',auth,getContent);
userRouter.delete('/content',auth,deleteContent);
userRouter.post('/brain/share',auth,share);
userRouter.get('/brain/:shareLink',getSharedContent);

export default userRouter;