import cloudinary from '../config/cloudinary.js';

export const MultipleFileUpload = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

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

        // Directly use buffer from memory storage
        stream.end(file.buffer);
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
};
