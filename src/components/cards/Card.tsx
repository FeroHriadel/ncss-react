


import './Card.css';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  role?: string;
}


export default function Card({ 
  children, 
  className, 
  style, 
  id, 
  ariaLabel, 
  ariaLabelledBy,
  role = 'article'
}: CardProps) {
  return (
    <div 
      className={`card ${className}`} 
      style={style} 
      id={id}
      role={role}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
    >
      {children}
    </div>
  );
}