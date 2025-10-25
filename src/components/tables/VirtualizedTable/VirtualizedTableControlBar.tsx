import React from "react";
import IconButton from "../../buttons/IconButton";
import MultiSelect, { type MultiSelectHandle } from "../../dropdowns/MultiSelect";
import { CiZoomIn, CiZoomOut, CiViewColumn } from "react-icons/ci";



interface ControlBarProps {
  zoomLevel: number;
  minZoom: number;
  maxZoom: number;
  handleZoomIn: () => void;
  handleZoomOut: () => void;
  columns: { column: string; displayValue: string }[];
}



const VirtualizedTableControlBar: React.FC<ControlBarProps> = ({
  zoomLevel,
  minZoom,
  maxZoom,
  handleZoomIn,
  handleZoomOut,
  columns
}) => {

  // Refs & values
  const multiselectRef = React.useRef<MultiSelectHandle>(null);
  const columnOptions = columns.map(col => ({ value: col.column, displayValue: col.displayValue }));  
  const preselectedOptions = columns.map(col => col.column);

  
  // Render
  return (
    <div className="w-full flex justify-between items-center p-2 border border-gray-300 border-b-0 bg-gray-50">

      {/*Left Side */}
      <div className="flex items-center">
        <span className="text-sm text-gray-600">Controls</span>
      </div>


      {/** Right Side */}
      <div className="flex items-center gap-2 relative">
        {/* Hide/show columns dropdown */}
        <MultiSelect
          className="p-1 hover:bg-gray-200 rounded transition-colors"
          trigger={<CiViewColumn size={20} />}
          options={columnOptions}
          title="Show/Hide Columns"
          preselectedOptions={preselectedOptions}
          ref={multiselectRef}
        />

        {/* Zoom Controls */}
        <IconButton
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

        <IconButton
          className="p-1 hover:bg-gray-200 rounded transition-colors"
          title="Zoom In"
          onClick={handleZoomIn}
          icon={<CiZoomIn size={20} className={zoomLevel >= maxZoom ? 'text-gray-400' : ''} />}
          style={zoomLevel >= maxZoom ? { pointerEvents: 'none', opacity: 0.6 } : undefined}
          disabled={zoomLevel >= maxZoom}
        />
      </div>
    </div>
  )
};

export default VirtualizedTableControlBar;
