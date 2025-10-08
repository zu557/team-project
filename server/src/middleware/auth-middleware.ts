import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

interface DecodedToken { id: string; }

export interface UserReq extends Request {
  user?: {
    _id?: string;
    username?: string;
  } | null;
}
export const authMiddleware = async (req: UserReq, res: Response, next: NextFunction) => {
  try {
    const token =
      req.cookies?.token ||
      req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as DecodedToken;
    req.user = await User.findById(decoded.id).select("-password");

    next();
  } catch (err) {
    res.status(401).json({ message: "Not authorized" });
  }
};


// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";

// // Extend the Express Request type to include the custom 'userInfo' property
// interface AuthenticatedRequest extends Request {
//   userInfo?: string | jwt.JwtPayload;
// }

// const authMiddleware = (
//   req: AuthenticatedRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//   const authHeader = req.headers.authorization;
//   console.log(authHeader);
//   const token = authHeader && authHeader.split(" ")[1];

//   if (!token) {
//     return res.status(401).json({
//       success: false,
//       message: "Access denied. No token provided. Please login to continue",
//     });
//   }

//   // Decode the token
//   try {
//     const secret = process.env.JWT_SECRET_KEY;
//     if (!secret) {
//       return res.status(500).json({
//         success: false,
//         message: "Server configuration error: JWT secret not found.",
//       });
//     }
    
//     // The `jwt.verify` function returns the payload type
//     const decodedTokenInfo = jwt.verify(token, secret);
//     console.log(decodedTokenInfo);

//     req.userInfo = decodedTokenInfo;
//     next();
//   } catch (error) {
//     // Catch specific JWT errors for more accurate messages
//     if (error instanceof jwt.TokenExpiredError) {
//       return res.status(401).json({
//         success: false,
//         message: "Token has expired. Please log in again.",
//       });
//     } else if (error instanceof jwt.JsonWebTokenError) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid token. Please log in again.",
//       });
//     } else {
//       return res.status(500).json({
//         success: false,
//         message: "Access denied. Please login to continue.",
//       });
//     }
//   }
// };

// export default authMiddleware;
