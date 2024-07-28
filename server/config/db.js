import mongoose from "mongoose";

const connectDB=()=>{
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>console.log("MongoDB Connected..."))
    .catch(err=>console.error(err));
}

export default connectDB;
