import express from "express";
import { clockIn, clockOut } from "../controllers/attendanceController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/clockin", protect, clockIn);
router.post("/clockout", protect, clockOut);

export default router;
