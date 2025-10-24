import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  clockIn: Date,
  clockOut: Date,
  breakOut: Date,
  breakIn: Date,
  gpsLocation: { lat: Number, lng: Number },
  selfieUrl: String
}, { timestamps: true });

export default mongoose.model("Attendance", attendanceSchema);
