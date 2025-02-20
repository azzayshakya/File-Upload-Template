import { useState, useCallback } from 'react';
import { useFileUploadContext } from '../context/FileUploadContext';
import { validateFile } from '../utils/fileValidation';
import { MAX_FILES } from '../constants/fileConstants';
import toast from 'react-hot-toast';
import axios from 'axios';

export const useFileUpload = () => {
  const { state, dispatch } = useFileUploadContext();
  const [isUploading, setIsUploading] = useState(false);

  const uploadToServer = async (file, onProgress) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/api/upload', formData, {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(progress);
        },
      });

      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Upload failed');
    }
  };

  const handleUpload = useCallback(async (files) => {
    if (state.files.length + files.length > MAX_FILES) {
      toast.error(`Maximum ${MAX_FILES} files allowed`);
      return;
    }

    setIsUploading(true);

    for (const file of files) {
      const { valid, error } = validateFile(file);
      
      if (!valid) {
        toast.error(`${file.name}: ${error}`);
        continue;
      }

      const fileId = Date.now() + Math.random().toString(36);
      
      dispatch({
        type: 'ADD_FILE',
        payload: {
          id: fileId,
          file,
          name: file.name,
          size: file.size,
          type: file.type,
          status: 'uploading',
          progress: 0
        }
      });

      try {
        const uploadedFile = await uploadToServer(file, (progress) => {
          dispatch({
            type: 'UPDATE_FILE',
            payload: {
              id: fileId,
              updates: { progress }
            }
          });
        });

        dispatch({
          type: 'UPDATE_FILE',
          payload: {
            id: fileId,
            updates: {
              status: 'complete',
              url: uploadedFile.url,
              publicId: uploadedFile.publicId
            }
          }
        });

        toast.success(`${file.name} uploaded successfully`);
      } catch (error) {
        dispatch({
          type: 'UPDATE_FILE',
          payload: {
            id: fileId,
            updates: {
              status: 'error',
              error: error.message
            }
          }
        });
        toast.error(`Failed to upload ${file.name}`);
      }
    }

    setIsUploading(false);
  }, [state.files.length, dispatch]);

  return {
    handleUpload,
    isUploading,
    files: state.files
  };
};
