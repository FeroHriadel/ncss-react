import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import CloseButton from '../buttons/CloseButton';
import './FileUpload.css';

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
    <div className={`fileupload-wrapper ${className}`} style={width ? { width } : {}}>
      {label && (
        <label htmlFor={id} className="fileupload-label">
          {label}
        </label>
      )}
      <div className="fileupload-container">
        <div
          className={`fileupload-inner ${disabled ? 'fileupload-disabled' : ''}`}
          style={style}
        >
          <input
            ref={inputRef}
            type="file"
            id={id}
            className="fileupload-input"
            onChange={handleFileChange}
            disabled={disabled}
            accept={acceptString}
            multiple={!max || max > 1}
          />
          <button
            type="button"
            onClick={handleButtonClick}
            disabled={disabled}
            className={`fileupload-button ${disabled ? 'fileupload-button-disabled' : ''}`}
          >
            Upload Files
          </button>
          <span className="fileupload-text">
            {getFileText()}
          </span>
          {files.length > 0 && !disabled && (
            <div className="fileupload-clear">
              <CloseButton onClick={handleClear} title="Clear files" />
            </div>
          )}
        </div>
        {errorMessage && (
          <span className="fileupload-error-message">
            {errorMessage}
          </span>
        )}
        {message && (
          <span className="fileupload-message">
            {message}
          </span>
        )}
      </div>
    </div>
  );
});

FileUpload.displayName = 'FileUpload';

export default FileUpload;
