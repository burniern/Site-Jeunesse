import React from 'react';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  accept?: string;
  currentFile?: File | null;
  currentUrl?: string;
  label?: string;
  error?: string;
  preview?: boolean;
  className?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onChange,
  accept = 'image/*',
  currentFile,
  currentUrl,
  label = 'Choisir un fichier',
  error,
  preview = true,
  className = ''
}) => {
  const inputId = React.useId();
  const hasFile = currentFile || currentUrl;
  const previewUrl = currentFile ? URL.createObjectURL(currentFile) : currentUrl;

  React.useEffect(() => {
    // Nettoyer l'URL de prévisualisation à la destruction du composant
    return () => {
      if (currentFile && previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [currentFile, previewUrl]);

  return (
    <div className={className}>
      <div className="flex items-center space-x-4">
        {preview && hasFile && (
          <div className="h-32 w-48 rounded-lg overflow-hidden bg-gray-100">
            <img
              src={previewUrl}
              alt="Aperçu"
              className="h-full w-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://via.placeholder.com/800x400?text=Image+non+disponible';
              }}
            />
          </div>
        )}
        <div className="flex-1">
          <button
            type="button"
            onClick={() => document.getElementById(inputId)?.click()}
            className="btn bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center"
          >
            <Upload className="h-4 w-4 mr-2" />
            {label}
          </button>
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
        type="file"
        id={inputId}
        onChange={onChange}
        accept={accept}
        className="hidden"
      />
    </div>
  );
};

export default FileUpload;