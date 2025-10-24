import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  targetSales: Number,
  targetAttendance: Number,
  assignedEmployees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  progress: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model("Project", projectSchema);
