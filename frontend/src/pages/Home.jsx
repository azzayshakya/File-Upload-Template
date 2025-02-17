import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import axios from '../apis/uploadApi';
import { UploadCloud, Trash2 } from 'lucide-react';

export default function Home() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async () => {
    if (!file) return setMessage('Please select a file!');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setUploadedFile(res.data.url);
      setMessage('File uploaded successfully!');
      setFile(null);
      setPreview(null);
    } catch (error) {
      setMessage(error.response?.data?.error || 'Upload failed');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-4">Upload a File</h2>
      <div className="w-full flex flex-col items-center border-2 border-dashed border-gray-300 p-6 rounded-lg mb-4">
        {preview ? (
          <div className="relative w-full max-w-sm">
            <img src={preview} alt="Preview" className="w-full h-auto rounded-lg shadow-md" />
            <button
              onClick={() => { setFile(null); setPreview(null); }}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ) : (
          <label className="flex flex-col items-center cursor-pointer">
            <UploadCloud size={40} className="text-gray-500 mb-2" />
            <span className="text-gray-600">Click to select a file</span>
            <input type="file" className="hidden" onChange={handleFileChange} />
          </label>
        )}
      </div>
      <Button onClick={handleUpload} disabled={!file} className="w-full bg-blue-500 hover:bg-blue-600 text-white">
        Upload
      </Button>
      {message && <p className="mt-4 text-gray-700">{message}</p>}
      {/* {uploadedFile && (
        <p className="mt-2 text-blue-600">
          File URL: <a href={uploadedFile} target="_blank" rel="noopener noreferrer">{uploadedFile}</a>
        </p>
      )} */}
    </div>
  );
}
