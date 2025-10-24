import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js'; // your user schema
import bcrypt from 'bcryptjs';

dotenv.config();

mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).then(async () => {
    console.log("MongoDB connected");

    // Check if any admin exists
    const adminExists = await User.findOne({ role: 'admin' });

    if (!adminExists) {
        const hashedPassword = await bcrypt.hash('Admin123!', 10); // default password

        const adminUser = new User({
            name: 'Super Admin',
            email: 'admin@smarterp.com',
            password: hashedPassword,
            role: 'admin'
        });

        await adminUser.save();
        console.log("Default admin account created!");
        console.log("Email: admin@smarterp.com");
        console.log("Password: Admin123!");
    } else {
        console.log("Admin already exists, skipping creation.");
    }

}).catch(err => console.log(err));
