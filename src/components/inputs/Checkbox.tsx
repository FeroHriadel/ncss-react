import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { FaCheck } from 'react-icons/fa';

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
    <div className={`flex items-center ${className}`}>
      <span className="relative inline-block">
        <input
          type="checkbox"
          id={id}
          name={name}
          checked={isChecked}
          disabled={disabled}
          onChange={handleChange}
          className="opacity-0 absolute w-5 h-5 cursor-pointer disabled:cursor-not-allowed"
        />
        <span
          className={`flex items-center justify-center w-5 h-5 rounded border transition-colors ${
            disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
          } ${
            isChecked 
              ? 'bg-gray-800 border-gray-800 hover:bg-gray-950 focus:bg-gray-950' 
              : 'border-gray-800'
          }`}
        >
          {isChecked && (
            <FaCheck className="text-white" size={12} />
          )}
        </span>
      </span>
      {label && (
        <label
          htmlFor={id}
          className={`ml-2 text-sm text-gray-700 select-none ${
            disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
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
