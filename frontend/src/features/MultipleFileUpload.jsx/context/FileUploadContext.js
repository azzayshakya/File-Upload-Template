export const ALLOWED_FILE_TYPES = {
    'application/pdf': '.pdf',
    'application/msword': '.doc',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
    'text/plain': '.txt',
    'application/rtf': '.rtf',
    'image/png': '.png',
    'image/jpeg': '.jpg, .jpeg',
    'application/vnd.ms-excel': '.xls',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '.xlsx',
    'text/csv': '.csv',
    'application/zip': '.zip'
  };
  
  export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  export const MAX_FILES = 10;