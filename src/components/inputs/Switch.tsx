import React, { forwardRef, useImperativeHandle, useState } from 'react';

export interface SwitchProps {
  checked?: boolean;
  disabled?: boolean;
  label?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  id?: string;
  name?: string;
  width?: string;
  height?: string;
}

export interface SwitchHandle {
  getChecked: () => boolean;
  setChecked: (checked: boolean) => void;
}

const Switch = forwardRef<SwitchHandle, SwitchProps>(function Switch(
  {
    checked: controlledChecked,
    disabled = false,
    label,
    onChange,
    className = '',
    id,
    name,
    width,
    height,
  },
  ref
) {
  const [internalChecked, setInternalChecked] = useState(controlledChecked ?? false);
  const isControlled = controlledChecked !== undefined;
  const isChecked = isControlled ? controlledChecked : internalChecked;

  if (!id) id = `ncss-switch-${Math.random().toString(10)}`;

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

  // Calculate thumb position based on switch dimensions
  const switchWidth = width || '44px';
  const switchHeight = height || '24px';
  const thumbSize = height ? `calc(${height} - 6px)` : '18px';
  const uncheckedPosition = '4px';
  const checkedPosition = width 
    ? `calc(${width} - ${thumbSize} - 4px)` 
    : 'calc(44px - 18px - 4px)'; // 22px for default

  return (
    <div className={`flex items-center ${className}`}>
      <span className="relative inline-block" style={{ width, height }}>
        <input
          type="checkbox"
          id={id}
          name={name}
          checked={isChecked}
          disabled={disabled}
          onChange={handleChange}
          className="opacity-0 absolute cursor-pointer disabled:cursor-not-allowed z-10"
          style={{ width: switchWidth, height: switchHeight }}
        />
        <span
          className={`relative flex items-center rounded-full transition-colors pointer-events-none ${
            disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
          } ${
            isChecked 
              ? 'bg-gray-800 hover:bg-gray-950 focus:bg-gray-950' 
              : 'bg-gray-500'
          }`}
          style={{ width: switchWidth, height: switchHeight }}
        >
          <span
            className="absolute bg-gray-100 rounded-full transition-transform duration-200 ease-in-out"
            style={{ 
              width: thumbSize, 
              height: thumbSize,
              left: isChecked ? checkedPosition : uncheckedPosition
            }}
          />
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

Switch.displayName = 'Switch';

export default Switch;
