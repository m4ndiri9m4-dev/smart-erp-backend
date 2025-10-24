import mongoose from "mongoose";

const payrollSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  totalDays: Number,
  totalSalary: Number,
  period: String,
}, { timestamps: true });

export default mongoose.model("Payroll", payrollSchema);
