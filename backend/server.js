import bodypartRoutes from "./routes/bodypart.route.js"
import { connectDB } from './config/db.js';
import dailyRoutes from "./routes/daily.route.js"
import dotenv from "dotenv";
import exerciseRoutes from "./routes/exercise.route.js"
import exerciseSetRoutes from "./routes/exerciseset.route.js"
import express from 'express';
import path from "path";
import statisticsRoutes from './routes/statistics.route.js'

dotenv.config();

const app = express();
const __dirname = path.resolve();

app.use(express.json());

app.use("/api/bodyparts", bodypartRoutes);

app.use("/api/exercises", exerciseRoutes);

app.use("/api/exerciseset", exerciseSetRoutes);

app.use("/api/daily", dailyRoutes);

app.use("/api/statistics",statisticsRoutes)

if (process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (req, res)=>{
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    })
}

app.listen(5000, ()=>{
    connectDB();
    console.log("Server started at http://localhost:5000")
})

//