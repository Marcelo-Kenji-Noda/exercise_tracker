import { addValueToDailyRep, createDaily, createDailyFromExerciseSet, deleteDaily, getDailiesByDate, getDaily, getSingleDaily, maxRepsExercise, updateDaily } from "../controllers/daily.controller.js";

import express from "express";

const router = express.Router();

router.get("/:id", getSingleDaily)
router.get("/", getDaily)
router.post("/", createDaily);
router.put("/addvaluetodaily/:id", addValueToDailyRep)
router.delete("/:id",deleteDaily);
router.put("/:id", updateDaily);
router.post("/bydate", getDailiesByDate);
router.post("/fromexerciseset", createDailyFromExerciseSet);
router.post("/maxreps", maxRepsExercise);

export default router;