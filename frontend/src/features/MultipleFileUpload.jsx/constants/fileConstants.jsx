import React, { createContext, useContext, useReducer } from 'react';
import toast from 'react-hot-toast';

const FileUploadContext = createContext();

const initialState = {
  files: [],
  currentPreview: null,
  isUploading: false
};

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_FILES':
      return {
        ...state,
        files: [...state.files, ...action.payload]
      };
    case 'UPDATE_FILE':
      return {
        ...state,
        files: state.files.map(file => 
          file.id === action.payload.id 
            ? { ...file, ...action.payload.updates }
            : file
        )
      };
    case 'REMOVE_FILE':
      return {
        ...state,
        files: state.files.filter(file => file.id !== action.payload),
        currentPreview: state.currentPreview === action.payload ? null : state.currentPreview
      };
    case 'SET_PREVIEW':
      return {
        ...state,
        currentPreview: action.payload
      };
    case 'SET_UPLOADING':
      return {
        ...state,
        isUploading: action.payload
      };
    default:
      return state;
  }
}

export function FileUploadProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <FileUploadContext.Provider value={{ state, dispatch }}>
      {children}
    </FileUploadContext.Provider>
  );
}

export function useFileUpload() {
  const context = useContext(FileUploadContext);
  if (!context) {
    throw new Error('useFileUpload must be used within a FileUploadProvider');
  }
  return context;
}