import bcrypt from "bcrypt";
import mongoose from "mongoose";


export const generateMockUsers = async (qty = 50) => {
  const users = [];

  for (let i = 0; i < qty; i++) {
    const hashedPassword = await bcrypt.hash("coder123", 10);

    users.push({
      _id: new mongoose.Types.ObjectId(),
      first_name: `User${i}`,
      last_name: `Mock`,
      email: `user${i}@mail.com`,
      password: hashedPassword,
      role: Math.random() > 0.5 ? "user" : "admin",
      pets: [],
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }

  return users;
};