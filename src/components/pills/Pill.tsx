import { FaTimes } from 'react-icons/fa';



export interface PillProps {
  children?: React.ReactNode;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLSpanElement>;
  onClose?: (params?: string | number | undefined | null | object | React.MouseEvent<HTMLSpanElement>) => void;
}



export default function Pill({ children, className, style, onClose, onClick = () => {} }: PillProps) {
  return (
    <span 
      className={`text-sm font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded inline-flex items-center ${className}`} 
      style={style}
      onClick={onClick}
    >
      {onClose && <FaTimes className='mr-2 cursor-pointer' onClick={onClose} />}
      {children}
    </span>
  )
}