import React, { forwardRef, useImperativeHandle, useRef, useState, useCallback } from 'react';
import CloseButton from '../buttons/CloseButton';
import './FileUpload.css';

export interface FileUploadProps {
  name?: string;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  files?: File[];
  onChange?: (files: File[]) => void;
  label?: string;
  errorMessage?: string;
  message?: string;
  width?: string;
  disabled?: boolean;
  required?: boolean;
  accept?: string[];
  max?: number;
  validate?: boolean;
}

export interface FileUploadHandle {
  validate: () => string;
  getValue: () => File[];
  setValue: (files: File[]) => void;
  clear: () => void;
}

const FileUpload = forwardRef<FileUploadHandle, FileUploadProps>(function FileUpload(
  {
    name = 'uploaded-files',
    className = '',
    id,
    style,
    files: controlledFiles,
    onChange,
    label,
    errorMessage = '',
    message,
    width = '260px',
    disabled = false,
    required = false,
    accept = ['*'],
    max,
    validate = false,
  },
  ref
) {
  const [internalFiles, setInternalFiles] = useState<File[]>([]);
  const [internalError, setInternalError] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Support both controlled and uncontrolled modes
  const isControlled = controlledFiles !== undefined;
  const files = isControlled ? controlledFiles : internalFiles;

  if (!id) id = `ncss-fileupload-${Math.random().toString(10)}`;

  const validateFiles = useCallback((): string => {
    if (required && files.length === 0) {
      return 'At least one file is required';
    }
    return '';
  }, [required, files]);

  useImperativeHandle(ref, () => ({
    validate: validateFiles,
    getValue: () => files,
    setValue: (newFiles: File[]) => {
      if (!isControlled) {
        setInternalFiles(newFiles);
      }
      // Note: Cannot programmatically set files on file input for security reasons
    },
    clear: () => {
      if (!isControlled) {
        setInternalFiles([]);
      }
      if (inputRef.current) {
        inputRef.current.value = '';
      }
      onChange?.([]);
    },
  }), [files, isControlled, onChange, validateFiles]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const limitedFiles = max ? selectedFiles.slice(0, max) : selectedFiles;
    
    if (!isControlled) {
      setInternalFiles(limitedFiles);
    }
    onChange?.(limitedFiles);
  };

  const handleBlur = () => {
    if (validate) {
      const error = validateFiles();
      setInternalError(error);
    }
  };

  const handleFocus = () => {
    if (validate) {
      setInternalError('');
    }
  };

  const handleClear = () => {
    if (!isControlled) {
      setInternalFiles([]);
    }
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
  const displayError = errorMessage || (validate ? internalError : '');

  return (
    <div className={`fileupload-wrapper ${className}`} style={style}>
      {label && (
        <label htmlFor={id} className="fileupload-label">
          {label}
          {required && <span className="fileupload-required-mark">*</span>}
        </label>
      )}
      <div className="fileupload-field-wrapper">
        <div
          className={`fileupload-field ${disabled ? 'fileupload-field-disabled' : ''}`}
          style={width ? { width } : undefined}
        >
          <input
            ref={inputRef}
            type="file"
            name={name}
            id={id}
            className="fileupload-input"
            onChange={handleFileChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            disabled={disabled}
            required={required}
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
        {displayError && (
          <p className="fileupload-error-message">
            {displayError}
          </p>
        )}
        {message && !displayError && (
          <p className="fileupload-message">
            {message}
          </p>
        )}
      </div>
    </div>
  );
});

FileUpload.displayName = 'FileUpload';

export default FileUpload;
