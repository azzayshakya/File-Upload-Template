/**
 * SingleFileUpload Component
 * 
 * This component allows users to upload a single image file. It supports only JPEG, JPG, and PNG formats.
 * The component displays a preview of the selected image and provides an upload button to send the file to the server.
 * 
 * Key Features:
 * - Only JPEG, JPG, and PNG files are allowed.
 */

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import axios from '../apis/uploadApi';
import { UploadCloud, Trash2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function SingleFileUpload() {
  // State to store the selected file
  const [file, setFile] = useState(null);
  // State to store the preview URL of the selected image
  const [preview, setPreview] = useState(null);
  // State to store success or error messages
  const [message, setMessage] = useState('');
  // State to store the uploaded file's URL
  const [uploadedFile, setUploadedFile] = useState(null);

  /**
   * handleFileChange
   * - Handles the change event when a user selects a file.
   * - Validates the file type to ensure it's either JPEG, JPG, or PNG.
   * - Sets the file and generates a preview URL.
   * 
   * @param {Event} e - The change event from the file input
   */
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Validate file type
      const fileType = selectedFile.type;
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!validTypes.includes(fileType)) {
        toast.error('Only JPEG, JPG, and PNG files are allowed!');
        return;
      }
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  /**
   * handleUpload
   * - Handles the upload action when the user clicks the upload button.
   * - Checks if a file is selected, otherwise shows an error message.
   * - Uses axios to send a POST request to upload the file.
   * - Displays success or error notifications.
   */
  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a file!');
      return setMessage('Please select a file!');
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setUploadedFile(res.data.url);
      setMessage('File uploaded successfully!');
      toast.success('File uploaded successfully!');
      // Reset file and preview
      setFile(null);
      setPreview(null);
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Upload failed';
      setMessage(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-4">Upload a File</h2>
      <div className="w-full flex flex-col items-center border-2 border-dashed border-gray-300 p-6 rounded-lg mb-4">
        {preview ? (
          // Display preview of the selected image
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
          // File input and upload icon
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
    </div>
  );
}
