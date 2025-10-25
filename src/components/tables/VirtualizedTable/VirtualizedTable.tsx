import React from 'react'
import VirtualizedTableControlBar from "./VirtualizedTableControlBar";
import VirtualizedTableHeader from "./VirtualizedTableHeader";
import VirtualizedTableBody from "./VirtualizedTableBody";
import { useVirtualizedTableRendering } from "./useVirtualizedTableRendering"
import { useVirtualizedTableZoom } from "./useVirtualizedTableZoom"



export interface VirtualizedTableProps {
  data: { [key: string]: string | number | boolean | null | undefined | [] | object | React.ReactNode }[];
  columnsConfig?: { column: string; displayValue: string; width?: string }[];
  height?: string;
  horizontalSeparators?: boolean;
  verticalSeparators?: boolean;
  striped?: { enabled: boolean; color?: string } | boolean;
  hover?: { enabled: boolean; color?: string } | boolean;
}



function VirtualizedTable({
  data,
  columnsConfig,
  height = "400px",
  horizontalSeparators = true,
  verticalSeparators = true,
  striped = true,
  hover = true
}: VirtualizedTableProps) {
    const headerRef = React.useRef<HTMLDivElement>(null);
    const bodyRef = React.useRef<HTMLDivElement | null>(null);
    const scrollbarRef = React.useRef<HTMLDivElement | null>(null);

    // COLUMNS    
      // Determine columns from config or infer from data
      function getColumns() {
        if (columnsConfig && columnsConfig.length > 0) return columnsConfig;
        if (data.length > 0) return Object.keys(data[0]).map(key => ({ column: key, displayValue: key }));
        return [];
      }
      const columns = getColumns();
      
      // Get column width style
      function getColumnStyle(columnObj: { column: string; displayValue: string; width?: string }) {
        if (columnObj.width) {
          return { width: columnObj.width };
        }
      return {};
    }
  
    // ZOOM
      // Zoom in/out functionality
      const {
        zoomLevel,
        minZoom,
        maxZoom,
        handleZoomIn,
        handleZoomOut,
      } = useVirtualizedTableZoom(1, 0.5, 1.5, 0.1);


    // RENDERING (& SCROLLING LOGIC)
      // Main virtualization and scroll logic
      const {
        handleWheelEvent,
        handleHeaderScroll,
        handleTableMouseDown,
        handleTableMouseLeave,
        handleScrollbarMouseDown,
        handleKeyDown,
        getTotalSize,
        getVirtualItems,
        measureElement,
        handleNativeScroll,
      } = useVirtualizedTableRendering({
        data,
        bodyRef,
        headerRef,
        scrollbarRef,
        zoomLevel,
      }); 


    // RENDER
    return (
      <section className='virtualized-table-wrap'>
        <VirtualizedTableControlBar
          zoomLevel={zoomLevel}
          minZoom={minZoom}
          maxZoom={maxZoom}
          handleZoomIn={handleZoomIn}
          handleZoomOut={handleZoomOut}
        />
        {/* Fixed Header */}
        <div className="flex">
          <div className="border border-gray-300 overflow-hidden flex-1">
            <VirtualizedTableHeader
              headerRef={headerRef as React.RefObject<HTMLDivElement>}
              visibleColumns={columns}
              getColumnStyle={getColumnStyle}
              zoomLevel={zoomLevel}
              verticalSeparators={verticalSeparators}
              handleHeaderScroll={handleHeaderScroll}
            />
          </div>
          {/* Spacer to account for custom scrollbar */}
          <div className="w-3 border-t border-r border-gray-300 bg-gray-50"></div>
        </div>

        <VirtualizedTableBody
          bodyRef={bodyRef as React.RefObject<HTMLDivElement>}
          scrollbarRef={scrollbarRef as React.RefObject<HTMLDivElement>}
          data={data}
          columns={columns}
          verticalSeparators={verticalSeparators}
          zoomLevel={zoomLevel}
          getColumnStyle={getColumnStyle}
          handleTableMouseDown={handleTableMouseDown}
          handleTableMouseLeave={handleTableMouseLeave}
          handleWheelEvent={handleWheelEvent}
          handleScrollbarMouseDown={handleScrollbarMouseDown}
          handleKeyDown={handleKeyDown}
          handleNativeScroll={handleNativeScroll}
          height={height}
          horizontalSeparators={horizontalSeparators}
          striped={striped}
          hover={hover}
          getTotalSize={getTotalSize}
          getVirtualItems={getVirtualItems}
          measureElement={measureElement}
        />
      </section>
    );
  }

export default VirtualizedTable;