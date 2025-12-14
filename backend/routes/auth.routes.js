import { Router } from "express";
import { singIn, signOut, singUp } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post('/sign-up', singUp);
authRouter.post('/sign-in', singIn);
authRouter.post('/sign-out', signOut);

export default authRouter;