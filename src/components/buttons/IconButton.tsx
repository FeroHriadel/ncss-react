import React from "react";
import './IconButton.css';

export interface IconButtonProps {
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  icon: React.ReactNode;
  disabled?: boolean;
  title?: string;
  size?: string;
  ariaLabel?: string;
  ariaPressed?: boolean;
  ariaExpanded?: boolean;
  ariaHaspopup?: 'true' | 'false' | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';
}



const IconButton: React.FC<IconButtonProps> = ({
  className,
  id,
  style,
  onClick,
  icon,
  disabled,
  title,
  size="35px",
  ariaLabel,
  ariaPressed,
  ariaExpanded,
  ariaHaspopup,
}) => (
  <button
    type="button"
    className={`icon-button ${disabled ? 'icon-button-disabled' : ''} ${className || ''}`}
    id={id}
    style={{ minWidth: size, minHeight: size, ...style }}
    onClick={onClick}
    disabled={disabled}
    title={title}
    aria-label={ariaLabel || title}
    aria-pressed={ariaPressed}
    aria-expanded={ariaExpanded}
    aria-haspopup={ariaHaspopup}
    aria-disabled={disabled}
  >
    <span className="icon-button-icon" aria-hidden="true">{icon}</span>
  </button>
);

export default IconButton;
