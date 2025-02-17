// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import uploadRoutes from "./routes/uploadRoutes.js";

// dotenv.config();
// const app = express();

// // Middlewares
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use("/api", uploadRoutes);

// // Error Handling Middleware
// app.use((err, req, res, next) => {
//   res.status(err.status || 500).json({ error: err.message || "Something went wrong" });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Multer configuration
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed!'), false);
    }
  }
});

// Upload endpoint
app.post('/api/upload', upload.array('files', 30), async (req, res) => {
  try {
    const uploadPromises = req.files.map(file => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'invoices',
            resource_type: 'auto'
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        const buffer = Buffer.from(file.buffer);
        stream.end(buffer);
      });
    });

    const results = await Promise.all(uploadPromises);
    
    res.json({
      success: true,
      files: results.map(result => ({
        url: result.secure_url,
        publicId: result.public_id
      }))
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Error uploading files',
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));