import express from "express";
import { getSingleDaily, getDaily, createDaily, deleteDaily, updateDaily } from "../controllers/daily.controller.js";

const router = express.Router();

router.get("/:id", getSingleDaily)
router.get("/", getDaily)
router.post("/", createDaily);
router.delete("/:id",deleteDaily);
router.put("/:id", updateDaily);

export default router;