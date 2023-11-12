import express from "express";
import {cancelOrder, changeOrder, createOrder, getOrder, myOrder } from "../controllers/order";

const router = express.Router()

router.get("/order", getOrder)
router.post("/order", createOrder)

router.get("/order/:id", myOrder)
router.put("/cancel-order/:id", cancelOrder)
router.put("/change-order/:id", changeOrder)

export default router