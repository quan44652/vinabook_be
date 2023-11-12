import express from "express";
import { createBook, getBook, getBooks, removeBook, searchBooks, updateBook } from "../controllers/book";

const router = express.Router()

router.get("/book", getBooks)
router.post("/search-book", searchBooks)
router.post("/book", createBook)
router.put("/book/:id", updateBook)
router.delete("/book/:id", removeBook)
router.get("/book/:id", getBook)

export default router