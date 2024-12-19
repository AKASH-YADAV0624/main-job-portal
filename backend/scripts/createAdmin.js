import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import dotenv from "dotenv";

import {User} from '../models/user.model.js'  // Import your User model

// Load environment variables from .env file
dotenv.config();

// Get the MONGO_URI from the .env file
const DB_URI = process.env.MONGO_URI;

// Admin data
const adminData = {
  username: "adminUsername",
  email: "admin@example.com",
  password: "adminPassword@123",  // This is the plain password, it will be hashed
  firstName: "Admin",
  lastName: "User",
  role: "admin",  // This assigns the admin role
};

// Function to create admin
const createAdmin = async () => {
  try {
    // Connect to MongoDB using the MONGO_URI from the .env file
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB...");

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(adminData.password, 10);

    // Create the admin user
    const adminUser = new User({
      username: adminData.username,
      email: adminData.email,
      password: hashedPassword,
      firstName: adminData.firstName,
      lastName: adminData.lastName,
      role: adminData.role,
    });

    // Save the admin user to the database
    await adminUser.save();
    console.log("Admin user created successfully!");

    // Close the database connection
    mongoose.connection.close();
  } catch (error) {
    console.error("Error creating admin:", error);
    mongoose.connection.close();
  }
};

// Run the function
createAdmin();
