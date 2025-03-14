import React, { useRef } from 'react';
import { Upload, X } from 'lucide-react';
import Button from '../Button';

interface FileUploadButtonProps {
  onChange: (file: File) => void;
  onClear?: () => void;
  accept?: string;
  currentFile?: File | null;
  currentUrl?: string;
  label?: string;
  loading?: boolean;
  error?: string;
  className?: string;
}

const FileUploadButton: React.FC<FileUploadButtonProps> = ({
  onChange,
  onClear,
  accept = 'image/*',
  currentFile,
  currentUrl,
  label = 'Choisir un fichier',
  loading = false,
  error,
  className = ''
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(file);
    }
  };

  return (
    <div className={className}>
      <div className="flex items-center space-x-4">
        {(currentFile || currentUrl) && (
          <div className="relative h-32 w-48 rounded-lg overflow-hidden bg-gray-100">
            <img
              src={currentFile ? URL.createObjectURL(currentFile) : currentUrl}
              alt="Aperçu"
              className="h-full w-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://via.placeholder.com/800x400?text=Image+non+disponible';
              }}
            />
            {onClear && (
              <button
                type="button"
                onClick={onClear}
                className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
              >
                <X className="h-4 w-4 text-gray-600" />
              </button>
            )}
          </div>
        )}
        
        <div className="flex-1">
          <Button
            onClick={handleClick}
            loading={loading}
            variant="secondary"
            icon={<Upload className="h-4 w-4" />}
          >
            {label}
          </Button>
          
          {currentFile && (
            <p className="mt-2 text-sm text-gray-500">
              {currentFile.name}
            </p>
          )}
          
          {error && (
            <p className="mt-2 text-sm text-red-600">
              {error}
            </p>
          )}
        </div>
      </div>
      
      <input
        ref={inputRef}
        type="file"
        onChange={handleChange}
        accept={accept}
        className="hidden"
      />
    </div>
  );
};

export default FileUploadButton;