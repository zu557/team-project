// src/utils/cloudinary.ts
import { v2 as cloudinary } from "cloudinary";

export interface CloudinaryUploadResult {
  imageUrl: string;
  publicId: string;
}

export const uploadToCloudinary = async (
  fileBuffer: Buffer
): Promise<CloudinaryUploadResult> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "image" },
      (error, result) => {
        if (error || !result) return reject(error);

        resolve({
          imageUrl: result.secure_url,
          publicId: result.public_id,
        });
      }
    );

    uploadStream.end(fileBuffer);
  });
};
