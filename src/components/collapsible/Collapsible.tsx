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
  const contentId = id ? `${id}-content` : `collapsible-content-${Math.random().toString(36).substr(2, 9)}`;

  function toggleOpen() {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    if (onToggle) {
      onToggle(newIsOpen);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleOpen();
    }
  }

  return (
    <div className={`collapsible-wrap ${className || ''}`} id={id} style={style}>
      <div 
        className={`collapsible-trigger ${triggerWrapClassName || ''}`} 
        style={triggerWrapStyle} 
        onClick={toggleOpen}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-controls={contentId}
        role="button"
        tabIndex={0}
      >
        {trigger}
      </div>

      {
        isOpen 
        && 
        <div 
          className="collapsible-body"
          id={contentId}
          role="region"
          aria-hidden={!isOpen}
        >
          {children}
        </div>
      }
    </div>
  )
}