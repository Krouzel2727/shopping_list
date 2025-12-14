import express from 'express';
import cors from 'cors';
import { PORT } from './config/env.js';

import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import connectToDatabase from './database/mongodb.js';
import errorMiddleware from './middleware/error.middleware.js';
import cookieParser from 'cookie-parser';
//import arcjetMiddleware from './middleware/arcjet.middleware.js';
import shoppingListRouter from './routes/shoppingList.route.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(cors());// pro deployment nutno specifikovat

// Zatím nefunkční  app.use(arcjetMiddleware); 

app.use('/api/v1/auth',authRouter);
app.use('/api/v1/users',userRouter);
app.use('/api/v1/shopping-lists', shoppingListRouter);

app.use(errorMiddleware);

app.listen(PORT , async ()=>{
    console.log(`Shopping list app is running on: http://localhost:${PORT}`);
    await connectToDatabase();
});

export default app;