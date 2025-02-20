import express from "express";
import upload from "../config/multer.js";
import { SingleFileUpload } from "../controllers/uploadController.js";
import {MultipleFileUpload }  from "../controllers/multiFileController.js";

const router = express.Router();

router.post("/upload", upload.single("file"), SingleFileUpload);
router.post('/multiple-upload', upload.array('files', 30), MultipleFileUpload);


export default router;
