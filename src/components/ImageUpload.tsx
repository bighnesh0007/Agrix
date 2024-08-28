'use client';

import React, { useState, useRef } from "react";
import { Upload, Camera, Link as LinkIcon } from "lucide-react";

interface ImageUploadProps {
  onUpload: (file: File) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0]);
    }
  };

  const handleCameraCapture = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (cameraInputRef.current) {
      cameraInputRef.current.click();
    }
  };

  const handleCameraFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0]);
    }
  };

  const handleUrlUpload = () => {
    const url = prompt("Enter the URL of the image:");
    if (url) {
      fetch(url)
        .then(response => response.blob())
        .then(blob => {
          const file = new File([blob], "image_from_url", { type: blob.type });
          onUpload(file);
        })
        .catch(error => {
          console.error("Error fetching image from URL:", error);
          alert("Failed to fetch image from URL. Please try again.");
        });
    }
  };

  return (
    <div
      className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer ${
        dragActive ? "border-green-500 bg-green-50" : "border-gray-300"
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <Upload className="w-12 h-12 text-gray-400" />
      <p className="mt-2 text-sm text-gray-600">Drag and drop or click to upload an image</p>
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleFileChange}
        accept="image/*"
      />
      <div className="flex mt-4 space-x-4">
        <button
          onClick={handleCameraCapture}
          className="z-20 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Camera className="w-4 h-4 mr-2 inline-block" />
          Use Camera
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleUrlUpload();
          }}
          className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          <LinkIcon className="w-4 h-4 mr-2 inline-block" />
          Upload from URL
        </button>
      </div>
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleCameraFileSelect}
      />
    </div>
  );
};

export default ImageUpload;