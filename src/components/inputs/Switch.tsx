import React, { forwardRef, useImperativeHandle, useState } from 'react';
import './Switch.css';

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
    <div className={`switch-container ${className}`}>
      <span className="switch-wrapper" style={{ width, height }}>
        <input
          type="checkbox"
          id={id}
          name={name}
          checked={isChecked}
          disabled={disabled}
          onChange={handleChange}
          className="switch-input"
          style={{ width: switchWidth, height: switchHeight }}
        />
        <span
          className={`switch-track ${disabled ? 'switch-disabled' : ''} ${isChecked ? 'switch-checked' : 'switch-unchecked'}`}
          style={{ width: switchWidth, height: switchHeight }}
        >
          <span
            className="switch-thumb"
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
          className={`switch-label ${disabled ? 'switch-label-disabled' : ''}`}
        >
          {label}
        </label>
      )}
    </div>
  );
});

Switch.displayName = 'Switch';

export default Switch;
