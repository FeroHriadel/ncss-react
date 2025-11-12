import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import './Checkbox.css';

export interface CheckboxProps {
  checked?: boolean;
  disabled?: boolean;
  label?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  id?: string;
  name?: string;
}

export interface CheckboxHandle {
  getChecked: () => boolean;
  setChecked: (checked: boolean) => void;
}

const Checkbox = forwardRef<CheckboxHandle, CheckboxProps>(function Checkbox(
  {
    checked: controlledChecked,
    disabled = false,
    label,
    onChange,
    className = '',
    id,
    name,
  },
  ref
) {
  const [internalChecked, setInternalChecked] = useState(controlledChecked ?? false);
  const isControlled = controlledChecked !== undefined;
  const isChecked = isControlled ? controlledChecked : internalChecked;

  if (!id) id = `ncss-checkbox-${Math.random().toString(10)}`;

  useImperativeHandle(ref, () => ({
    getChecked: () => isChecked,
    setChecked: (checked: boolean) => {
      if (!isControlled) {
        setInternalChecked(checked);
      }
      // Create a synthetic event for the imperative handle
      if (onChange) {
        const syntheticEvent = {
          target: { checked },
          currentTarget: { checked },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(syntheticEvent);
      }
    },
  }), [isChecked, isControlled, onChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = e.target.checked;
    if (!isControlled) {
      setInternalChecked(newChecked);
    }
    onChange?.(e);
  };

  return (
    <div className={`checkbox-container ${className}`}>
      <span className="checkbox-wrapper">
        <input
          type="checkbox"
          id={id}
          name={name}
          checked={isChecked}
          disabled={disabled}
          onChange={handleChange}
          className="checkbox-input"
        />
        <span
          className={`checkbox-visual ${
            disabled ? 'checkbox-visual-disabled' : 'checkbox-visual-cursor-pointer'
          } ${
            isChecked 
              ? 'checkbox-visual-checked' 
              : ''
          }`}
        >
          {isChecked && (
            <FaCheck className="checkbox-check-icon" size={12} />
          )}
        </span>
      </span>
      {label && (
        <label
          htmlFor={id}
          className={`checkbox-label ${
            disabled ? 'checkbox-label-disabled' : ''
          }`}
        >
          {label}
        </label>
      )}
    </div>
  );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;
