


export interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  id?: string;  
}


export default function Card({ children, className, style, id }: CardProps) {
  return (
    <div className={`border border-gray-300 rounded-lg shadow-md ${className}`} style={style} id={id}>
      {children}
    </div>
  );
}