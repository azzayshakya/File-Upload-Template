// client/src/utils/formatters.js
export const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
  };
  
  export const formatFileName = (name, maxLength = 20) => {
    if (name.length <= maxLength) return name;
    const extension = name.split('.').pop();
    const nameWithoutExt = name.substring(0, name.lastIndexOf('.'));
    return `${nameWithoutExt.substring(0, maxLength)}...${extension}`;
  };
  
  export const getFileIcon = (mimeType) => {
    switch (true) {
      case mimeType.includes('pdf'):
        return 'file-text';
      case mimeType.includes('image'):
        return 'image';
      case mimeType.includes('word'):
      case mimeType.includes('document'):
        return 'file-text';
      case mimeType.includes('sheet'):
      case mimeType.includes('excel'):
        return 'file-spreadsheet';
      case mimeType.includes('zip'):
        return 'file-archive';
      default:
        return 'file';
    }
  };
  
  // client/src/hooks/useFilePreview.js
  import { useState, useEffect } from 'react';
  
  export const useFilePreview = (file) => {
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      if (!file) {
        setPreview(null);
        setLoading(false);
        return;
      }
  
      setLoading(true);
      setError(null);
  
      const generatePreview = async () => {
        try {
          if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
              setPreview(reader.result);
              setLoading(false);
            };
            reader.onerror = () => {
              setError('Failed to generate preview');
              setLoading(false);
            };
            reader.readAsDataURL(file);
          } else if (file.type === 'application/pdf') {
            setPreview(URL.createObjectURL(file));
            setLoading(false);
          } else {
            setPreview(null);
            setLoading(false);
          }
        } catch (err) {
          setError('Failed to generate preview');
          setLoading(false);
        }
      };
  
      generatePreview();
  
      return () => {
        if (preview && !preview.startsWith('data:')) {
          URL.revokeObjectURL(preview);
        }
      };
    }, [file]);
  
    return { preview, loading, error };
  };
  