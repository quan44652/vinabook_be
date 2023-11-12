import express from "express";
import { createCategory, getAllCategory, getCategory, removeCategory, updateCategory } from "../controllers/category";

const router = express.Router()

router.get("/category", getAllCategory)
router.post("/category", createCategory)
router.put("/category/:id", updateCategory)
router.delete("/category/:id", removeCategory)
router.get("/category/:id", getCategory)

export default router