import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

// 🔹 Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 🔹 Multer Storage Configuration
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "uploads", // Cloudinary folder name
    resource_type: "auto", // Allows any file type (images, videos, PDFs, etc.)
    allowed_formats: [
      "jpg", "png", "jpeg", "gif", "pdf", "doc", "docx", "txt", 
      "mp4", "mp3", "avi", "mov", "zip", "rar", "csv"
    ],
  },
});

// 🔹 Multer Upload Middleware
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB file size limit
});

export default upload;
