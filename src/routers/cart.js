import express from "express";
import { addToCart, getCart, myCart, removeCartItem } from "../controllers/cart";

const router = express.Router()

router.get("/cart",getCart)
router.get("/my-cart/:id",myCart)
router.post("/cart",addToCart)
router.delete("/cart/:id",removeCartItem)

export default router