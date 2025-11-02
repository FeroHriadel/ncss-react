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
          style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontSize: '0.875rem',
            fontWeight: '500',
            color: '#374151',
          }}
        >
          {label}
          {required && <span style={{ marginLeft: '0.25rem' }}>*</span>}
        </label>
      )}
      <div style={{ position: 'relative' }}>
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
          style={{
            width: width,
            padding: '0.5rem 0.75rem',
            fontSize: '1rem',
            border: '1px solid #d1d5db',
            borderRadius: '0.375rem',
            outline: 'none',
            transition: 'border-color 0.2s',
            backgroundColor: disabled ? '#f3f4f6' : '#fff',
            cursor: disabled ? 'not-allowed' : 'text',
            opacity: disabled ? 0.5 : 1,
          }}
          onFocus={(e) => {
            if (!disabled) {
              e.target.style.borderColor = '#3b82f6';
            }
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#d1d5db';
          }}
        />
        {errorMessage && (
          <p
            className='absolute left-0 top-full translate-y-1 text-xs text-red-900'
          >
            {errorMessage}
          </p>
        )}
        {message && !errorMessage && (
          <p
            className='absolute left-0 top-full translate-y-1 text-xs text-gray-600'
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
});

Email.displayName = 'Email';

export default Email;
