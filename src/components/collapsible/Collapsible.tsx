import { useState } from "react";



export interface CollapsibleProps {
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  title?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
  trigger: React.ReactNode;
}



export default function Collapsible({
  className,
  id,
  style,
  defaultOpen = false,
  children,
  trigger,
}: CollapsibleProps) {

  const [isOpen, setIsOpen] = useState(defaultOpen);

  function toggleOpen() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <span className="collapsible-trigger" onClick={toggleOpen}>
        {trigger}
      </span>

      {
        isOpen 
        && 
        <div className={'collapsible body' + className} id={id} style={style}>
          {children}
        </div>
      }
    </>
  )
}