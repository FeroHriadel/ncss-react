import { useRef, useState, useEffect, forwardRef, useImperativeHandle } from "react";
import './Popover.css';



export interface PopoverProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  disabled?: boolean;
  trigger: React.ReactNode;
  children: React.ReactNode;
  closeOnClick?: boolean;
  openX?: "left" | "right";
  openY?: "up" | "down";
}

export interface PopoverHandle {
  open: () => void;
  close: () => void;
  toggle: () => void;
  isOpen: () => boolean;
}



const Popover = forwardRef<PopoverHandle, PopoverProps>(function Popover(
  { className, style, id, disabled, trigger, children, closeOnClick = false, openX, openY },
  ref
) {
  
  // Refs & state
  const measureRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  
  // Only set maxHeight if content exceeds 400px
  const contentHeight = measureRef.current ? measureRef.current.scrollHeight : 0;
  const maxHeight = contentHeight > 400 ? 400 : undefined;


  // Toggle popover
  function togglePopover() {
    setIsOpen(!isOpen);
  }

  // Close popover when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen]);

  // Check available space below
  function hasSpaceBelow(): boolean {
    if (openY === "up") return false;
    if (openY === "down") return true;
    // Check if there's space below the trigger for the popover
    const triggerRect = wrapperRef.current?.getBoundingClientRect();
    if (!triggerRect) return true;
    const popoverHeight = maxHeight || contentHeight;
    const spaceBelow = window.innerHeight - triggerRect.bottom;
    return spaceBelow >= popoverHeight;
  }

  // Check available space on the right
  function hasSpaceRight(): boolean {
    if (openX === "left") return false;
    if (openX === "right") return true;
    const rect = wrapperRef.current?.getBoundingClientRect();
    if (!rect) return true;
    const popoverWidth = measureRef.current?.offsetWidth || 200;
    const spaceRight = window.innerWidth - rect.left; // Check from left edge of trigger
    return spaceRight >= popoverWidth;
  }

  // Imperative handle methods exposed to parent via ref
  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    toggle: () => setIsOpen(prev => !prev),
    isOpen: () => isOpen,
  }), [isOpen]);

  const popoverId = id || `ncss-popover-${Math.random().toString(10)}`;
  const contentId = `${popoverId}-content`;

  // Keyboard handler for trigger
  function handleTriggerKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      togglePopover();
    }
  }


  // Render 
  return (
    /* Wrapper */
    <div 
      ref={wrapperRef}
      className={`popover-wrapper ${disabled ? '' : 'popover-not-disabled '}${className || ''}`}
      id={popoverId} 
      style={{ opacity: disabled ? 0.5 : 1, pointerEvents: disabled ? 'none' : 'auto', ...style }}
    >

      {/* trigger button */}
      <span 
        className="popover-trigger" 
        onClick={togglePopover}
        onKeyDown={handleTriggerKeyDown}
        role="button"
        tabIndex={0}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls={contentId}
      >
        {trigger}
      </span>

      {
        // popover content
        isOpen
        &&
        <div
          id={contentId}
          className={`popover-content ${hasSpaceBelow() ? 'popover-content-bottom' : 'popover-content-top'} ${hasSpaceRight() ? 'popover-content-left' : 'popover-content-right'}`}
          style={{ ...(maxHeight && { maxHeight: `${maxHeight}px` }) }}
          onClick={() => { if (closeOnClick) setIsOpen(false); }}
          role="region"
          aria-label="Popover content"
        >
          {children}
        </div>
      }

      {/* Ghost content to measure height - positioned off-screen to avoid overflow */}
      <div 
        ref={measureRef} 
        className="popover-ghost"
      >
        {children}
      </div>
    </div>
  );
});

export default Popover;
