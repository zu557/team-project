import { Request, Response } from "express";
import User, { IUser } from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
  
export const registerUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  // 1. Validate input
  if (!username || !password) { 
    return res.status(400).json({ error: "Username and password are required" });
  }

  // 2. Check if username exists
  const existing = await User.findOne({ username });
  if (existing) {
    return res.status(409).json({ error: "Username already exists" });
  }

  // 3. Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // 4. Create user
  const user: IUser = await User.create({
    username,
    password: hashedPassword,
  });
 
  // 5. Generate JWT
  const token = generateToken(user._id.toString());

  // 6. Set the cookie **and** return JSON
  res
    .cookie("token", token, {
      httpOnly: true,                          // safer against XSS
      secure: process.env.NODE_ENV === "production", // HTTPS only in production
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,              // 1 day
      path: "/",
    })
    .status(201)
    .json({
      message: "User registered successfully",
      
    });
};



export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(401).json({ message: "Username not found " });
  const isMatch = await bcrypt.compare(password, user.password);
  console.log("Password  match : ", isMatch)
  if (!isMatch) return res.status(401).json({ message: "Password does not match" });

  const token = generateToken(user._id.toString());
  
console.log("generated token : ", token)
  // 6. Set the cookie **and** return JSON
  res
    .cookie("token", token, {
      httpOnly: true,                          // safer against XSS
      secure: process.env.NODE_ENV === "production", // HTTPS only in production
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,              // 1 day
      path: "/",
    })
    .status(201)
    .json({
      message: "User logged successfully",
      
    });
};
