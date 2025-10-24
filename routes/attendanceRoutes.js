import express from "express";
import { clockIn, clockOut } from "../controllers/attendanceController.js";
const router = express.Router();

router.post("/clockin", clockIn);
router.post("/clockout", clockOut);

export default router;
