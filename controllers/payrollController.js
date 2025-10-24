import Payroll from "../models/Payroll.js";
import User from "../models/User.js";
import Attendance from "../models/Attendance.js";

export const generatePayroll = async (req, res) => {
  try {
    const employees = await User.find({ role: "employee" });
    const payrolls = [];

    for (let emp of employees) {
      const daysWorked = await Attendance.countDocuments({ employee: emp._id });
      const totalSalary = emp.dailyRate * daysWorked;
      const payroll = await Payroll.create({
        employee: emp._id,
        totalDays: daysWorked,
        totalSalary,
        period: "Monthly"
      });
      payrolls.push(payroll);
    }

    res.json(payrolls);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
