import express from 'express'
import dotenv from "dotenv";
import connectDB from './config/db.js';
dotenv.config();
const app=express();
connectDB();
app.get("/",(req , res)=>{
    res.send("hello from backend")
})

app.listen(3000,()=>{
    console.log("server running on port 3000");
})

