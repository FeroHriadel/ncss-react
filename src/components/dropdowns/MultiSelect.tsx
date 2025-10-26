import React from "react";
import { FaCheck as FaTick } from 'react-icons/fa';



export interface DropdownOption {
  value: string;
  displayValue: string;
}

export interface MultiSelectProps {
  id?: string;
  style?: React.CSSProperties;
  className?: string;
  trigger: React.ReactNode;
  disabled?: boolean;
  title?: string;
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
    trigger,
    disabled,
    title = "Select Options",
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
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);
  const [triggerWidth, setTriggerWidth] = React.useState<number>(0);

  // Measurer for actual menu width (may exceed the CSS min-width)
  const measurerRef = React.useRef<HTMLDivElement | null>(null);
  const [measuredMenuWidth, setMeasuredMenuWidth] = React.useState<number | null>(null);

  // Measure the offscreen menu width (safe to call repeatedly)
  function measureMenuWidth(): void {
    const node = measurerRef.current;
    if (!node) return;
    // offsetWidth includes padding/border; ensure a sensible minimum matching CSS min-w
    const w = Math.max(node.offsetWidth || 0, 200);
    setMeasuredMenuWidth(w);
  }

  // Measure on mount, when options / preselectedOptions change, and on resize
  React.useEffect(() => {
    // measure both trigger and menu content
    function measureAll() {
      // measure trigger
      const btn = triggerRef.current;
      if (btn) {
        const tw = Math.round(btn.getBoundingClientRect().width) || 0;
        setTriggerWidth(tw);
      }
      measureMenuWidth();
    }

    measureAll();
    const handleResize = () => window.requestAnimationFrame(measureAll);
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
    if (!dropdownRef.current) return false;
    const { right: dropdownRight } = dropdownRef.current.getBoundingClientRect();
    const menuWidth = (measuredMenuWidth && measuredMenuWidth > triggerWidth)
      ? measuredMenuWidth
      : Math.max(triggerWidth || 0, 200);
    const margin = 8; // small gap from viewport edge
    return dropdownRight + menuWidth + margin <= window.innerWidth;
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

  // Determine effective min width for visible dropdown: prefer measuredMenuWidth when
  // it exceeds the trigger width; otherwise fall back to max(triggerWidth, 200)
  const effectiveMinWidth = (measuredMenuWidth && measuredMenuWidth > triggerWidth)
    ? measuredMenuWidth
    : Math.max(triggerWidth || 0, 200);


  // Render
  return (
    <div className={className ? `${className} relative` : 'relative'} style={style} ref={dropdownRef} id={id}>
      
      {/* Trigger Icon Button */}
      <span
        ref={triggerRef}
        onClick={toggleDropdownOpen}
        title={title}
      >
        {trigger}
      </span>

      {/* Dropdown Body */}
      {open && (
        <div
          className={`absolute ${hasSpaceBelow() ? 'top-full' : 'bottom-full'} ${hasSpaceOnRight() ? 'left-0' : 'right-0'} mt-1 bg-white border border-gray-300 rounded shadow-lg z-[9999]`}
          style={{ zIndex: 9999, minWidth: `${effectiveMinWidth}px` }}
        >

          {/* Dropdown Header */}
          <div className="p-2 border-b border-gray-200">
            <span className="text-sm font-medium text-gray-700">{title}</span>
          </div>

          {/* Dropdown Options */}
          <div className="options-wrap max-h-60 overflow-y-auto">
            <ul className="list-none m-0 p-0">
              {options.map(opt => {
                return (
                  <li key={opt.value} onClick={() => handleOptionClick(opt.value)}>
                    <span className="w-full text-left p-2 flex items-center justify-between hover:bg-gray-100 transition-colors text-sm text-gray-700"                    >
                      <span className="truncate">{opt.displayValue}</span>
                      {selectedOptions.includes(opt.value) 
                        ? 
                        <FaTick className="ml-3 text-gray-500 text-xs flex-shrink-0" aria-hidden="true" />
                        : 
                        <span className="ml-6"></span>
                      }
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

        </div>
      )}

      {/* Offscreen measurer: mirrors the menu markup/styles so we can compute real width even when closed */}
      <div
        ref={measurerRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: -99999,
          left: -99999,
          visibility: 'hidden',
          pointerEvents: 'none',
        }}
      >
        <div className="bg-white border border-gray-300 rounded shadow-lg min-w-[200px]">
          <div className="p-2 border-b border-gray-200">
            <span className="text-sm font-medium text-gray-700">{title}</span>
          </div>
          <div className="options-wrap max-h-60">
            <ul className="list-none m-0 p-0">
              {options.map(opt => (
                <li key={opt.value}>
                  <div className="w-full text-left p-2 flex items-center justify-between text-sm text-gray-700">
                    <span className="truncate">{opt.displayValue}</span>
                    {selectedOptions.includes(opt.value) ? (
                      <FaTick className="ml-3 text-black text-xs flex-shrink-0" aria-hidden="true" />
                    ) : (
                      <span className="w-3" />
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
});

export default MultiSelect;
