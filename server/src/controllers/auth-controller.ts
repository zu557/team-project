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
      domain: "localhost",
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
  console.log("admin user : ",user);
  if (!user) return res.status(401).json({ message: "Username not found " });
  const isMatch = await bcrypt.compare(password, user.password);
  console.log("Password  match : ", isMatch)
  if (!isMatch) return res.status(401).json({ message: "Password does not match" });

  const token = generateToken(user._id.toString());
  
  // 6. Set the cookie **and** return JSON
  res
    .cookie("token", token, {
      httpOnly: true,                          // safer against XSS
      secure: process.env.NODE_ENV === "production", // HTTPS only in production
      sameSite: "none",
      domain: "localhost",
      maxAge: 24 * 60 * 60 * 1000,              // 1 day
      path: "/",
    })
    .status(201)
    .json({
      message: "User registered successfully",
      
    });
};

// import { Request, Response } from "express";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// // Assuming the user model and its associated type are imported from your previous file
// import User, { IUser } from "../models/User";

// // Define the shape of the incoming request body
// interface LoginRequestBody {
//   username?: string;
//   password?: string;
// }

// // Define the shape of the JWT payload
// interface JwtPayload {
//   userId: string;
//   username: string;
//   role: string;
// }

// export const loginUser = async (
//   req: Request<{}, {}, LoginRequestBody>,
//   res: Response
// ) => {
//   try {
//     const { username, password } = req.body;

//     // --- Validation Checks ---
//     if (!username || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "Username and password are required.",
//       });
//     }

//     // --- Find User ---
//     const user = await User.findOne({ username });

//     if (!user) {
//       return res.status(400).json({
//         success: false,
//         message: "User does not exist.",
//       });
//     }

//     // --- Password Check ---
//     const isPasswordMatch = await bcrypt.compare(password, user.password);

//     if (!isPasswordMatch) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid credentials!",
//       });
//     }

//     // --- JWT Creation with Dynamic Expiration ---
//     const jwtSecret = process.env.JWT_SECRET_KEY;

//     // Set expiration based on the environment
//     const jwtExpiration = process.env.NODE_ENV === "production" ? "7d" : "30m";

//     const accessToken = jwt.sign(
//       {
//         userId: user._id.toString(), // Convert ObjectId to a string
//         username: user.username,
//         role: user.role,
//       } as JwtPayload, // Cast the payload to the defined interface
//       jwtSecret,
//       {
//         expiresIn: jwtExpiration,
//       }
//     );

//     res.status(200).json({
//       success: true,
//       message: "Logged in successfully!",
//       accessToken,
//     });
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({
//       success: false,
//       message: "An unexpected error occurred. Please try again.",
//     });
//   }
// };
