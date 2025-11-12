import IconButton from "./IconButton";
import { FaTimes } from "react-icons/fa";
import './CloseButton.css';

export interface CloseButtonProps {
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  icon?: React.ReactNode;
  disabled?: boolean;
  title?: string;
  ariaLabel?: string;
}



const CloseButton: React.FC<CloseButtonProps> = ({
  className,
  id,
  style,
  onClick,
  icon = <FaTimes />,
  disabled,
  title = "Close",
  ariaLabel,
}) => (
  <IconButton
    className={`close-button ${className || ''}`}
    id={id}
    style={style}
    onClick={onClick}
    disabled={disabled}
    title={title}
    icon={icon}
    ariaLabel={ariaLabel || title}
  />
);

export default CloseButton;
