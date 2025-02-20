import cloudinary from "../config/cloudinary.js";

export const SingleFileUpload = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const result = await cloudinary.uploader.upload_stream(
      {
        folder: "images",
        resource_type: "image",
      },
      (error, result) => {
        if (error) throw error;
        res.status(200).json({
          success: true,
          message: "Image uploaded successfully",
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    );

    // Directly use buffer from memory storage
    result.end(req.file.buffer);
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: error.message });
  }
};
