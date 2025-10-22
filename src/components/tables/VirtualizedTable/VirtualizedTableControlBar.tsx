import React from "react";
import ButtonIcon from "../../buttons/ButtonIcon";
import DropdownIcon from "../../dropdowns/DropdownIcon";
import { HiOutlineViewColumns } from "react-icons/hi2";
import { CiZoomIn, CiZoomOut } from "react-icons/ci";

interface ControlBarProps {
  dropdownOptions: Array<{ value: string; displayValue: string; onClick: () => void }>;
  preselectedDropdownOptions: string[];
  zoomLevel: number;
  minZoom: number;
  maxZoom: number;
  handleZoomIn: () => void;
  handleZoomOut: () => void;
}

const VirtualizedTableControlBar: React.FC<ControlBarProps> = ({
  dropdownOptions,
  preselectedDropdownOptions,
  zoomLevel,
  minZoom,
  maxZoom,
  handleZoomIn,
  handleZoomOut,
}) => (
  <div className="w-full flex justify-between items-center p-2 border border-gray-300 border-b-0 bg-gray-50">
    <div className="flex items-center">
      <span className="text-sm text-gray-600">Controls</span>
    </div>
    <div className="flex items-center gap-2 relative">
      {/* Column Visibility Toggle */}
      <DropdownIcon
        className="relative"
        icon={<HiOutlineViewColumns size={20} />}
        title="Toggle Columns"
        options={dropdownOptions}
        preselectedOptions={preselectedDropdownOptions}
      />
      {/* Zoom Controls */}
      <ButtonIcon
        className="p-1 hover:bg-gray-200 rounded transition-colors"
        title="Zoom Out"
        onClick={handleZoomOut}
        icon={<CiZoomOut size={20} className={zoomLevel <= minZoom ? 'text-gray-400' : ''} />}
        style={zoomLevel <= minZoom ? { pointerEvents: 'none', opacity: 0.6 } : undefined}
        disabled={zoomLevel <= minZoom}
      />
      <span className="text-xs text-gray-500 min-w-[40px] text-center">
        {Math.round(zoomLevel * 100)}%
      </span>
      <ButtonIcon
        className="p-1 hover:bg-gray-200 rounded transition-colors"
        title="Zoom In"
        onClick={handleZoomIn}
        icon={<CiZoomIn size={20} className={zoomLevel >= maxZoom ? 'text-gray-400' : ''} />}
        style={zoomLevel >= maxZoom ? { pointerEvents: 'none', opacity: 0.6 } : undefined}
        disabled={zoomLevel >= maxZoom}
      />
    </div>
  </div>
);

export default VirtualizedTableControlBar;
