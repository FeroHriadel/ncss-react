import { useRef, useState, useEffect } from "react";



export interface DropdownOption {
  value?: string;
  render: React.ReactNode | string;
}

export interface DropdownProps {
  options: DropdownOption[];
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  disabled?: boolean;
  trigger?: React.ReactNode;
  children?: React.ReactNode;
  closeOnSelect?: boolean;
}



export default function Dropdown({ options, className, style, id, disabled, trigger, children, closeOnSelect = true }: DropdownProps) {
  
  // Refs & state & values
  const measureRef = useRef<HTMLUListElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const maxHeight = measureRef.current ? Math.min(measureRef.current.scrollHeight, 400) : 400;


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
    // max-options-height is 400px
    const rect = measureRef.current?.getBoundingClientRect();
    if (!rect) return true;
    const spaceBelow = window.innerHeight - rect.bottom;
    return spaceBelow >= maxHeight;
  }

  // Check available space on the right
  function hasSpaceRight(): boolean {
    const rect = wrapperRef.current?.getBoundingClientRect();
    if (!rect) return true;
    const dropdownWidth = measureRef.current?.offsetWidth || 200;
    const spaceRight = window.innerWidth - rect.left; // Check from left edge of trigger
    return spaceRight >= dropdownWidth;
  }


  // Render 
  return (
    /* Wrapper */
    <div 
      ref={wrapperRef}
      className={`dropdown-wrap relative inline-block ` + (disabled ? 'opacity-50 pointer-events-none ' : 'group ') + (className ? className : '')} 
      id={id} 
      style={style}
    >

      {/* trigger button - render trigger or children (children has precedence) */}
      <span 
        className="w-full appearance-none outline-none border-none p-0 m-0 bg-transparent cursor-pointer" 
        onClick={toggleDropdown}
      >
        {children && !trigger && children}
        {trigger && !children && trigger}
      </span>

      {
        //options
        isOpen
        &&
        <ul className={`dropdown-options absolute bg-white border border-gray-300 rounded-md shadow-lg mt-2 z-10 max-h-[${maxHeight}px] overflow-auto ${hasSpaceBelow() ? 'top-full' : 'bottom-full'} ${hasSpaceRight() ? 'left-0' : 'right-0'} min-w-[200px] ${className}`} >
          {options.map((opt, index) => (
            <li 
              key={index} 
              className="dropdown-option"
              onClick={() => closeOnSelect && setIsOpen(false)}
            >
              {opt.render}
            </li>
          ))}
        </ul>
      }

      {/* Ghost options to measure height - positioned off-screen to avoid overflow */}
      <ul 
        ref={measureRef} 
        className={`dropdown-options-ghost fixed invisible pointer-events-none bg-white border border-gray-300 rounded-md shadow-lg -left-[9999px] -top-[9999px] max-h-[400px] overflow-auto min-w-[200px]`}
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
}
    