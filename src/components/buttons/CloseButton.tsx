import IconButton from "./IconButton";
import { FaTimes } from "react-icons/fa";



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
    className={'text-red-900 ' + (className ? className : '')}
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
