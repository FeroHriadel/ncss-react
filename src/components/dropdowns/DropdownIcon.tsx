import React from "react";
import { FaCheck as FaTick } from 'react-icons/fa';

export interface DropdownOption {
  value: string;
  displayValue: string;
}

export interface DropdownIconProps {
  id?: string;
  style?: React.CSSProperties;
  className?: string;
  icon: React.ReactNode;
  disabled?: boolean;
  title?: string;
  options: DropdownOption[];
  preselectedOptions?: string[];
  onChange?: (selectedOptions: string[]) => void;
  openX?: "left" | "right";
  openY?: "up" | "down";
}

const DropdownIcon: React.FC<DropdownIconProps> = ({
  id,
  style,
  className,
  icon,
  disabled,
  title,
  options,
  preselectedOptions = [],
  onChange,
  openX,
  openY
}) => {

  // State and Refs
  const [open, setOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([...preselectedOptions]);


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
    return dropdownRight + 200 <= window.innerWidth; // 200 is the approximate width of the dropdown
  }

  // Handle option selection
  function handleOptionClick(value: string) {
    const newSelectedOptions = selectedOptions.includes(value)
      ? selectedOptions.filter((v) => v !== value)
      : [...selectedOptions, value];
    setSelectedOptions(newSelectedOptions);
    if (onChange) onChange(newSelectedOptions);
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


  // Render
  return (
    <div className={className ? `${className} relative` : 'relative'} style={style} ref={dropdownRef} id={id}>
      
      {/* Trigger Icon Button */}
      <button
        type="button"
        onClick={toggleDropdownOpen}
        disabled={disabled}
        title={title}
        className="p-1 hover:bg-gray-200 rounded transition-colors"
      >
        {icon}
      </button>

      {/* Dropdown Body */}
      {open && (
        <div
          className={`absolute ${hasSpaceBelow() ? 'top-full' : 'bottom-full'} ${hasSpaceOnRight() ? 'left-0' : 'right-0'} mt-1 bg-white border border-gray-300 rounded shadow-lg z-[9999] min-w-[200px]`}
          style={{ zIndex: 9999 }}
        >

          {/* Dropdown Header */}
          <div className="p-2 border-b border-gray-200">
            <span className="text-sm font-medium text-gray-700">Show/Hide Columns</span>
          </div>

          {/* Dropdown Options */}
          <div className="options-wrap max-h-60 overflow-y-auto">
            <ul className="list-none m-0 p-0">
              {options.map(opt => {
                return (
                  <li key={opt.value} onClick={() => handleOptionClick(opt.value)}>
                    <span className="w-full text-left p-2 flex items-center justify-between hover:bg-gray-100 transition-colors text-sm text-gray-700"                    >
                      <span className="truncate">{opt.displayValue}</span>
                      {selectedOptions.includes(opt.value) && (
                        <FaTick className="ml-3 text-gray-500 text-xs flex-shrink-0" aria-hidden="true" />
                      )}
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
};

export default DropdownIcon;
