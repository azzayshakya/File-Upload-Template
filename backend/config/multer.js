import multer from "multer";
import path from "path";

// Multer Storage Configuration
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

// Multer File Filter
const fileFilter = (req, file, cb) => {
  const allowedFormats = /jpeg|jpg|png|gif|pdf|doc|docx|txt|mp4|mp3|avi|mov|zip|rar|csv/;
  const extname = allowedFormats.test(path.extname(file.originalname).toLowerCase());

  if (extname) return cb(null, true);
  cb(new Error("Unsupported file format!"));
};

// Upload Middleware
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB Limit
});

export default upload;



// import multer from "multer";
// import { v2 as cloudinary } from "cloudinary";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import dotenv from "dotenv";

// dotenv.config();

// // 🔹 Cloudinary Config
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // 🔹 Multer Storage Configuration
// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "uploads", // Cloudinary folder name
//     resource_type: "auto", // Allows any file type (images, videos, PDFs, etc.)
//     allowed_formats: [
//       "jpg", "png", "jpeg", "gif", "pdf", "doc", "docx", "txt", 
//       "mp4", "mp3", "avi", "mov", "zip", "rar", "csv"
//     ],
//   },
// });

// // 🔹 Multer Upload Middleware
// const upload = multer({
//   storage,
//   limits: { fileSize: 10 * 1024 * 1024 }, // 10MB file size limit
// });

// export default upload;
