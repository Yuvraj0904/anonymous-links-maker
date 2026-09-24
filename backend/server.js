import express from 'express'
import cors from "cors";
import dotenv from "dotenv";
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js'
import cookieParser from "cookie-parser";
import feedbackRouter from "./routes/feedbackRoutes.js";
dotenv.config();
const app=express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
connectDB();
app.get("/",(req , res)=>{
    res.send("hello from backend")
})

app.use("/api/auth",authRoutes)
app.use("/api/feedback", feedbackRouter);
app.listen(3000,()=>{
    console.log("server running on port 3000");
})

