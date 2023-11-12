import express, { Router } from "express";
import { createFeedback, getFeedback, getFeedbacks, removeFeedback, updateFeedback } from "../controllers/feedback";

const router = express.Router()

router.get("/feedback", getFeedbacks)
router.post("/feedback", createFeedback)
router.put("/feedback/:id", updateFeedback)
router.delete("/feedback/:id", removeFeedback)
router.get("/feedback/:id", getFeedback)

export default router