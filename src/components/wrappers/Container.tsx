
import './Container.css';

export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}



export default function Container({ children, className, style }: ContainerProps) {
  return (
    <div className={`container ${className}`} style={style}>
      {children}
    </div>
  );
}