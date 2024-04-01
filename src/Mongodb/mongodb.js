import mongoose from "mongoose";

const DbConnection = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Error while connecting with the database", error);
    }
}
export default DbConnection;
