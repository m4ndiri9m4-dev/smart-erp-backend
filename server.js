import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bcrypt from "bcryptjs";
import User from "./models/User.js"; // your user schema

// Import your route files
import authRoutes from "./routes/authRoutes.js"; // replace userRoutes with authRoutes
import projectRoutes from "./routes/projectRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";

dotenv.config();

// Initialize Express
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("✅ MongoDB connected");

    // Create default admin if not exists
    const adminExists = await User.findOne({ role: "admin" });

    if (!adminExists) {
      const hashedPassword = await bcrypt.hash("Admin123!", 10);

      const adminUser = new User({
        name: "Super Admin",
        email: "admin@smarterp.com",
        password: hashedPassword,
        role: "admin",
      });

      await adminUser.save();
      console.log("🧑‍💼 Default admin account created:");
      console.log("   Email: admin@smarterp.com");
      console.log("   Password: Admin123!");
    } else {
      console.log("ℹ️ Admin already exists, skipping creation.");
    }
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/attendance", attendanceRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("🚀 Smart ERP Backend Running");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
