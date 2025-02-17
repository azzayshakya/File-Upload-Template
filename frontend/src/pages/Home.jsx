import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import axios from "../apis/uploadApi";
export default function Home() {
  const teamMembers = [
    { name: 'John Doe', role: 'CEO', img: '' },
    { name: 'Jane Smith', role: 'CTO', img: '' },
    { name: 'Alex Johnson', role: 'Lead Developer', img: '' },
  ];
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) return setMessage("Please select a file!");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUploadedFile(res.data.url);
      setMessage("File uploaded successfully!");
    } catch (error) {
      setMessage(error.response?.data?.error || "Upload failed");
    }
  };

  return (
    <div>
    <input type="file" onChange={handleFileChange} />
    <button onClick={handleUpload}>Upload</button>
    {message && <p>{message}</p>}
    {uploadedFile && <p>File URL: <a href={uploadedFile} target="_blank">{uploadedFile}</a></p>}
  </div>
  );
}
