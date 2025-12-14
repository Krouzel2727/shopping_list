import { Router } from "express";

import {createSubscription,getSubscription} from "../controllers/subs.controller.js";
import authorize from "../middleware/auth.middleware.js";

const subsRouter = Router();

subsRouter.get('/',(req,res)=> res.send({title:'Get all Subscriptions'}));

subsRouter.get('/:id',authorize,getSubscription);

subsRouter.post('/',authorize,createSubscription);

subsRouter.put('/:id',(req,res)=> res.send({title:'Update Subscription by ID'}));

subsRouter.delete('/:id',(req,res)=> res.send({title:'Delete Subscription by ID'}));

subsRouter.get('/user/:id',(req,res)=> res.send({title:'Get all Subscription belonging to userID'}));

subsRouter.delete('/cancel/:id',(req,res)=> res.send({title:'Cancel Subscriptionby ID'}));

subsRouter.get('/upcoming-renewals',(req,res)=> res.send({title:'Get all Upcoming renewals'}));

export default subsRouter;