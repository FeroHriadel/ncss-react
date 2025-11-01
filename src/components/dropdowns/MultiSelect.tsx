import React from "react";
import { FaCheck as FaTick } from 'react-icons/fa';
import { FaChevronDown } from 'react-icons/fa';
import Button from '../buttons/Button';



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
    openY
  },
  ref
) {

  // State and Refs
  const [open, setOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([...preselectedOptions]);

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
  function toggleDropdownOpen() { setOpen((prev) => !prev); }


  // Close dropdown when clicking outside
  React.useEffect(() => {
    function handleClickOutside (event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) setOpen(false);
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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


  // Render
  return (
    <div className={className ? `${className} relative` : 'relative'} style={style} ref={dropdownRef} id={id}>
      
      {/* Trigger */}
      {trigger ? (
        <span
          ref={triggerRef}
          onClick={toggleDropdownOpen}
          title={title}
          role="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label={title}
          tabIndex={0}
          style={{ display: 'inline-block' }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              toggleDropdownOpen();
            }
            if (e.key === 'Escape' && open) {
              setOpen(false);
            }
          }}
        >
          {trigger}
        </span>
      ) : (
        <span ref={triggerRef} className="relative block">
          <Button
            onClick={toggleDropdownOpen}
            disabled={disabled}
            title={title}
            variant="outline"
            className="!justify-start active:scale-[1] w-full overflow-hidden"
            style={{ width: '100%' }}
          >
            {/* Invisible placeholder to maintain button height */}
            <span className="opacity-0">-</span>
          </Button>
          {/* Text overlay */}
          <span 
            className="absolute left-4 top-1/2 -translate-y-1/2 truncate text-left text-gray-700 text-md pointer-events-none"
            style={{ maxWidth: 'calc(100% - 64px)' }}
          >
            {getDisplayText()}
          </span>
          <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-700 text-xs pointer-events-none" aria-hidden="true" />
        </span>
      )}

      {/* Dropdown Body */}
      {open && (
        <div
          className={`absolute ${hasSpaceBelow() ? 'top-full' : 'bottom-full'} ${hasSpaceOnRight() ? 'left-0' : 'right-0'} mt-1 bg-white border border-gray-300 rounded shadow-lg z-50 ${optionsClassName || ''}`}
          style={{ zIndex: 9999, width: `${effectiveMinWidth}px`, ...optionsStyle }}
          role="listbox"
          aria-label={title}
          aria-multiselectable="true"
        >

          {/* Dropdown Header */}
          <div className="p-2 border-b border-gray-200" role="presentation">
            <span className="text-sm font-medium text-gray-700">{headerTitle || title}</span>
          </div>

          {/* Dropdown Options */}
          <div className="options-wrap max-h-60 overflow-y-auto">
            <ul className="list-none m-0 p-0" role="presentation">
              {options.map(opt => {
                const isSelected = selectedOptions.includes(opt.value);
                return (
                  <li 
                    key={opt.value} 
                    onClick={() => handleOptionClick(opt.value)}
                    role="option"
                    aria-selected={isSelected}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleOptionClick(opt.value);
                      }
                    }}
                  >
                    <span className="w-full text-left p-2 flex items-center justify-between hover:bg-gray-100 transition-colors text-sm text-gray-700"                    >
                      <span className="truncate">{opt.displayValue}</span>
                      {isSelected 
                        ? 
                        <FaTick className="ml-3 text-gray-500 text-xs flex-shrink-0" aria-hidden="true" />
                        : 
                        <span className="ml-6" aria-hidden="true"></span>
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
