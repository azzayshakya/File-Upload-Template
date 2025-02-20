import express from "express";
import { singleImageUpload, multipleDocumentUpload } from "../config/multer.js";
import { SingleFileUpload } from "../controllers/singleFileUpload.js";
import { MultipleFileUpload } from "../controllers/multiFileController.js";

const router = express.Router();

// Single Image Upload (JPG, JPEG, PNG)
router.post("/upload", singleImageUpload, SingleFileUpload);

// Multiple Document Upload (PDF, DOC, DOCX)
router.post("/multiple-upload", multipleDocumentUpload, MultipleFileUpload);

export default router;
