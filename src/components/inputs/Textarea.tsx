import React, { forwardRef, useImperativeHandle, useCallback, useRef, useState } from 'react';
import './Textarea.css';

export interface TextareaProps {
  name?: string;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  placeholder?: string;
  label?: string;
  errorMessage?: string;
  message?: string;
  width?: string;
  height?: string;
  rows?: number;
  disabled?: boolean;
  required?: boolean;
  title?: string;
  autoComplete?: string;
  validate?: boolean;
}

export interface TextareaHandle {
  validate: () => string;
  getValue: () => string;
  setValue: (val: string) => void;
  clear: () => void;
}

const Textarea = forwardRef<TextareaHandle, TextareaProps>((props, ref) => {
  const {
    name,
    className = '',
    id: providedId,
    style,
    value,
    onChange,
    placeholder,
    label,
    errorMessage = '',
    message,
    width,
    height,
    rows = 4,
    disabled = false,
    required = false,
    title,
    autoComplete,
    validate = false,
  } = props;
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [internalError, setInternalError] = useState<string>('');

  const id = providedId || `ncss-textarea-${Math.random().toString(10)}`;

  const validateTextarea = useCallback((): string => {
    let textareaError: string = '';
    // Get value from either props (controlled) or textarea element (uncontrolled)
    const textareaValue = value !== undefined ? value : (textareaRef.current?.value || '');
    // Check if textarea is required and empty
    if (required && !textareaValue.trim()) {
      textareaError = 'This field is required';
      return textareaError;
    }
    return textareaError;
  }, [value, required]);

  const handleBlur = () => {
    if (validate) {
      const error = validateTextarea();
      setInternalError(error);
    }
  };

  const handleFocus = () => {
    if (validate) {
      setInternalError('');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    if (onChange) {
      onChange(e);
    }
  };

  useImperativeHandle(ref, () => ({
    validate: validateTextarea,
    getValue: () => { return value !== undefined ? value : (textareaRef.current?.value || ''); },
    setValue: (val: string) => { if (textareaRef?.current) textareaRef.current.value = val; },
    clear: () => { if (textareaRef?.current) textareaRef.current.value = ''; },
  }), [validateTextarea, value]);

  // Determine which error to display: parent's errorMessage takes precedence
  const displayError = errorMessage || (validate ? internalError : '');

  return (
    <div className={`textarea-wrapper ${className}`} style={{ ...style, ...(width ? { width } : {}) }}>
      {label && (
        <label htmlFor={id} className="textarea-label">
          {label}
          {required && <span className="textarea-required">*</span>}
        </label>
      )}
      <div className="textarea-container" style={width ? { width } : undefined}>
        <textarea
          ref={textareaRef}
          name={name}
          id={id}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          title={title}
          autoComplete={autoComplete}
          rows={rows}
          className={`textarea-field ${disabled ? 'textarea-disabled' : ''}`}
          style={height ? { height } : undefined}
        />
        {displayError && (
          <p className='textarea-error-message'>
            {displayError}
          </p>
        )}
        {message && !displayError && (
          <p className='textarea-message'>
            {message}
          </p>
        )}
      </div>
    </div>
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;
