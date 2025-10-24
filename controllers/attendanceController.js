import Attendance from "../models/Attendance.js";

export const clockIn = async (req, res) => {
  try {
    const { employee, project, lat, lng, selfieUrl } = req.body;
    const attendance = await Attendance.create({
      employee, project, clockIn: new Date(), gpsLocation: { lat, lng }, selfieUrl
    });
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const clockOut = async (req, res) => {
  try {
    const { employee } = req.body;
    const record = await Attendance.findOne({ employee }).sort({ createdAt: -1 });
    if (!record) return res.status(404).json({ message: "No clock-in found" });
    record.clockOut = new Date();
    await record.save();
    res.json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
