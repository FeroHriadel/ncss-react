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
}



const CloseButton: React.FC<CloseButtonProps> = ({
  className,
  id,
  style,
  onClick,
  icon = <FaTimes />,
  disabled,
  title,
}) => (
  <IconButton
    className={'text-red-900 ' + (className ? className : '')}
    id={id}
    style={style}
    onClick={onClick}
    disabled={disabled}
    title={title}
    icon={icon}
  />
);

export default CloseButton;
