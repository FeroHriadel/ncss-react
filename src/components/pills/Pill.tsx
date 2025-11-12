import { FaTimes } from 'react-icons/fa';
import './Pill.css';



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
      className={`pill ${isInteractive ? 'pill-interactive' : ''} ${className || ''}`}
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
          className="pill-close-icon"
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