import { useState } from "react";
import './Collapsible.css';

export interface CollapsibleProps {
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  title?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
  trigger: React.ReactNode;
  triggerWrapStyle?: React.CSSProperties;
  triggerWrapClassName?: string;
  onToggle?: (isOpen: boolean) => void;
}



export default function Collapsible({
  className,
  id,
  style,
  defaultOpen = false,
  children,
  trigger,
  triggerWrapStyle,
  triggerWrapClassName,
  onToggle,
}: CollapsibleProps) {

  const [isOpen, setIsOpen] = useState(defaultOpen);

  function toggleOpen() {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    if (onToggle) {
      onToggle(newIsOpen);
    }
  }

  return (
    <div className={`collapsible-wrap ${className || ''}`} id={id} style={style}>
      <span className={`collapsible-trigger ${triggerWrapClassName || ''}`} style={triggerWrapStyle} onClick={toggleOpen}>
        {trigger}
      </span>

      {
        isOpen 
        && 
        <div className="collapsible-body" >
          {children}
        </div>
      }
    </div>
  )
}