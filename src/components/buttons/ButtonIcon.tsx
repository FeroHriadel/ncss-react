import React from "react";


interface ButtonIconProps {
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  icon: React.ReactNode;
  disabled?: boolean;
  title?: string;
}


const ButtonIcon: React.FC<ButtonIconProps> = ({
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

export default ButtonIcon;
