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
  label?: string;
  required?: boolean;
}

export interface DropdownHandle {
  open: () => void;
  close: () => void;
  toggle: () => void;
  isOpen: () => boolean;
}



const Dropdown = forwardRef<DropdownHandle, DropdownProps>(function Dropdown(
  { options, className, style, optionsClassName, optionsStyle, id, disabled, trigger, children, closeOnSelect = true, openX, openY, onChange = () => {}, label, required = false },
  ref
) {
  
  // Refs & state & values
  const measureRef = useRef<HTMLUListElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLUListElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  
  // Only set maxHeight if content exceeds 400px
  const contentHeight = measureRef.current ? measureRef.current.scrollHeight : 0;
  const maxHeight = contentHeight > 400 ? 400 : undefined;


  // Toggle dropdown
  function toggleDropdown() {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setFocusedIndex(0); // Focus first item when opening
    } else {
      setFocusedIndex(-1);
      triggerRef.current?.focus(); // Return focus to trigger when closing
    }
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    }

    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
        setFocusedIndex(-1);
        triggerRef.current?.focus();
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

  const dropdownId = id || `ncss-dropdown-${Math.random().toString(10)}`;
  const menuId = `${dropdownId}-menu`;

  // Keyboard handler for trigger
  function handleTriggerKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleDropdown();
    } else if (e.key === 'ArrowDown' && !isOpen) {
      e.preventDefault();
      setIsOpen(true);
      setFocusedIndex(0);
    } else if (e.key === 'ArrowUp' && !isOpen) {
      e.preventDefault();
      setIsOpen(true);
      setFocusedIndex(options.length - 1);
    }
  }

  // Keyboard navigation within menu
  function handleMenuKeyDown(e: React.KeyboardEvent) {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex(prev => (prev + 1) % options.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex(prev => (prev - 1 + options.length) % options.length);
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (focusedIndex >= 0 && focusedIndex < options.length) {
          const selectedOption = options[focusedIndex];
          onChange(selectedOption.value || null);
          if (closeOnSelect) {
            setIsOpen(false);
            setFocusedIndex(-1);
            triggerRef.current?.focus();
          }
        }
        break;
      case 'Home':
        e.preventDefault();
        setFocusedIndex(0);
        break;
      case 'End':
        e.preventDefault();
        setFocusedIndex(options.length - 1);
        break;
    }
  }


  // Render 
  return (
    /* Wrapper */
    <div 
      ref={wrapperRef}
      className={`dropdown-wrapper ${disabled ? '' : 'dropdown-not-disabled '}${className || ''}`}
      id={dropdownId} 
      style={{ opacity: disabled ? 0.5 : 1, pointerEvents: disabled ? 'none' : 'auto', ...style }}
    >

      {label && (
        <label
          id={`${dropdownId}-label`}
          htmlFor={dropdownId}
          className="dropdown-label"
        >
          {label}
          {required && <span className="dropdown-required-mark">*</span>}
        </label>
      )}

      {/* trigger button - render trigger or children (children has precedence) */}
      <div
        ref={triggerRef}
        className="dropdown-trigger" 
        onClick={toggleDropdown}
        onKeyDown={handleTriggerKeyDown}
        role="button"
        tabIndex={0}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={menuId}
        aria-labelledby={label ? `${dropdownId}-label` : undefined}
      >
        {children && !trigger && children}
        {trigger && !children && trigger}
      </div>

      {
        //options
        isOpen
        &&
        <ul
          ref={optionsRef}
          id={menuId}
          role="listbox"
          className={`dropdown-options ${hasSpaceBelow() ? 'dropdown-options-bottom' : 'dropdown-options-top'} ${hasSpaceRight() ? 'dropdown-options-left' : 'dropdown-options-right'} ${optionsClassName || ''}`}
          style={{ ...(maxHeight && { maxHeight: `${maxHeight}px` }), ...optionsStyle }}
          onKeyDown={handleMenuKeyDown}
          tabIndex={-1}
        >
          {options.map((opt, index) => (
            <li 
              key={index} 
              role="option"
              aria-selected={focusedIndex === index}
              className={`dropdown-option ${focusedIndex === index ? 'dropdown-option-focused' : ''}`}
              onClick={() => { 
                if (closeOnSelect) {
                  setIsOpen(false);
                  setFocusedIndex(-1);
                  triggerRef.current?.focus();
                }
                onChange(opt.value || null);
              }}
              onMouseEnter={() => setFocusedIndex(index)}
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
