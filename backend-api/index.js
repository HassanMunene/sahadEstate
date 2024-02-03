import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/connect.js';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import errorMiddleware from './middleware/error.middleware.js';
import cookieParser from 'cookie-parser';

const app = express()
dotenv.config()
const port = process.env.PORT || 5000

app.get('/', (req, res) => {
    res.send('Hello mate');
})

app.use(express.json());
app.use('/api/auth', authRouter);

app.use(cookieParser());
app.use('/api/user', userRouter)

app.use(errorMiddleware);

try {
    // first connect application to the db
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is running on port ${port}`));
} catch (error) {
    console.log('There was an error connecting to MongoDB', error);  
}