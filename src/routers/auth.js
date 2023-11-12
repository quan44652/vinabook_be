import express from "express";
import { capquyenUser, getAllUser, signin, signup } from "../controllers/auth";

const router = express.Router()

router.get("/user",getAllUser)
router.post("/signin",signin)
router.post("/signup",signup)
router.post("/capquyen",capquyenUser)

export default router