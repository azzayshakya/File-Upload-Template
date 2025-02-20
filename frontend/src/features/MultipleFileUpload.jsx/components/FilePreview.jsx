import React, { useState } from 'react';
import { ZoomIn, ZoomOut, RotateCw, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { useFileUpload } from '../context/FileUploadContext';
import { Button } from "@/components/ui/button";
import { FileControls } from './FileControls';

export const FilePreview = () => {
  const { state } = useFileUpload();
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);

  const currentFile = state.files.find(f => f.id === state.currentPreview);

  if (!currentFile) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        No file selected
      </div>
    );
  }

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 50));
  const handleRotate = () => setRotation(prev => (prev + 90) % 360);

  return (
    <div className="flex-1 flex flex-col">
      <FileControls
        zoom={zoom}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onRotate={handleRotate}
        file={currentFile}
      />
      <div className="flex-1 p-4 flex items-center justify-center overflow-auto">
        {currentFile.type.startsWith('image/') ? (
          <img
            src={currentFile.url}
            alt={currentFile.name}
            style={{
              transform: `scale(${zoom/100}) rotate(${rotation}deg)`,
              transition: 'transform 0.3s ease'
            }}
            className="max-w-full max-h-full object-contain"
          />
        ) : (
          <iframe
            src={currentFile.url}
            title={currentFile.name}
            className="w-full h-full"
          />
        )}
      </div>
    </div>
  );
};