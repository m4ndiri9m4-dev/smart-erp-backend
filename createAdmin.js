// backend/createAdmin.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("MongoDB connected");

    const exists = await User.findOne({ email: 'admin@smarterp.com' });
    if (exists) return console.log("Admin already exists");

    const hashedPassword = await bcrypt.hash('Admin123!', 10);
    const admin = new User({ name: 'Super Admin', email: 'admin@smarterp.com', password: hashedPassword, role: 'admin' });
    await admin.save();
    console.log("Admin created: admin@smarterp.com / Admin123!");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

createAdmin();
