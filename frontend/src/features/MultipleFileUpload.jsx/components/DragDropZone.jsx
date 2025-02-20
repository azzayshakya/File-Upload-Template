import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { useFileUpload } from '../context/FileUploadContext';

export const DragDropZone = () => {
  const [isDragging, setIsDragging] = useState(false);
  const { handleFileSelect } = useFileUpload();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = [...e.dataTransfer.files];
    handleFileSelect({ target: { files } });
  };

  return (
    <div
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      className={`p-8 border-2 border-dashed rounded-lg m-4 transition-colors ${
        isDragging ? 'border-primary bg-primary/5' : 'border-gray-300'
      }`}
    >
      <div className="flex flex-col items-center text-center">
        <Upload className="w-12 h-12 text-gray-400 mb-4" />
        <p className="text-lg font-medium">Drag and drop your files here</p>
        <p className="text-sm text-gray-500 mt-1">
          or click the upload button above
        </p>
      </div>
    </div>
  );
};