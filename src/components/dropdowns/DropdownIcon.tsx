import React from "react";

export interface DropdownOption {
  value: string;
  displayValue: string;
  onClick: (params: { value: string }) => void;
}

export interface DropdownIconProps {
  id?: string;
  style?: React.CSSProperties;
  className?: string;
  icon: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  title?: string;
  options: DropdownOption[];
  preselectedOptions?: string[];
}

const DropdownIcon: React.FC<DropdownIconProps> = ({
  id,
  style,
  className,
  icon,
  onClick,
  disabled,
  title,
  options,
  preselectedOptions = [],
}) => {
  const [open, setOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className={className} style={style} ref={dropdownRef} id={id}>
      <button
        type="button"
  onClick={e => { setOpen((prev) => !prev); if (onClick) onClick(e); }}
        disabled={disabled}
        title={title}
        className="p-1 hover:bg-gray-200 rounded transition-colors"
      >
        {icon}
      </button>
      {open && (
        <div className="absolute top-full right-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-10 min-w-[200px]">
          <div className="p-2 border-b border-gray-200">
            <span className="text-sm font-medium text-gray-700">Show/Hide Columns</span>
          </div>
          <div className="max-h-60 overflow-y-auto">
            {options.map(opt => (
              <label
                key={opt.value}
                className="flex items-center p-2 hover:bg-gray-50 cursor-pointer"
                onClick={() => { opt.onClick({ value: opt.value }); setOpen(false); }}
              >
                <input
                  type="checkbox"
                  checked={preselectedOptions.includes(opt.value)}
                  readOnly
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">{opt.displayValue}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownIcon;
