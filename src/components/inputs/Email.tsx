import React, { forwardRef, useImperativeHandle, useCallback, useRef, useState } from 'react';
import './Email.css';

export interface EmailProps {
  name?: string;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  label?: string;
  errorMessage?: string;
  message?: string;
  width?: string;
  disabled?: boolean;
  required?: boolean;
  autoComplete?: string;
  validate?: boolean;
}

export interface EmailHandle {
  validate: () => string;
  getValue: () => string;
  setValue: (val: string) => void;
  clear: () => void;
}

const Email = forwardRef<EmailHandle, EmailProps>((props, ref) => {
  const {
    name,
    className = '',
    id,
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
    autoComplete,
    validate = false,
  } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const [internalError, setInternalError] = useState<string>('');

  const validateEmail = useCallback((): string => {
    let emailError: string = '';
    // Get value from either props (controlled) or input element (uncontrolled)
    const emailValue = value !== undefined ? value : (inputRef.current?.value || '');
    // Check if email is required and empty
    if (required && !emailValue.trim()) {
      emailError = 'Email is required';
      return emailError;
    }
    // If not required and empty, it's valid
    if (!emailValue.trim()) {
      return emailError;
    }
    // Email regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
      emailError = 'Please enter a valid email address';
    }
    return emailError;
  }, [value, required]);

  const handleBlur = () => {
    if (validate) {
      const error = validateEmail();
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
  }

  useImperativeHandle(ref, () => ({
    validate: validateEmail,
    getValue: () => { return value !== undefined ? value : (inputRef.current?.value || ''); },
    setValue: (val: string) => { if (inputRef?.current) inputRef.current.value = val; },
    clear: () => { if (inputRef?.current) inputRef.current.value = ''; },
  }), [validateEmail, value]);

  // Determine which error to display: parent's errorMessage takes precedence
  const displayError = errorMessage || (validate ? internalError : '');

  return (
    <div className={`email-wrapper ${className}`} style={style}>
      {label && (
        <label
          htmlFor={id}
          className="email-label"
        >
          {label}
          {required && <span className="email-required-mark">*</span>}
        </label>
      )}
      <div className="email-field-wrapper">
        <input
          ref={inputRef}
          type="email"
          name={name}
          id={id}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          autoComplete={autoComplete}
          className={`email-field ${disabled ? 'email-field-disabled' : ''}`}
          style={width ? { width } : undefined}
        />
        {displayError && (
          <p className='email-error-message'>
            {displayError}
          </p>
        )}
        {message && !displayError && (
          <p className='email-message'>
            {message}
          </p>
        )}
      </div>
    </div>
  );
});

Email.displayName = 'Email';

export default Email;
