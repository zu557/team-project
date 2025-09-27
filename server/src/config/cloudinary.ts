// This MUST be the first line of your main server file (e.g., index.js)
import 'dotenv/config.js';

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME, 
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET,
  secure:true
});

export default cloudinary;
