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