import express from 'express';
import dotenv from 'dotenv';
import mongoose from "mongoose";

const app = express()
dotenv.config()
const port = process.env.PORT || 5000

/*
========================
database connections
========================
*/
const connectDB = async (uri) => {
    console.log('connecting to the database...')
    return mongoose.connect(uri);
}

try {
    // first connect application to the db
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is running on port ${port}`));
} catch (error) {
    console.log(error);   
}