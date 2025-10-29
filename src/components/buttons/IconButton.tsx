import React from "react";



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
    className={`min-w-[${size}] min-h-[${size}] p-2 rounded flex items-center justify-center appearance-none outline-none border-none hover:bg-gray-100 active:bg-gray-200 focus:bg-gray-100 ${disabled ? 'opacity-50' : ''} ` + className}
    id={id}
    style={style}
    onClick={onClick}
    disabled={disabled}
    title={title}
    aria-label={ariaLabel || title}
    aria-pressed={ariaPressed}
    aria-expanded={ariaExpanded}
    aria-haspopup={ariaHaspopup}
    aria-disabled={disabled}
  >
    <span aria-hidden="true">{icon}</span>
  </button>
);

export default IconButton;
