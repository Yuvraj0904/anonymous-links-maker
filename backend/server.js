import express from 'express'
import dotenv from "dotenv";
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js'
dotenv.config();
const app=express();
app.use(express.json());
connectDB();
app.get("/",(req , res)=>{
    res.send("hello from backend")
})

app.use("/api/auth",authRoutes)
app.listen(3000,()=>{
    console.log("server running on port 3000");
})

