import mongoose, { mongo } from "mongoose";


async function connectDB() {
    try {

        await mongoose.connect(process.env.MONGO_URI);

        console.log('db was connected');

    } catch (error) {
        console.error(error);
    }
}

export default connectDB;