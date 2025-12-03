




import React, { forwardRef, useImperativeHandle, useCallback, useRef, useState } from 'react';
import './Input.css';

export interface InputProps {
  type?: 'text' | 'number' | 'tel' | 'url' | 'search';
  name?: string;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  value?: string | number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  label?: string;
  errorMessage?: string;
  message?: string;
  width?: string;
  disabled?: boolean;
  required?: boolean;
  title?: string;
  autoComplete?: string;
  validate?: boolean;
  defaultValue?: string | number;
  inputStyle?: React.CSSProperties;
  inputClassName?: string;
}

export interface InputHandle {
  validate: () => string;
  getValue: () => string | number;
  setValue: (val: string | number) => void;
  clear: () => void;
}

const Input = forwardRef<InputHandle, InputProps>((props, ref) => {
  const {
    type = 'text',
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
    width = '260px',
    disabled = false,
    required = false,
    title,
    autoComplete,
    validate = false,
    defaultValue,
    inputStyle,
    inputClassName
  } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const [internalError, setInternalError] = useState<string>('');

  const id = providedId || `ncss-input-${Math.random().toString(10)}`;

  const validateInput = useCallback((): string => {
    let inputError: string = '';
    // Get value from either props (controlled) or input element (uncontrolled)
    const inputValue = value !== undefined ? String(value) : (inputRef.current?.value || '');
    // Check if input is required and empty
    if (required && !inputValue.trim()) {
      inputError = 'This field is required';
      return inputError;
    }
    return inputError;
  }, [value, required]);

  const handleBlur = () => {
    if (validate) {
      const error = validateInput();
      setInternalError(error);
    }
  };

  const handleFocus = () => {
    if (validate) {
      setInternalError('');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (onChange) {
      onChange(e);
    }
  };

  useImperativeHandle(ref, () => ({
    validate: validateInput,
    getValue: () => { return value !== undefined ? value : (inputRef.current?.value || ''); },
    setValue: (val: string | number) => { if (inputRef?.current) inputRef.current.value = String(val); },
    clear: () => { if (inputRef?.current) inputRef.current.value = ''; },
  }), [validateInput, value]);

  // Determine which error to display: parent's errorMessage takes precedence
  const displayError = errorMessage || (validate ? internalError : '');

  return (
    <div className={`input-wrapper ${className}`} style={style}>
      {label && (
        <label
          htmlFor={id}
          className="input-label"
        >
          {label}
          {required && <span className="input-required-mark">*</span>}
        </label>
      )}
      <div className="input-field-wrapper">
        <input
          ref={inputRef}
          type={type}
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
          className={`input-field ${disabled ? 'input-field-disabled ' + inputClassName : inputClassName}`}
          style={{width: width ? width : undefined, ...inputStyle }}
          defaultValue={defaultValue}
        />
        {displayError && (
          <p className='input-error-message'>
            {displayError}
          </p>
        )}
        {message && !displayError && (
          <p className='input-message'>
            {message}
          </p>
        )}
      </div>
    </div>
  );
});

Input.displayName = 'Input';

export default Input;