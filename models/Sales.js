import mongoose from "mongoose";

const salesSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  date: { type: Date, default: Date.now },
  targetSales: Number,
  actualSales: Number,
  remarks: String,
  proofUrl: String
}, { timestamps: true });

export default mongoose.model("Sales", salesSchema);
