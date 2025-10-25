import React from "react";



export interface IconButtonProps {
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  icon: React.ReactNode;
  disabled?: boolean;
  title?: string;
}



const IconButton: React.FC<IconButtonProps> = ({
  className,
  id,
  style,
  onClick,
  icon,
  disabled,
  title,
}) => (
  <button
    type="button"
    className={className}
    id={id}
    style={style}
    onClick={onClick}
    disabled={disabled}
    title={title}
  >
    {icon}
  </button>
);

export default IconButton;
