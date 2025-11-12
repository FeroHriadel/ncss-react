import React, { forwardRef, useImperativeHandle, useCallback } from 'react';
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
          className="email-label"
        >
          {label}
          {required && <span className="email-required-mark">*</span>}
        </label>
      )}
      <div className="email-field-wrapper">
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
          className={`email-field ${disabled ? 'email-field-disabled' : ''}`}
          style={width ? { width } : undefined}
        />
        {errorMessage && (
          <p className='email-error-message'>
            {errorMessage}
          </p>
        )}
        {message && !errorMessage && (
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
