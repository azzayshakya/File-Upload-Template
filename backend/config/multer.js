import multer from "multer";

// Memory Storage Configuration
const storage = multer.memoryStorage();

// Single Image File Filter (JPG, JPEG, PNG)
const imageFileFilter = (req, file, cb) => {
  const allowedFormats = /jpeg|jpg|png/;
  const extname = allowedFormats.test(file.originalname.toLowerCase());

  if (extname) return cb(null, true);
  cb(new Error("Unsupported image format! Only JPG, JPEG, and PNG are allowed."));
};

// Multiple Document File Filter (PDF, DOC, DOCX)
const documentFileFilter = (req, file, cb) => {
  const allowedFormats = /pdf|doc|docx/;
  const extname = allowedFormats.test(file.originalname.toLowerCase());

  if (extname) return cb(null, true);
  cb(new Error("Unsupported document format! Only PDF, DOC, and DOCX are allowed."));
};

// Single Image Upload
const imageUpload = multer({
  storage,
  fileFilter: imageFileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB Limit for Images
});
export const singleImageUpload = imageUpload.single("file");

// Multiple Document Upload
const documentUpload = multer({
  storage,
  fileFilter: documentFileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB Limit per Document
});
export const multipleDocumentUpload = documentUpload.array("files", 5); // Max 5 Files
