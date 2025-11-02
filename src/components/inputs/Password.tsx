import React, { useState, forwardRef, useImperativeHandle, useCallback } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

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
    <div className={`w-full ${className || ''}`} style={width ? { width } : {}}>
      {label && <label htmlFor={id} className="mb-2 text-sm text-gray-600">{label}{required && <span className="ml-1">*</span>}</label>}
      
      <div className="relative w-full">
        <input
          type={showPassword ? 'text' : 'password'}
          name={name}
          className={`outline-none border border-gray-300 rounded-md text-md bg-gray-100 text-gray-700 hover:bg-gray-200 focus:bg-gray-200 placeholder:text-gray-600 placeholder:font-light placeholder:italic w-full h-10 indent-3 ${canShowPassword ? 'pr-10' : ''}`}
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
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800 focus:outline-none"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            disabled={disabled}
          >
            {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
          </button>
        )}

        {errorMessage && <span className="text-xs text-red-900 absolute left-0 top-full translate-y-1">{errorMessage}</span>}
        {message && <span className="text-xs text-gray-600 absolute left-0 top-full translate-y-1">{message}</span>}
      </div>
    </div>
  );
});

export default Password;
