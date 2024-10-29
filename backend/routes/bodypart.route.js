import express from "express";
import { getBodyParts, createBodyParts, deleteBodyParts, updateBodyParts } from "../controllers/bodypart.controller.js";

const router = express.Router();

router.get("/", getBodyParts)
router.post("/", createBodyParts);
router.delete("/:id",deleteBodyParts);
router.put("/:id", updateBodyParts);

export default router;