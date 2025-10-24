import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(async () => {
  console.log('MongoDB connected');

  const adminExists = await User.findOne({ role: 'admin' });
  if (!adminExists) {
    const hashedPassword = await bcrypt.hash('Admin123!', 10);
    const adminUser = new User({
      name: 'Super Admin',
      email: 'admin@smarterp.com',
      password: hashedPassword,
      role: 'admin'
    });

    await adminUser.save();
    console.log('✅ Default admin account created!');
    console.log('Email: admin@smarterp.com');
    console.log('Password: Admin123!');
  } else {
    console.log('Admin already exists, skipping creation.');
  }

  process.exit(0);
})
.catch(err => console.error(err));
