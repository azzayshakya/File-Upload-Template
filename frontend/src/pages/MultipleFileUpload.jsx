/**
 * DocumentUploader Component
 * 
 * This component provides a user interface for uploading and previewing documents. 
 * It supports PDF and Word files (.pdf, .doc, .docx) with a maximum of 5 files and a total size limit of 20 MB.
 * 
 * Features:
 * - Multiple file selection with preview for PDFs
 * - Icon representation for Word documents
 * - File validation: type, size, and quantity limits
 * - Delete and upload functionalities with success/error notifications
 * - Responsive UI using Tailwind CSS
 */
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, ChevronLeft, ChevronRight, Upload, Loader2, FileText, File } from 'lucide-react';
// import axios from 'axios';
import axios from '../apis/uploadApi';
import toast from 'react-hot-toast';

const DocumentUploader = () => {
  const [files, setFiles] = useState([]);  // State to store selected files
  const [currentIndex, setCurrentIndex] = useState(0);  // State to track current file index for preview
  const [uploading, setUploading] = useState(false);  // State to track uploading status
  const [error, setError] = useState('');  // State to handle errors
  const fileInputRef = useRef(null);  // Reference for hidden file input

  // Allowed file types with MIME types, icons, and color configurationss
  const allowedTypes = {
    'application/pdf': {
      icon: 'PDF',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      extension: '.pdf'
    },
    'application/msword': {
      icon: 'DOC',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      extension: '.doc'
    },
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': {
      icon: 'DOCX',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      extension: '.docx'
    }
  };

  // Get accepted file extensions as a string
  const acceptedFileTypes = Object.values(allowedTypes)
    .map(type => type.extension)
    .join(',');

  /**
   * Get a preview URL for the file.
   * PDFs will be displayed using object URLs.
   * Word documents are not directly previewable.
   * 
   * @param {File} file - The file to generate preview for
   * @returns {string|null} - Preview URL or null if unsupported
   */
  const getPreviewUrl = async (file) => {
    if (file.type === 'application/pdf') {
      return URL.createObjectURL(file);
    }
    return null;
  };

 /**
   * Handle file selection.
   * Validates file type, size, and total upload limit.
   * Generates preview URLs for PDFs.
   * 
   * @param {Event} e - Input change event
   */
 const handleFileChange = async (e) => {
  const selectedFiles = Array.from(e.target.files || []);
  if (selectedFiles.length === 0) return;

  // Check if total files exceed the limit of 5
  if (files.length + selectedFiles.length > 5) {
    toast.error('You can only upload a maximum of 5 files.');
    return;
  }
  // Check total size limit (20 MB)
  const currentTotalSize = files.reduce((total, f) => total + f.size, 0);
  const newTotalSize = selectedFiles.reduce((total, f) => total + f.size, currentTotalSize);

  if (newTotalSize > 20 * 1024 * 1024) {
    toast.error('Total file size cannot exceed 20 MB.');
    return;
  }

  const processedFiles = await Promise.all(
    selectedFiles.map(async (file) => {
      const isValidType = allowedTypes[file.type];
      const isValidSize = file.size <= 5 * 1024 * 1024;

      if (!isValidSize) {
        toast.error(`${file.name} is too large (max 5MB).`);
        return null; // Skip this file
      }

      const previewUrl = await getPreviewUrl(file);

      return {
        file,
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: file.type,
        size: file.size,
        error: !isValidType ? 'Invalid file type' : null,
        previewUrl,
        ...(allowedTypes[file.type] || {
          icon: 'FILE',
          color: 'text-gray-600',
          bgColor: 'bg-gray-50',
        }),
      };
    })
  );

 // Filter out invalid files
  const validFiles = processedFiles.filter(file => file !== null);

    setFiles(prev => [...prev, ...validFiles]);
    setError('');

    // Reset the input value to allow selecting the same file again
    e.target.value = '';
  };

  /**
   * Handle deletion of a file.
   * Releases memory for object URLs.
   * 
   * @param {string} id - Unique identifier of the file to delete
   */
  const handleDelete = (id) => {
    setFiles(prev => {
      const fileToDelete = prev.find(f => f.id === id);
      if (fileToDelete?.previewUrl) {
        URL.revokeObjectURL(fileToDelete.previewUrl);
      }
      return prev.filter(f => f.id !== id);
    });

    setCurrentIndex(prev => Math.min(prev, files.length - 2));
  };
    /**
   * Handle file upload.
   * Sends files to the server using Axios with multipart/form-data.
   * Displays toast notifications for success or error.
   */

 const handleUpload = async () => {
  const validFiles = files.filter(f => !f.error);
  if (validFiles.length === 0) {
    setError('No valid files to upload');
    toast.error('No valid files to upload');
    return;
  }

  setUploading(true);
  const formData = new FormData();
  validFiles.forEach(fileObj => formData.append('files', fileObj.file));

  try {
    await axios.post('/multiple-upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    // Clean up object URLs
    files.forEach(file => {
      if (file.previewUrl) {
        URL.revokeObjectURL(file.previewUrl);
      }
    });

    setFiles([]);
    setCurrentIndex(0);
    setError('');
    toast.success('Files uploaded successfully!');
  } catch (err) {
    setError('Upload failed. Please try again.');
    toast.error('Upload failed. Please try again.');
  } finally {
    setUploading(false);
  }
};

  /**
   * FilePreview Component
   * Displays preview of the currently selected file.
   * Supports PDFs and provides icons for Word documents.
   * 
   * @param {Object} file - The file object to preview
   * @returns {JSX.Element|null} - The preview component or null if no file
   */

  const FilePreview = ({ file }) => {
    if (!file) return null;

    if (file.type === 'application/pdf' && file.previewUrl) {
      return (
        <iframe
          src={file.previewUrl}
          className="w-full h-full rounded-lg"
          title={file.name}
        />
      );
    }

    // Preview for Word documents
    if (file.type.includes('word')) {
      return (
        <div className="flex flex-col items-center justify-center h-full space-y-4">
          <FileText className="w-20 h-20 text-blue-600" />
          <div className="text-center">
            <p className="text-lg font-medium">{file.name}</p>
            <p className="text-sm text-gray-500">Word Document</p>
            <p className="text-xs text-gray-400 mt-2">Preview not available</p>
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center h-full space-y-4">
        <File className="w-20 h-20 text-gray-400" />
        <div className="text-center">
          <p className="text-lg font-medium">{file.name}</p>
          <p className="text-sm text-gray-500">Unsupported Preview</p>
        </div>
      </div>
    );
  };
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Document Upload</h1>
        <div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="hidden"
          />
          <Button 
            onClick={handleButtonClick}
            className="bg-primary hover:bg-primary/90 text-black"
          >
            <Upload className="mr-2 h-4 w-4" />
            Select Documents
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left side - File list */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Files ({files.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {files.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No documents uploaded
              </div>
            ) : (
              <div className="space-y-2">
                {files.map((file, index) => (
                  <div
                    key={file.id}
                    onClick={() => setCurrentIndex(index)}
                    className={`
                      flex items-center justify-between p-3 rounded-lg
                      ${index === currentIndex ? 'bg-primary/10 border-primary' : 'bg-gray-50 border-gray-200'}
                      ${file.error ? 'border-red-200 bg-red-50' : ''}
                      border cursor-pointer transition-all hover:shadow-sm
                    `}
                  >
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded ${file.bgColor} ${file.color}`}>
                        {file.icon}
                      </span>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium truncate max-w-[150px]">
                          {file.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(file.id);
                      }}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Right side - Preview */}
        <Card className="col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentIndex(i => Math.max(0, i - 1))}
                  disabled={currentIndex === 0 || files.length === 0}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm">
                  {files.length > 0 ? `${currentIndex + 1} of ${files.length}` : '0 of 0'}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentIndex(i => Math.min(files.length - 1, i + 1))}
                  disabled={currentIndex === files.length - 1 || files.length === 0}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <Button
                onClick={handleUpload}
                disabled={uploading || files.length === 0}
              >
                {uploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  'Upload All'
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* {error && (
              <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg">
                {error}
              </div>
            )} */}
            <div className="h-[600px] rounded-lg border border-gray-200 bg-gray-50">
              {files.length > 0 ? (
                <FilePreview file={files[currentIndex]} />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  No document selected for preview
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DocumentUploader;