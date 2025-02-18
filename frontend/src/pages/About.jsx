import React, { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { Trash2, ChevronLeft, ChevronRight, Plus, Clock } from 'lucide-react';
import axios from 'axios';

const AboutPage = () => {
  const [files, setFiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files).map(file => ({
      file,
      name: file.name,
      error: null,
      id: Math.random().toString(36).substr(2, 9),
      previewUrl: URL.createObjectURL(file)
    }));

    const validatedFiles = newFiles.map(fileObj => {
      if (fileObj.file.type !== 'application/pdf') {
        return { ...fileObj, error: 'Invalid file type' };
      }
      if (fileObj.file.size > 5 * 1024 * 1024) {
        return { ...fileObj, error: 'File too large' };
      }
      return fileObj;
    });

    setFiles(prev => [...prev, ...validatedFiles]);
    setErrors(validatedFiles.filter(f => f.error));
    toast.success(`${validatedFiles.filter(f => !f.error).length} files added`);
  };

  const handleDelete = (id) => {
    setFiles(prev => {
      const fileToDelete = prev.find(f => f.id === id);
      if (fileToDelete && fileToDelete.previewUrl) {
        URL.revokeObjectURL(fileToDelete.previewUrl);
      }
      return prev.filter(f => f.id !== id);
    });
    toast.success('File removed');
  };

  const handleUpload = async () => {
    const validFiles = files.filter(f => !f.error);
    if (validFiles.length === 0) {
      toast.error('No valid files to upload');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    validFiles.forEach(fileObj => formData.append('files', fileObj.file));

    try {
      await axios.post('http://localhost:5000/api/upload', formData);
      toast.success('Files uploaded successfully');
      // Cleanup object URLs
      files.forEach(file => {
        if (file.previewUrl) {
          URL.revokeObjectURL(file.previewUrl);
        }
      });
      setFiles([]);
    } catch (error) {
      toast.error('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6  shadow-[rgba(100,100,111,0.2)_0px_7px_29px_0px] ">
      <Toaster position="top-right" />
      
      {/* Header Section */}
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-semibold text-gray-800">Files</h1>
              <label className="cursor-pointer bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors duration-200">
                <input type="file" multiple accept=".pdf" onChange={handleFileChange} className="hidden" />
                <Plus size={18} className="inline mr-2" /> Upload File
              </label>
            </div>

      <div className="flex gap-8 ">
        {/* Left side - File list */}
        <div className="w-1/3 bg-white rounded-lg  p-5  shadow-[rgba(100,100,111,0.2)_0px_7px_29px_0px]">
          {/* {errors.length > 0 && (
            <div className="mb-4 p-4 bg-red-50 rounded-lg border border-red-100">
              <p className="text-red-600 font-medium mb-2">Errors found:</p>
              {errors.map((file, index) => (
                <div key={index} className="text-red-500 text-sm">{file.name}: {file.error}</div>
              ))}
            </div>
          )} */}
        {/* Left Section - File List */}
        <div className=" bg-white  rounded-lg ">
          {files.length > 0 ? (

          <div className="space-y-3 ">
            {files.map((fileObj, index) => (
              <div
                key={fileObj.id}
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  index === currentIndex ? 'border-purple-500 bg-purple-50' : 
                  fileObj.error ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'
                } cursor-pointer transition-all duration-200 hover:shadow-sm`}
                onClick={() => setCurrentIndex(index)}
              >
                <div className="flex items-center gap-3">
                  <div className="text-red-500 text-xs px-2 py-1 bg-white rounded border border-red-200">PDF</div>
                  <span className={`text-sm font-medium ${fileObj.error ? 'text-red-600' : 'text-gray-700'}`}>
                    {fileObj.name}
                  </span>
                  {fileObj.error && (
                    <span className="text-xs text-red-500 ml-2">{fileObj.error}</span>
                  )}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(fileObj.id);
                  }}
                  className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500 p-12">No files uploaded</div>
          )}
        </div>
        </div>

        {/* Right side - PDF preview */}
        <div className="w-2/3 bg-white rounded-lg  p-5  shadow-[rgba(100,100,111,0.2)_0px_7px_29px_0px]">
          {files.length > 0 ? (
            <div className="h-full">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setCurrentIndex(i => Math.max(0, i - 1))}
                    disabled={currentIndex === 0}
                    className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 transition-colors duration-200"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <span className="text-sm text-gray-600 font-medium">
                    Invoice {String(currentIndex + 1).padStart(2, '0')} of {String(files.length).padStart(2, '0')}
                  </span>
                  <button
                    onClick={() => setCurrentIndex(i => Math.min(files.length - 1, i + 1))}
                    disabled={currentIndex === files.length - 1}
                    className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 transition-colors duration-200"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  
                  <button
                    onClick={handleUpload}
                    disabled={uploading || files.length === 0}
                    className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors duration-200"
                  >
                    {uploading ? (
                      <>
                        <Clock size={18} className="inline mr-2 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      'Continue'
                    )}
                  </button>
                </div>
              </div>

              <div className="h-[calc(100vh-240px)] bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                {files[currentIndex] && !files[currentIndex].error && (
                  <iframe
                    src={files[currentIndex].previewUrl}
                    className="w-full h-full"
                    title={`Preview of ${files[currentIndex].name}`}
                  />
                )}
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              No file selected for preview
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;