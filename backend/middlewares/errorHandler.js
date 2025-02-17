// const errorHandler = (err, req, res, next) => {
//     console.error("🔥 Error:", err.message);
  
//     let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
//     let message = err.message || "Internal Server Error";
  
//     // Multer file upload error handling
//     if (err.name === "MulterError") {
//       statusCode = 400;
//       message = "File upload error: " + err.message;
//     }
  
//     // Cloudinary errors
//     if (err.message.includes("Cloudinary")) {
//       statusCode = 500;
//       message = "Cloudinary upload failed. Please try again.";
//     }
  
//     res.status(statusCode).json({
//       success: false,
//       message,
//       stack: process.env.NODE_ENV === "development" ? err.stack : null,
//     });
//   };
  
//   export default errorHandler;
  