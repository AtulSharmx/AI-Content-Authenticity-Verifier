import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  selectedImage: File | null;
  onClear: () => void;
  disabled?: boolean;
}

export default function ImageUploader({
  onImageSelect,
  selectedImage,
  onClear,
  disabled = false,
}: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (disabled) return;

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleFile(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleFile = (file: File) => {
    onImageSelect(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleClear = () => {
    setPreview(null);
    onClear();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full">
      {!selectedImage ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !disabled && fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-200 ${
            isDragging
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <div className="flex flex-col items-center space-y-4">
            <div className="bg-blue-100 p-4 rounded-full">
              <Upload className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <p className="text-lg font-medium text-gray-900 mb-1">
                Drop your image here
              </p>
              <p className="text-sm text-gray-500">
                or click to browse (PNG, JPG, WEBP)
              </p>
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
            disabled={disabled}
          />
        </div>
      ) : (
        <div className="relative bg-white border-2 border-gray-200 rounded-xl overflow-hidden">
          <button
            onClick={handleClear}
            className="absolute top-4 right-4 z-10 bg-white hover:bg-gray-100 text-gray-700 p-2 rounded-full shadow-lg transition-all duration-200"
            disabled={disabled}
          >
            <X className="w-5 h-5" />
          </button>
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-auto max-h-96 object-contain"
            />
          ) : (
            <div className="flex items-center justify-center h-64 bg-gray-100">
              <ImageIcon className="w-16 h-16 text-gray-400" />
            </div>
          )}
          <div className="p-4 bg-gray-50 border-t border-gray-200">
            <p className="text-sm font-medium text-gray-900 truncate">
              {selectedImage.name}
            </p>
            <p className="text-xs text-gray-500">
              {(selectedImage.size / 1024).toFixed(2)} KB
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
