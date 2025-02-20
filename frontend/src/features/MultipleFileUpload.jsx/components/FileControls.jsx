import React from 'react';
import { ZoomIn, ZoomOut, RotateCw, Download } from 'lucide-react';
import { Button } from "@/components/ui/button";

export const FileControls = ({ zoom, onZoomIn, onZoomOut, onRotate, file }) => {
  return (
    <div className="p-4 border-b flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={onZoomOut}>
          <ZoomOut className="w-4 h-4" />
        </Button>
        <span className="min-w-[60px] text-center">{zoom}%</span>
        <Button variant="outline" size="sm" onClick={onZoomIn}>
          <ZoomIn className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={onRotate}>
          <RotateCw className="w-4 h-4" />
        </Button>
      </div>
      <a
        href={file.url}
        download={file.name}
        className="ml-auto"
      >
        <Button variant="outline" size="sm">
          <Download className="w-4 h-4 mr-2" />
          Download
        </Button>
      </a>
    </div>
  );
};
