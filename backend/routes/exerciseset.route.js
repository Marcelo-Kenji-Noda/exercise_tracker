import express from "express";
import { getSingleExerciseSet, getExerciseSet, createExerciseSet, deleteExerciseSet, updateExerciseSet } from "../controllers/exerciseset.controller.js";

const router = express.Router();

router.get("/:id", getSingleExerciseSet)
router.get("/", getExerciseSet)
router.post("/", createExerciseSet);
router.delete("/:id",deleteExerciseSet);
router.put("/:id", updateExerciseSet);

export default router;