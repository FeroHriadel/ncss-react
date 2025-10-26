


export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}



export default function Container({ children, className, style }: ContainerProps) {
  return (
    <div className={`max-w-[1000px] w-full mx-auto ${className}`} style={style}>
      {children}
    </div>
  );
}