import mongoose from "mongoose";

let isConnected = false;

const connectDb = async () => {
    if (isConnected) {
        console.log("Using existing database connection");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Database connected successfully");
        isConnected = true;
    } catch (error) {
        console.log("Error while connecting with the database", error);
    }
}

export default connectDb;
