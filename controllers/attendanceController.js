// backend/controllers/attendanceController.js
import Attendance from '../models/Attendance.js';
import User from '../models/User.js';

export const clockIn = async (req, res) => {
  try {
    const { userId } = req.body;

    const attendance = new Attendance({
      user: userId,
      clockIn: new Date()
    });

    await attendance.save();
    res.json({ message: "Clocked in successfully", attendance });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const clockOut = async (req, res) => {
  try {
    const { userId } = req.body;

    const attendance = await Attendance.findOne({ user: userId }).sort({ createdAt: -1 });
    if (!attendance) return res.status(400).json({ message: "No clock-in found" });

    attendance.clockOut = new Date();
    await attendance.save();

    res.json({ message: "Clocked out successfully", attendance });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
