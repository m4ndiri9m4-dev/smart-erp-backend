import express from "express";
import { addSales, getSales } from "../controllers/salesController.js";
const router = express.Router();

router.post("/", addSales);
router.get("/", getSales);

export default router;
