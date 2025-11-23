import React, { useState, forwardRef, useImperativeHandle, useCallback, useRef } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './Password.css';

export interface PasswordProps {
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
  title?: string;
  autoComplete?: string;
  validate?: boolean;
  canShowPassword?: boolean;
  minLength?: number;
  requireNumber?: boolean;
  requireSpecialCharacter?: boolean;
  requireUpperCase?: boolean;
}

export interface PasswordHandle {
  validate: () => string;
  getValue: () => string;
  setValue: (val: string) => void;
  clear: () => void;
}

const Password = forwardRef<PasswordHandle, PasswordProps>(function Password(
  {
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
    canShowPassword = false,
    minLength,
    requireNumber = false,
    requireSpecialCharacter = false,
    requireUpperCase = false,
  },
  ref
) {
  const [showPassword, setShowPassword] = useState(false);
  const [internalError, setInternalError] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const id = providedId || `ncss-password-${Math.random().toString(10)}`;

  const validatePassword = useCallback((): string => {
    // Get value from either props (controlled) or input element (uncontrolled)
    const passwordValue = value !== undefined ? value : (inputRef.current?.value || '');
    
    // Check if password is required and empty
    if (required && !passwordValue.trim()) {
      return 'Password is required';
    }

    if (!passwordValue.trim()) {
      return 'No password entered';
    }

    if (minLength && passwordValue.length < minLength) {
      return `Password must be at least ${minLength} characters long`;
    }

    if (requireNumber && !/\d/.test(passwordValue)) {
      return 'Password must contain at least one number';
    }

    if (requireSpecialCharacter && !/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(passwordValue)) {
      return 'Password must contain at least one special character';
    }

    if (requireUpperCase && !/[A-Z]/.test(passwordValue)) {
      return 'Password must contain at least one uppercase letter';
    }

    return '';
  }, [value, required, minLength, requireNumber, requireSpecialCharacter, requireUpperCase]);

  const handleBlur = () => {
    if (validate) {
      const error = validatePassword();
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
    validate: validatePassword,
    getValue: () => { return value !== undefined ? value : (inputRef.current?.value || ''); },
    setValue: (val: string) => { if (inputRef?.current) inputRef.current.value = val; },
    clear: () => { if (inputRef?.current) inputRef.current.value = ''; },
  }), [validatePassword, value]);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Determine which error to display: parent's errorMessage takes precedence
  const displayError = errorMessage || (validate ? internalError : '');

  return (
    <div className={`password-wrapper ${className}`} style={style}>
      {label && (
        <label htmlFor={id} className="password-label">
          {label}
          {required && <span className="password-required-mark">*</span>}
        </label>
      )}
      
      <div className="password-field-wrapper">
        <input
          ref={inputRef}
          type={showPassword ? 'text' : 'password'}
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
          className={`password-field ${canShowPassword ? 'password-with-toggle' : ''} ${disabled ? 'password-field-disabled' : ''}`}
          style={width ? { width } : undefined}
        />
        
        {canShowPassword && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="password-toggle-button"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            disabled={disabled}
            tabIndex={-1}
          >
            {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
          </button>
        )}

        {displayError && (
          <p className='password-error-message'>
            {displayError}
          </p>
        )}
        {message && !displayError && (
          <p className='password-message'>
            {message}
          </p>
        )}
      </div>
    </div>
  );
});

export default Password;
