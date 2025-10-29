import { FaTimes } from 'react-icons/fa';



export interface PillProps {
  children?: React.ReactNode;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLSpanElement>;
  onClose?: (params?: string | number | undefined | null | object | React.MouseEvent<HTMLSpanElement>) => void;
  ariaLabel?: string;
  role?: string;
}



export default function Pill({ 
  children, 
  className, 
  style, 
  onClose, 
  onClick,
  ariaLabel,
  role,
}: PillProps) {
  // Determine if pill is interactive
  const isInteractive = onClick !== undefined;
  const isCloseable = onClose !== undefined;
  
  return (
    <span 
      className={`text-sm font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded inline-flex items-center ${isInteractive ? 'cursor-pointer' : ''} ${className}`} 
      style={style}
      onClick={onClick}
      role={role || (isInteractive ? 'button' : undefined)}
      aria-label={ariaLabel}
      tabIndex={isInteractive ? 0 : undefined}
      onKeyDown={isInteractive ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (onClick) {
            onClick(e as unknown as React.MouseEvent<HTMLSpanElement>);
          }
        }
      } : undefined}
    >
      {isCloseable && (
        <FaTimes 
          className='mr-2 cursor-pointer' 
          onClick={onClose}
          role="button"
          aria-label="Remove"
          tabIndex={0}
          onKeyDown={(e: React.KeyboardEvent) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              if (onClose) {
                onClose(e as unknown as React.MouseEvent<HTMLSpanElement>);
              }
            }
          }}
        />
      )}
      {children}
    </span>
  )
}