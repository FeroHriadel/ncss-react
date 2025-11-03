import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import CloseButton from '../buttons/CloseButton';

export interface FileUploadProps {
  disabled?: boolean;
  onChange?: (files: File[]) => void;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  label?: string;
  message?: string;
  errorMessage?: string;
  accept?: string[];
  max?: number;
  width?: string;
}

export interface FileUploadHandle {
  clear: () => void;
  getFiles: () => File[];
}

const FileUpload = forwardRef<FileUploadHandle, FileUploadProps>(function FileUpload(
  {
    disabled = false,
    onChange,
    className = '',
    style,
    id,
    label,
    message,
    errorMessage,
    accept = ['*'],
    max,
    width,
  },
  ref
) {
  const [files, setFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  if (!id) id = `ncss-fileupload-${Math.random().toString(10)}`;

  useImperativeHandle(ref, () => ({
    clear: () => {
      setFiles([]);
      if (inputRef.current) {
        inputRef.current.value = '';
      }
      onChange?.([]);
    },
    getFiles: () => files,
  }), [files, onChange]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const limitedFiles = max ? selectedFiles.slice(0, max) : selectedFiles;
    setFiles(limitedFiles);
    onChange?.(limitedFiles);
  };

  const handleClear = () => {
    setFiles([]);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    onChange?.([]);
  };

  const handleButtonClick = () => {
    if (!disabled) {
      inputRef.current?.click();
    }
  };

  const getFileText = () => {
    if (files.length === 0) return 'No files';
    if (files.length === 1) return '1 file';
    return `${files.length} files`;
  };

  const acceptString = accept.join(',');

  return (
    <div className={`w-full ${className}`} style={width ? { width } : {}}>
      {label && (
        <label htmlFor={id} className="mb-2 text-sm text-gray-600">
          {label}
        </label>
      )}
      <div className="relative">
        <div
          className={`flex items-center border border-gray-300 rounded-md bg-gray-100 hover:bg-gray-200 focus-within:bg-gray-200 w-full h-10 overflow-hidden ${
            disabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          style={style}
        >
          <input
            ref={inputRef}
            type="file"
            id={id}
            className="hidden"
            onChange={handleFileChange}
            disabled={disabled}
            accept={acceptString}
            multiple={!max || max > 1}
          />
          <button
            type="button"
            onClick={handleButtonClick}
            disabled={disabled}
            className={`h-full px-3 text-sm font-medium text-white bg-gray-800 hover:bg-gray-950 focus:bg-gray-950 border-r border-gray-300 transition-colors ${
              disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            }`}
          >
            Upload Files
          </button>
          <span className="flex-1 px-3 text-sm text-gray-700 truncate">
            {getFileText()}
          </span>
          {files.length > 0 && !disabled && (
            <div className="pr-2">
              <CloseButton onClick={handleClear} title="Clear files" />
            </div>
          )}
        </div>
        {errorMessage && (
          <span className="text-xs text-red-900 absolute left-0 top-full translate-y-1">
            {errorMessage}
          </span>
        )}
        {message && (
          <span className="text-xs text-gray-600 absolute left-0 top-full translate-y-1">
            {message}
          </span>
        )}
      </div>
    </div>
  );
});

FileUpload.displayName = 'FileUpload';

export default FileUpload;
