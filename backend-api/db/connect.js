import mongoose from "mongoose";

const connectDB = async (uri) => {
    console.log('connecting to the database...')
    return mongoose.connect(uri);
}
export default connectDB;
