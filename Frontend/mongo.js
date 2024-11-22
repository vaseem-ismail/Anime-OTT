import express from "express"
import mongoose from "mongoose"
// import dotenv from "dotenv";

const app = express();
// dotenv.config();

const PORT = 3500;
//const MONGOURL = process.env.MONGO_URL;
const MONGOURL = "mongodb://localhost:27017/test"

mongoose.connect(MONGOURL).then(()=>{
    console.log("Database is connected successfully")
    app.listen(PORT, ()=>{
        console.log(`Server is running on port ${PORT}`)
    });
}).catch((error) => console.log(error));

const userSchema = new mongoose.Schema({
    _id:Number,
    Base64:String
})

const UserModel = mongoose.model("fs.chunks",userSchema)
app.get("/getUsers",async(req,res)=>{
    const userData = await UserModel.find();
    res.json(userData);
})