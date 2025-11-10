


export interface LeftNavProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  children?: React.ReactNode;
  width: string;
  top: string;
}



export default function LeftNav({
  className,
  style,
  id,
  children,
  width = '280px',
  top = '0px',
}: LeftNavProps) {

  return (
    <div
      className={`left-nav z-[31] overflow-x-hidden overflow-y-auto ${className}`}
      style={{
        ...style,
        width,
        top,
        position: 'fixed',
        left: '0px',
        height: `calc(100vh - ${top})`,
      }}
      id={id}
    >
      <p className="mt-20">brekeke</p>
      {children}
    </div>
  );
}
