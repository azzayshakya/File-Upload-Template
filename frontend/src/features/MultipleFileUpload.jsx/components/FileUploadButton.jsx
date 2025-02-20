import React, { useRef } from 'react';
import { Upload } from 'lucide-react';
import { Button } from "@/components/ui/button";

export const FileUploadButton = ({ onUpload, disabled, multiple = true }) => {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      onUpload(files);
      // Reset input value to allow uploading the same file again
      e.target.value = '';
    }
  };

  return (
    <>
      <Button
        onClick={handleClick}
        disabled={disabled}
        className="flex items-center gap-2"
      >
        <Upload className="w-4 h-4" />
        Upload Files
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleChange}
        multiple={multiple}
        accept=".pdf,.doc,.docx,.txt,.rtf,.png,.jpg,.jpeg,.xls,.xlsx,.csv,.zip"
      />
    </>
  );
};