import React from 'react'
import VirtualizedTableControlBar from "./VirtualizedTableControlBar";
import VirtualizedTableHeader from "./VirtualizedTableHeader";
import VirtualizedTableBody from "./VirtualizedTableBody";
import { useVirtualizedTableRendering } from "./useVirtualizedTableRendering"
import { useVirtualizedTableZoom } from "./useVirtualizedTableZoom"
import { useVirtualizedTableFilter } from "./useVirtualizedTableFilter"
import type { FilterPreset } from "./VirtualizedTableFilter";

// Re-export FilterPreset for easy importing
export type { FilterPreset } from "./VirtualizedTableFilter";



export interface VirtualizedTableProps {
  data: { [key: string]: string | number | boolean | null | undefined | [] | object | React.ReactNode }[];
  columnsConfig?: { column: string; displayValue: string; width?: string }[];
  height?: string;
  horizontalSeparators?: boolean;
  verticalSeparators?: boolean;
  striped?: { enabled: boolean; color?: string } | boolean;
  hover?: { enabled: boolean; color?: string } | boolean;
  controls?: boolean;
  filterPresets?: FilterPreset[];
  className?: string;
  style?: React.CSSProperties;
  controlBarClassName?: string;
  controlBarStyle?: React.CSSProperties;
  headerClassName?: string;
  headerStyle?: React.CSSProperties;
  ariaLabel?: string;
  ariaDescribedBy?: string;
}



function VirtualizedTable({
  data,
  columnsConfig,
  height = "400px",
  horizontalSeparators = true,
  verticalSeparators = true,
  striped = true,
  hover = true,
  controls = true,
  filterPresets,
  style, 
  className,
  ariaLabel,
  ariaDescribedBy,
  controlBarClassName,
  controlBarStyle,
  headerClassName,
  headerStyle,
}: VirtualizedTableProps) {

    // REFS
    const headerRef = React.useRef<HTMLDivElement>(null);
    const bodyRef = React.useRef<HTMLDivElement | null>(null);
    const scrollbarRef = React.useRef<HTMLDivElement | null>(null);
    const wrapperRef = React.useRef<HTMLDivElement>(null);

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
  
    // FILTERING
      // Filter data based on search criteria
      const { filteredData, filteredColumns, setColumnsFilter, setColumnOrder, filterState, setFilterConditions, resetFilters, setSortColumn, isSorting } = useVirtualizedTableFilter({ data, columns });

      // Reset scroll position when filters change
      React.useEffect(() => {
        if (headerRef.current) {
          headerRef.current.scrollLeft = 0;
        }
        if (bodyRef.current) {
          bodyRef.current.scrollLeft = 0;
          bodyRef.current.scrollTop = 0;
        }
      }, [filteredColumns, filteredData]);



    // ZOOM
      // Zoom in/out functionality
      const {
        zoomLevel,
        minZoom,
        maxZoom,
        handleZoomIn,
        handleZoomOut,
      } = useVirtualizedTableZoom(1, 0.5, 1.5, 0.1);

      // Lock section height to prevent jumping
      const sectionRef = React.useRef<HTMLElement>(null);
      const [lockedHeight, setLockedHeight] = React.useState<string | null>(null);
      
      React.useEffect(() => {
        // Measure and lock height on first render
        if (sectionRef.current && !lockedHeight) {
          const measuredHeight = sectionRef.current.getBoundingClientRect().height;
          setLockedHeight(`${measuredHeight}px`);
        }
      }, [lockedHeight]);

      // Preserve scroll position during zoom changes
      const previousZoomRef = React.useRef(zoomLevel);
      React.useEffect(() => {
        if (bodyRef.current && previousZoomRef.current !== zoomLevel) {
          // Store current scroll position
          const scrollTop = bodyRef.current.scrollTop;
          const scrollLeft = bodyRef.current.scrollLeft;
          
          // Restore after a brief delay to let measurements settle
          const timer = setTimeout(() => {
            if (bodyRef.current) {
              bodyRef.current.scrollTop = scrollTop;
              bodyRef.current.scrollLeft = scrollLeft;
            }
          }, 300);
          
          previousZoomRef.current = zoomLevel;
          return () => clearTimeout(timer);
        }
      }, [zoomLevel]);


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
        data: filteredData,
        bodyRef,
        headerRef,
        scrollbarRef,
        zoomLevel,
        handleZoomIn,
        handleZoomOut,
      }); 


    // RENDER
    return (
      <section 
        ref={sectionRef}
        className={'virtualized-table-wrap rounded ' + (className || '')}
        style={{
          willChange: 'contents',
          height: lockedHeight || 'auto',
          minHeight: lockedHeight || 'auto',
          maxHeight: lockedHeight || 'auto',
          ...style
        }}
        role="region"
        aria-label={ariaLabel || "Data table"}
        aria-describedby={ariaDescribedBy}
      >
        {/* Control Bar */}
        {controls && (
          <VirtualizedTableControlBar
            zoomLevel={zoomLevel}
            minZoom={minZoom}
            maxZoom={maxZoom}
            handleZoomIn={handleZoomIn}
            handleZoomOut={handleZoomOut}
            columns={getColumns()}
            setColumnsFilter={setColumnsFilter}
            filterState={filterState}
            setFilterConditions={setFilterConditions}
            data={data}
            resetFilters={resetFilters}
            resultCount={filteredData.length}
            filterPresets={filterPresets}
            controlBarClassName={controlBarClassName}
            controlBarStyle={controlBarStyle}
            isSorting={isSorting}
          />
        )}

        {/* Header and Body wrapper */}
        <div 
          ref={wrapperRef}
          className="focus:outline-none rounded"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onClick={() => wrapperRef.current?.focus()}
          role="table"
          aria-rowcount={filteredData.length}
          aria-colcount={filteredColumns.length}
        >
          {/* Fixed Header */}
          <div className="flex">
            <div className="border-t border-l border-b border-gray-300 rounded-tl overflow-hidden flex-1">
              <VirtualizedTableHeader
                headerRef={headerRef as React.RefObject<HTMLDivElement>}
                visibleColumns={filteredColumns}
                getColumnStyle={getColumnStyle}
                zoomLevel={zoomLevel}
                verticalSeparators={verticalSeparators}
                handleHeaderScroll={handleHeaderScroll}
                setColumnOrder={setColumnOrder}
                sortColumn={filterState.sortColumn}
                sortDirection={filterState.sortDirection}
                setSortColumn={setSortColumn}
                headerClassName={headerClassName}
                headerStyle={headerStyle}
              />
            </div>
            {/* Spacer to account for custom scrollbar */}
            <div className="w-3 border-t border-r border-b border-l-0 border-gray-300 bg-gray-200 rounded-tr"></div>
          </div>

          {/* Table Body */}
          <VirtualizedTableBody
          bodyRef={bodyRef as React.RefObject<HTMLDivElement>}
          scrollbarRef={scrollbarRef as React.RefObject<HTMLDivElement>}
          data={filteredData}
          columns={filteredColumns}
          verticalSeparators={verticalSeparators}
          zoomLevel={zoomLevel}
          getColumnStyle={getColumnStyle}
          handleTableMouseDown={handleTableMouseDown}
          handleTableMouseLeave={handleTableMouseLeave}
          handleWheelEvent={handleWheelEvent}
          handleScrollbarMouseDown={handleScrollbarMouseDown}
          handleNativeScroll={handleNativeScroll}
          height={height}
          horizontalSeparators={horizontalSeparators}
          striped={striped}
          hover={hover}
          getTotalSize={getTotalSize}
          getVirtualItems={getVirtualItems}
          measureElement={measureElement}
        />
        </div>
      </section>
    );
  }

export default VirtualizedTable;