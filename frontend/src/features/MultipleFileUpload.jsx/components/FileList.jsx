import React from 'react';
import { Trash2, AlertCircle } from 'lucide-react';
import { useFileUpload } from '../context/FileUploadContext';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { formatFileSize } from '../utils/fileValidation';

export const FileList = () => {
  const { state, dispatch } = useFileUpload();

  const handleDelete = async (id) => {
    try {
      const file = state.files.find(f => f.id === id);
      if (file.publicId) {
        await fetch(`/api/file/${file.publicId}`, { method: 'DELETE' });
      }
      dispatch({ type: 'REMOVE_FILE', payload: id });
      toast.success('File deleted successfully');
    } catch (error) {
      toast.error('Failed to delete file');
    }
  };

  return (
    <div className="w-1/3 border-r overflow-y-auto">
      {state.files.map((file) => (
        <div
          key={file.id}
          className="p-4 border-b hover:bg-gray-50 transition-colors"
          onClick={() => dispatch({ type: 'SET_PREVIEW', payload: file.id })}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1 mr-2">
              <p className="font-medium truncate">{file.name}</p>
              <p className="text-sm text-gray-500">
                {formatFileSize(file.size)}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(file.id);
              }}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
          {file.status === 'uploading' && (
            <Progress value={file.progress} className="mt-2" />
          )}
          {file.status === 'error' && (
            <div className="flex items-center gap-1 text-red-500 mt-2 text-sm">
              <AlertCircle className="w-4 h-4" />
              {file.error}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};