import express from 'express';
import dotenv from "dotenv";
import { connectDB } from './config/db.js';
import bodypartRoutes from "./routes/bodypart.route.js"
import exerciseRoutes from "./routes/exercise.route.js"

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/bodyparts", bodypartRoutes);

app.use("/api/exercises", exerciseRoutes);

app.listen(5000, ()=>{
    connectDB();
    console.log("Server started at http://localhost:5000")
})

//