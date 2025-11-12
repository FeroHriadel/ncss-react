import React, { useState, forwardRef, useImperativeHandle, useCallback } from 'react';
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
  disabled?: boolean;
  required?: boolean;
  title?: string;
  label?: string;
  width?: string;
  errorMessage?: string;
  message?: string;
  canShowPassword?: boolean;
  minLength?: number;
  requireNumber?: boolean;
  requireSpecialCharacter?: boolean;
  requireUpperCase?: boolean;
}

export interface PasswordHandle {
  validate: () => string[];
}

const Password = forwardRef<PasswordHandle, PasswordProps>(function Password(
  {
    name,
    className,
    id,
    style,
    value = '',
    onChange = () => {},
    placeholder,
    disabled,
    required,
    title,
    label,
    width,
    errorMessage,
    message,
    canShowPassword = false,
    minLength,
    requireNumber = false,
    requireSpecialCharacter = false,
    requireUpperCase = false,
  },
  ref
) {
  const [showPassword, setShowPassword] = useState(false);

  if (!id) id = `ncss-password-${Math.random().toString(10)}`;

  const validate = useCallback((): string[] => {
    const errors: string[] = [];
    const passwordValue = typeof value === 'string' ? value : '';

    if (minLength && passwordValue.length < minLength) {
      errors.push(`Password must be at least ${minLength} characters long`);
    }

    if (requireNumber && !/\d/.test(passwordValue)) {
      errors.push('Password must contain at least one number');
    }

    if (requireSpecialCharacter && !/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(passwordValue)) {
      errors.push('Password must contain at least one special character');
    }

    if (requireUpperCase && !/[A-Z]/.test(passwordValue)) {
      errors.push('Password must contain at least one uppercase letter');
    }

    return errors;
  }, [value, minLength, requireNumber, requireSpecialCharacter, requireUpperCase]);

  useImperativeHandle(ref, () => ({
    validate,
  }), [validate]);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className={`password-wrapper ${className || ''}`} style={width ? { width } : {}}>
      {label && <label htmlFor={id} className="password-label">{label}{required && <span className="password-required">*</span>}</label>}
      
      <div className="password-input-container">
        <input
          type={showPassword ? 'text' : 'password'}
          name={name}
          className={`password-field ${canShowPassword ? 'password-with-toggle' : ''}`}
          id={id}
          style={width ? { width, opacity: disabled ? 0.5 : 1, cursor: disabled ? 'not-allowed' : 'text', ...style } : { opacity: disabled ? 0.5 : 1, cursor: disabled ? 'not-allowed' : 'text', ...style }}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          title={title}
        />
        
        {canShowPassword && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="password-toggle-button"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            disabled={disabled}
          >
            {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
          </button>
        )}

        {errorMessage && <span className="password-error-message">{errorMessage}</span>}
        {message && <span className="password-message">{message}</span>}
      </div>
    </div>
  );
});

export default Password;
