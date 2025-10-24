import express from "express";
import { generatePayroll } from "../controllers/payrollController.js";
const router = express.Router();

router.get("/generate", generatePayroll);

export default router;
