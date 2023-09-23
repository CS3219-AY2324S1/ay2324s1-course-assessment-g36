import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const URI = process.env.MONGODB_URI;

const connectMongoDB = () => {
    try {
        mongoose.connect(URI)
        console.log("connected to mongodb")
    } catch (err) {
        console.log(err);
    }
};

export default connectMongoDB;