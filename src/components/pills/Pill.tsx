


export interface PillProps {
  children?: React.ReactNode;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
}



export default function Pill({ children, className, style }: PillProps) {
  return (
    <span className={`text-sm font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded ${className}`} style={style}>
      {children}
    </span>
  )
}