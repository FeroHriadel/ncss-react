import React, { forwardRef, useImperativeHandle, useCallback } from 'react';

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
}

export interface EmailHandle {
  validate: () => string[];
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
    errorMessage,
    message,
    width = '300px',
    disabled = false,
    required = false,
    autoComplete,
  } = props;

  const validate = useCallback((): string[] => {
    const errors: string[] = [];
    const emailValue = typeof value === 'string' ? value : '';

    // Check if email is required and empty
    if (required && !emailValue.trim()) {
      errors.push('Email is required');
      return errors;
    }

    // If not required and empty, it's valid
    if (!emailValue.trim()) {
      return errors;
    }

    // Email regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(emailValue)) {
      errors.push('Please enter a valid email address');
    }

    return errors;
  }, [value, required]);

  useImperativeHandle(ref, () => ({
    validate,
  }), [validate]);

  return (
    <div className={className} style={style}>
      {label && (
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          {label}
          {required && <span className="ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          type="email"
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          autoComplete={autoComplete}
          className={`outline-none border border-gray-300 rounded-md text-base bg-white px-3 py-2 w-full transition-colors placeholder:text-gray-600 placeholder:font-light placeholder:italic ${
            disabled ? 'opacity-50 cursor-not-allowed bg-gray-50' : 'hover:bg-gray-50 focus:bg-gray-50 focus:border-blue-500'
          }`}
          style={width ? { width } : undefined}
        />
        {errorMessage && (
          <p className='absolute left-0 top-full translate-y-1 text-xs text-red-900'>
            {errorMessage}
          </p>
        )}
        {message && !errorMessage && (
          <p className='absolute left-0 top-full translate-y-1 text-xs text-gray-600'>
            {message}
          </p>
        )}
      </div>
    </div>
  );
});

Email.displayName = 'Email';

export default Email;
