import express from "express";
import { getSinglegetExerciseUnit, getExerciseUnit, createExerciseUnit, deleteExerciseUnit, updateExerciseUnit } from "../controllers/exerciseunit.controller.js";

const router = express.Router();

router.get("/:id", getSinglegetExerciseUnit);
router.get("/", getExerciseUnit);
router.post("/", createExerciseUnit);
router.delete("/:id",deleteExerciseUnit);
router.put("/:id", updateExerciseUnit);

export default router;