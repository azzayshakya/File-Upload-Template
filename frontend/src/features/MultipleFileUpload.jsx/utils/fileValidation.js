import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from '../constants/fileConstants';

export const validateFile = (file) => {
  if (!ALLOWED_FILE_TYPES[file.type]) {
    return {
      valid: false,
      error: 'File type not supported'
    };
  }

  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: 'File size exceeds 10MB limit'
    };
  }

  return { valid: true };
};

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};