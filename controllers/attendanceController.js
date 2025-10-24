import Attendance from '../models/Attendance.js';

export const clockIn = async (req, res) => {
  try {
    const { userId, time } = req.body;
    const record = new Attendance({ userId, type: 'in', time });
    await record.save();
    res.json({ message: 'Clock in recorded', record });
  } catch (err) {
    res.status(500).json({ message: 'Error saving clock in' });
  }
};

export const clockOut = async (req, res) => {
  try {
    const { userId, time } = req.body;
    const record = new Attendance({ userId, type: 'out', time });
    await record.save();
    res.json({ message: 'Clock out recorded', record });
  } catch (err) {
    res.status(500).json({ message: 'Error saving clock out' });
  }
};
