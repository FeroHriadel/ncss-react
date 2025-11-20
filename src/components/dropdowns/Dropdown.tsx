import { useRef, useState, useEffect, forwardRef, useImperativeHandle } from "react";
import './Dropdown.css';



export interface DropdownOption {
  value?: string;
  render: React.ReactNode | string;
}

export interface DropdownProps {
  options: DropdownOption[];
  className?: string;
  style?: React.CSSProperties;
  optionsClassName?: string;
  optionsStyle?: React.CSSProperties;
  id?: string;
  disabled?: boolean;
  trigger?: React.ReactNode;
  children?: React.ReactNode;
  closeOnSelect?: boolean;
  openX?: "left" | "right";
  openY?: "up" | "down";
  onChange?: (selectedOption: string | null) => void;
}

export interface DropdownHandle {
  open: () => void;
  close: () => void;
  toggle: () => void;
  isOpen: () => boolean;
}



const Dropdown = forwardRef<DropdownHandle, DropdownProps>(function Dropdown(
  { options, className, style, optionsClassName, optionsStyle, id, disabled, trigger, children, closeOnSelect = true, openX, openY, onChange = () => {} },
  ref
) {
  
  // Refs & state & values
  const measureRef = useRef<HTMLUListElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  
  // Only set maxHeight if content exceeds 400px
  const contentHeight = measureRef.current ? measureRef.current.scrollHeight : 0;
  const maxHeight = contentHeight > 400 ? 400 : undefined;


  // Toggle dropdown
  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  // Close dropdown when clicking outside
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
    // Check if there's space below the trigger for the dropdown
    const triggerRect = wrapperRef.current?.getBoundingClientRect();
    if (!triggerRect) return true;
    const dropdownHeight = maxHeight || contentHeight;
    const spaceBelow = window.innerHeight - triggerRect.bottom;
    return spaceBelow >= dropdownHeight;
  }

  // Check available space on the right
  function hasSpaceRight(): boolean {
    if (openX === "left") return false;
    if (openX === "right") return true;
    const rect = wrapperRef.current?.getBoundingClientRect();
    if (!rect) return true;
    const dropdownWidth = measureRef.current?.offsetWidth || 200;
    const spaceRight = window.innerWidth - rect.left; // Check from left edge of trigger
    return spaceRight >= dropdownWidth;
  }

  // Imperative handle methods exposed to parent via ref
  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    toggle: () => setIsOpen(prev => !prev),
    isOpen: () => isOpen,
  }), [isOpen]);


  // Render 
  return (
    /* Wrapper */
    <div 
      ref={wrapperRef}
      className={`dropdown-wrapper ${disabled ? '' : 'dropdown-not-disabled '}${className || ''}`}
      id={id} 
      style={{ opacity: disabled ? 0.5 : 1, pointerEvents: disabled ? 'none' : 'auto', ...style }}
    >

      {/* trigger button - render trigger or children (children has precedence) */}
      <span 
        className="dropdown-trigger" 
        onClick={toggleDropdown}
      >
        {children && !trigger && children}
        {trigger && !children && trigger}
      </span>

      {
        //options
        isOpen
        &&
        <ul 
          className={`dropdown-options ${hasSpaceBelow() ? 'dropdown-options-bottom' : 'dropdown-options-top'} ${hasSpaceRight() ? 'dropdown-options-left' : 'dropdown-options-right'} ${optionsClassName || ''}`}
          style={{ ...(maxHeight && { maxHeight: `${maxHeight}px` }), ...optionsStyle }}
        >
          {options.map((opt, index) => (
            <li 
              key={index} 
              className="dropdown-option"
              onClick={() => { 
                if (closeOnSelect) setIsOpen(false); 
                onChange(opt.value || null); }
              }
            >
              {opt.render}
            </li>
          ))}
        </ul>
      }

      {/* Ghost options to measure height - positioned off-screen to avoid overflow */}
      <ul 
        ref={measureRef} 
        className="dropdown-ghost"
      >
        {options.map((opt, index) => (
          <li 
            key={index} 
            className="dropdown-option"
          >
            {opt.render}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Dropdown;
