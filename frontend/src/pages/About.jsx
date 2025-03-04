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
    <div className="max-w-7xl mx-auto p-6">
      <Toaster position="top-right" />
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
            <span className="text-purple-600">📄</span>
          </div>
          <h1 className="text-xl font-semibold">Invoices</h1>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Left side - File list */}
        <div className="w-1/3">
          {errors.length > 0 && (
            <div className="mb-4 p-4 bg-red-50 rounded-lg">
              <p className="text-red-600 mb-2">The following errors have been found:</p>
              {errors.map((file, index) => (
                <div key={index} className="text-red-500 text-sm">{file.name}: {file.error}</div>
              ))}
            </div>
          )}

          <div className="space-y-2">
            {files.map((fileObj, index) => (
              <div
                key={fileObj.id}
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  index === currentIndex ? 'border-purple-500 bg-purple-50' : 
                  fileObj.error ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'
                } cursor-pointer`}
                onClick={() => setCurrentIndex(index)}
              >
                <div className="flex items-center gap-3">
                  <div className="text-red-500 text-xs px-2 py-1 bg-white rounded">PDF</div>
                  <span className={`text-sm ${fileObj.error ? 'text-red-600' : 'text-gray-700'}`}>
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
                  className="text-gray-400 hover:text-gray-600"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          {files.length === 0 && (
            <div className="text-center py-12">
              <label className="cursor-pointer inline-block">
                <input
                  type="file"
                  multiple
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="bg-purple-100 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-200 inline-flex items-center">
                  <Plus size={18} className="mr-2" />
                  Upload Invoices
                </div>
              </label>
            </div>
          )}
        </div>

        {/* Right side - PDF preview */}
        <div className="w-2/3 bg-gray-50 rounded-lg p-4">
          {files.length > 0 ? (
            <div className="h-full">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentIndex(i => Math.max(0, i - 1))}
                    disabled={currentIndex === 0}
                    className="p-1 rounded hover:bg-gray-100 disabled:opacity-50"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <span className="text-sm text-gray-600">
                    Invoice {String(currentIndex + 1).padStart(2, '0')} of {String(files.length).padStart(2, '0')}
                  </span>
                  <button
                    onClick={() => setCurrentIndex(i => Math.min(files.length - 1, i + 1))}
                    disabled={currentIndex === files.length - 1}
                    className="p-1 rounded hover:bg-gray-100 disabled:opacity-50"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <label className="cursor-pointer bg-purple-100 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-200">
                    <input
                      type="file"
                      multiple
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <Plus size={18} className="inline mr-2" />
                    Add Files
                  </label>
                  <button
                    onClick={handleUpload}
                    disabled={uploading || files.length === 0}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50"
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

              <div className="h-[calc(100vh-240px)] bg-white rounded border">
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