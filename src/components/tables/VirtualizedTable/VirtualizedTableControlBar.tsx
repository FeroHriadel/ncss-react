import React from "react";
import ButtonIcon from "../../buttons/ButtonIcon";
import { CiZoomIn, CiZoomOut } from "react-icons/ci";



interface ControlBarProps {
  zoomLevel: number;
  minZoom: number;
  maxZoom: number;
  handleZoomIn: () => void;
  handleZoomOut: () => void;
}



const VirtualizedTableControlBar: React.FC<ControlBarProps> = ({
  zoomLevel,
  minZoom,
  maxZoom,
  handleZoomIn,
  handleZoomOut,
}) => {

  // Render
  return (
    <div className="w-full flex justify-between items-center p-2 border border-gray-300 border-b-0 bg-gray-50">

      {/*Left Side */}
      <div className="flex items-center">
        <span className="text-sm text-gray-600">Controls</span>
      </div>


      {/** Right Side */}
      <div className="flex items-center gap-2 relative">

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
  )
};

export default VirtualizedTableControlBar;
