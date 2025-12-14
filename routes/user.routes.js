import { Router } from "express";
import { getUsers,getUser } from "../controllers/user.controller.js";
import authorize from "../middleware/auth.middleware.js";

const userRouter = Router();

userRouter.get('/',authorize,getUsers);

userRouter.get('/:id',authorize,getUser);

userRouter.post('/',(req,res)=>res.send({title:'Create new User'}));

userRouter.put('/:id',(req,res)=>res.send({title:'Update User by ID'}));

userRouter.delete('/:id',(req,res)=>res.send({title:'Delete User by ID'}));

export default userRouter;
