import React, { useRef } from 'react';
// import { FileUploadProvider } from '../../context/FileUploadContext';
// import { FileUploaderHeader } from './FileUploaderHeader';
// import { FileList } from './FileList';
// import { FilePreview } from './FilePreview';
// import { DragDropZone } from './DragDropZone';
// import { useFileUpload } from '../../hooks/useFileUpload';
import toast from 'react-hot-toast';
import { FileUploadProvider } from '../constants/fileConstants';
import { FileUploaderHeader } from './FileUploaderHeader';
import { FileList } from './FileList';
import { FilePreview } from './FilePreview';
import { DragDropZone } from './DragDropZone';

const FileUploader = () => {
  const fileInputRef = useRef(null);
  const { handleFileSelect, isUploading } = useFileUpload();

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <FileUploadProvider>
      <div className="w-full max-w-6xl mx-auto bg-white rounded-lg shadow-lg">
        <FileUploaderHeader onUploadClick={handleUploadClick} disabled={isUploading} />
        <div className="flex h-[600px]">
          <FileList />
          <FilePreview />
        </div>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          multiple
          onChange={handleFileSelect}
          accept=".pdf,.doc,.docx,.txt,.rtf,.png,.jpg,.jpeg,.xls,.xlsx,.csv,.zip"
        />
        <DragDropZone />
      </div>
    </FileUploadProvider>
  );
};

export default FileUploader;