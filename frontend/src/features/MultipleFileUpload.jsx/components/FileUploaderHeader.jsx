import React from 'react';
import { Upload, File } from 'lucide-react';
import { Button } from "@/components/ui/button";

export const FileUploaderHeader = ({ onUploadClick, disabled }) => {
  return (
    <div className="flex justify-between items-center p-6 border-b">
      <div className="flex items-center gap-3">
        <File className="w-8 h-8 text-primary" />
        <div>
          <h2 className="text-xl font-semibold">Upload Files</h2>
          <p className="text-sm text-gray-500">
            Upload your documents (PDF, DOC, DOCX, etc.)
          </p>
        </div>
      </div>
      <Button 
        onClick={onUploadClick}
        disabled={disabled}
        className="flex items-center gap-2"
      >
        <Upload className="w-4 h-4" />
        Upload Files
      </Button>
    </div>
  );
};