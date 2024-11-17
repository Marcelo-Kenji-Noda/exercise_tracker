import express from "express";
import { getMaxExercise, getMeanExercise} from "../controllers/statistics.controller.js";

const router = express.Router();

router.get("/maxexercise/:id", getMaxExercise);
router.get("/meanexercise/:id", getMeanExercise);

export default router;