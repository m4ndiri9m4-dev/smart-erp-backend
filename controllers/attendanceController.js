import Attendance from "../models/Attendance.js";

// Employee clock-in
export const clockIn = async (req, res) => {
  try {
    const { userId } = req.user; // From JWT
    const timestamp = new Date();

    const attendance = await Attendance.create({
      user: userId,
      clockIn: timestamp,
      clockOut: null,
    });

    res.status(201).json({ message: "Clocked in", timestamp: attendance.clockIn });
  } catch (error) {
    res.status(500).json({ message: "Clock-in failed", error: error.message });
  }
};

// Employee clock-out
export const clockOut = async (req, res) => {
  try {
    const { userId } = req.user;
    const timestamp = new Date();

    // Find the latest clock-in record that hasn't been clocked out yet
    const attendance = await Attendance.findOne({ user: userId, clockOut: null }).sort({ clockIn: -1 });
    if (!attendance) return res.status(400).json({ message: "No active clock-in found" });

    attendance.clockOut = timestamp;
    await attendance.save();

    res.status(200).json({ message: "Clocked out", timestamp: attendance.clockOut });
  } catch (error) {
    res.status(500).json({ message: "Clock-out failed", error: error.message });
  }
};
