


import './Card.css';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  role?: string;
  width?: string
}


export default function Card({ 
  children, 
  className, 
  style, 
  id, 
  ariaLabel, 
  ariaLabelledBy,
  role = 'article',
  width
}: CardProps) {
  return (
    <div 
      className={`card ${className}`} 
      id={id}
      role={role}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      {...(width ? { style: { ...style, width } } : {})}
    >
      {children}
    </div>
  );
}