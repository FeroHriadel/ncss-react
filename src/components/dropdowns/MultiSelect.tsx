import React from "react";
import { FaCheck as FaTick } from 'react-icons/fa';
import { FaChevronDown } from 'react-icons/fa';
import Button from '../buttons/Button';
import './MultiSelect.css';



export interface DropdownOption {
  value: string;
  displayValue: string;
}

export interface MultiSelectProps {
  id?: string;
  style?: React.CSSProperties;
  className?: string;
  optionsClassName?: string;
  optionsStyle?: React.CSSProperties;
  trigger?: React.ReactNode;
  disabled?: boolean;
  title?: string;
  headerTitle?: string; // Optional custom header text, if not provided uses title
  options: DropdownOption[];
  preselectedOptions?: string[];
  onChange?: (selectedOptions: string[]) => void;
  openX?: "left" | "right";
  openY?: "up" | "down";
  width?: string;
  label?: string;
  required?: boolean;
  name?: string;
}

export interface MultiSelectHandle {
  getSelectedOptions: () => string[];
  setSelectedOptions: (options: string[]) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
}



const MultiSelect = React.forwardRef<MultiSelectHandle, MultiSelectProps>(function MultiSelect(
  {
    id,
    style,
    className,
    optionsClassName,
    optionsStyle,
    trigger,
    disabled,
    title = "Select Options",
    headerTitle,
    options,
    preselectedOptions = [],
    onChange,
    openX,
    openY,
    width,
    label,
    required = false,
    name='ncss-multiselect' 
  },
  ref
) {

  // State and Refs
  const [open, setOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([...preselectedOptions]);
  const [focusedIndex, setFocusedIndex] = React.useState(-1);
  const menuRef = React.useRef<HTMLDivElement>(null);

  // Trigger width: ensure dropdown is at least as wide as the trigger (or 200px)
  const triggerRef = React.useRef<HTMLSpanElement | null>(null);
  const [triggerWidth, setTriggerWidth] = React.useState<number>(0);

  // Measure trigger width on mount, when options / preselectedOptions change, and on resize
  React.useEffect(() => {
    function measureTrigger() {
      const btn = triggerRef.current;
      if (btn) {
        const tw = Math.round(btn.getBoundingClientRect().width) || 0;
        setTriggerWidth(tw);
      }
    }

    measureTrigger();
    const handleResize = () => window.requestAnimationFrame(measureTrigger);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [options, preselectedOptions]);

  // Autofocus menu when it opens
  React.useEffect(() => {
    if (open && menuRef.current) {
      menuRef.current.focus();
    }
  }, [open]);


  // Do options have space to open downwards
  function hasSpaceBelow() {
    if (openY === "up") return false;
    if (!dropdownRef.current) return false;
    const margin = 4;
    const optionHeight = 36; //approximate height per option
    const headerHeight = 40; //approximate height of header
    const maxOptionsBeforeScroll = Math.min(options.length, 7); //dropdown shows max 7 options then scrollsY
    const dropdownHeight = maxOptionsBeforeScroll * optionHeight + headerHeight;
    const { bottom: dropdownBottom } = dropdownRef.current.getBoundingClientRect();
    const optionsBottom = dropdownBottom + margin + dropdownHeight;
    return optionsBottom <= window.innerHeight;
  };

  // Should options open to the right or left
  function hasSpaceOnRight() {
    if (openX === "left") return false;
    if (openX === "right") return true;
    if (!triggerRef.current) return false;
    const { right: triggerRight } = triggerRef.current.getBoundingClientRect();
    const menuWidth = Math.max(triggerWidth || 0, 200);
    const margin = 8; // small gap from viewport edge
    return triggerRight + menuWidth + margin <= window.innerWidth;
  }

  // Handle option selection
  function handleOptionClick(value: string) {
    const newSelectedOptions = selectedOptions.includes(value)
      ? selectedOptions.filter((v) => v !== value)
      : [...selectedOptions, value];
    setSelectedOptions(newSelectedOptions);
    if (onChange) onChange([...newSelectedOptions]);
  }

  // Toggle dropdown open state
  function toggleDropdownOpen() { 
    setOpen((prev) => {
      if (!prev) {
        // Opening
        setFocusedIndex(0);
      } else {
        // Closing
        setFocusedIndex(-1);
        // Focus will return to trigger automatically when menu closes
      }
      return !prev;
    });
  }


  // Close dropdown when clicking outside
  React.useEffect(() => {
    function handleClickOutside (event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
        setFocusedIndex(-1);
      }
    }
    
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
        setFocusedIndex(-1);
      }
    }
    
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [open]);


  // Imperative handle methods exposed to parent via ref
  React.useImperativeHandle(ref, () => ({
    getSelectedOptions: () => [...selectedOptions],
    setSelectedOptions: (opts: string[]) => { setSelectedOptions([...opts]); if (onChange) onChange([...opts]);},
    clear: () => { setSelectedOptions([]); if (onChange) onChange([]);},
    open: () => setOpen(true),
    close: () => setOpen(false),
  }), [selectedOptions, onChange]);

  // Determine effective width for dropdown: use trigger width with a minimum of 200px
  const effectiveMinWidth = Math.max(triggerWidth || 0, 200);

  // Get display text for default trigger
  const getDisplayText = () => {
    if (selectedOptions.length === 0) return title;
    if (selectedOptions.length === 1) {
      const opt = options.find(o => o.value === selectedOptions[0]);
      return opt?.displayValue || title;
    }
    return `${selectedOptions.length} selected`;
  };

  const multiselectId = id || `ncss-multiselect-${Math.random().toString(10)}`;
  const menuId = `${multiselectId}-menu`;

  // Keyboard navigation for dropdown menu
  function handleMenuKeyDown(e: React.KeyboardEvent) {
    if (!open) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex(prev => (prev + 1) % options.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex(prev => (prev - 1 + options.length) % options.length);
        break;
      case 'Home':
        e.preventDefault();
        setFocusedIndex(0);
        break;
      case 'End':
        e.preventDefault();
        setFocusedIndex(options.length - 1);
        break;
      case ' ':
        e.preventDefault();
        if (focusedIndex >= 0 && focusedIndex < options.length) {
          const focusedOption = options[focusedIndex];
          handleOptionClick(focusedOption.value);
        }
        break;
    }
  }


  // Render
  return (
    <div 
      className={`multiselect-wrapper ${className || ''}`}
      style={{ 
        opacity: disabled ? 0.5 : 1, 
        pointerEvents: disabled ? 'none' : 'auto', width: width || 'auto', 
        ...style }} 
      ref={dropdownRef} 
      id={multiselectId}
    >
      <input type="hidden" name={name} value={[...selectedOptions].join(',') || ''} />

      {label && (
        <label
          htmlFor={multiselectId}
          className="multiselect-label"
        >
          {label}
          {required && <span className="multiselect-required-mark">*</span>}
        </label>
      )}

      {/* Trigger */}
      {trigger ? (
        <span
          ref={triggerRef}
          onClick={toggleDropdownOpen}
          title={title}
          role="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={title}
          tabIndex={0}
          className="multiselect-trigger-custom"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              toggleDropdownOpen();
            }
            if (e.key === 'Escape' && open) {
              setOpen(false);
              setFocusedIndex(-1);
            }
            if (e.key === 'ArrowDown' && !open) {
              e.preventDefault();
              setOpen(true);
              setFocusedIndex(0);
            }
            if (e.key === 'ArrowUp' && !open) {
              e.preventDefault();
              setOpen(true);
              setFocusedIndex(options.length - 1);
            }
          }}
        >
          {trigger}
        </span>
      ) : (
        <span 
          ref={triggerRef} 
          className="multiselect-trigger-default"
          onKeyDown={(e: React.KeyboardEvent) => {
            if (e.key === 'ArrowDown' && !open) {
              e.preventDefault();
              setOpen(true);
              setFocusedIndex(0);
            }
            if (e.key === 'ArrowUp' && !open) {
              e.preventDefault();
              setOpen(true);
              setFocusedIndex(options.length - 1);
            }
          }}
        >
            <Button
            onClick={toggleDropdownOpen}
            disabled={disabled}
            title={title}
            variant="outline"
            className="!justify-start active:scale-[1] w-full overflow-hidden"
            style={{ width: '100%' }}
            ariaHaspopup="listbox"
            ariaExpanded={open}
            >
            {/* Invisible placeholder to maintain button height */}
            <span className="multiselect-button-placeholder">-</span>
            </Button>
          {/* Text overlay */}
          <span 
            className="multiselect-text-overlay"
            style={{ maxWidth: 'calc(100% - 64px)' }}
          >
            {getDisplayText()}
          </span>
          <FaChevronDown className="multiselect-chevron" aria-hidden="true" />
        </span>
      )}

      {/* Dropdown Body */}
      {open && (
        <div
          ref={menuRef}
          id={menuId}
          className={`multiselect-options ${hasSpaceBelow() ? 'multiselect-options-bottom' : 'multiselect-options-top'} ${hasSpaceOnRight() ? 'multiselect-options-left' : 'multiselect-options-right'} ${optionsClassName || ''}`}
          style={{ zIndex: 9999, width: `${effectiveMinWidth}px`, ...optionsStyle }}
          role="listbox"
          aria-label={title}
          aria-multiselectable="true"
          onKeyDown={handleMenuKeyDown}
          tabIndex={-1}
        >

          {/* Dropdown Header */}
          <div className="multiselect-header" role="presentation">
            <span className="multiselect-header-text">{headerTitle || title}</span>
          </div>

          {/* Dropdown Options */}
          <div className="multiselect-options-wrap">
            <ul className="multiselect-options-list" role="presentation">
              {options.map((opt, index) => {
                const isSelected = selectedOptions.includes(opt.value);
                const isFocused = focusedIndex === index;
                return (
                  <li 
                    key={opt.value} 
                    onClick={() => handleOptionClick(opt.value)}
                    onMouseEnter={() => setFocusedIndex(index)}
                    role="option"
                    aria-selected={isSelected}
                    className={isFocused ? 'multiselect-option-focused' : ''}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleOptionClick(opt.value);
                      }
                    }}
                  >
                    <span className="multiselect-option">
                      <span className="multiselect-option-text">{opt.displayValue}</span>
                      {isSelected 
                        ? 
                        <FaTick className="multiselect-option-icon" aria-hidden="true" />
                        : 
                        <span className="multiselect-option-spacer" aria-hidden="true"></span>
                      }
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

        </div>
      )}

    </div>
  );
});

export default MultiSelect;
