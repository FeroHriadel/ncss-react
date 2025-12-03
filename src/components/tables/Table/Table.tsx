import React from 'react'
import TableControlBar from "./TableControlBar";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import { useTableRendering } from "./useTableRendering"
import { useTableZoom } from "./useTableZoom"
import { useTableFilter  } from "./useTableFilter"
import type { FilterPreset } from "./TableFilter";
import './Table.css';



// Re-export FilterPreset for easy importing
export type { FilterPreset } from "./TableFilter";



export interface TableProps {
  data: { [key: string]: string | number | boolean | null | undefined | [] | object | React.ReactNode }[];
  columnsConfig?: { column: string; displayValue: string; width?: string }[];
  horizontalSeparators?: boolean;
  verticalSeparators?: boolean;
  striped?: { enabled: boolean; color?: string } | boolean;
  hover?: { enabled: boolean; color?: string } | boolean;
  controls?: boolean;
  filterPresets?: FilterPreset[];
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  controlBarClassName?: string;
  controlBarStyle?: React.CSSProperties;
  headerClassName?: string;
  headerStyle?: React.CSSProperties;
  ariaLabel?: string;
  ariaDescribedBy?: string;
}



function Table({
  data,
  columnsConfig,
  horizontalSeparators = true,
  verticalSeparators = true,
  striped = true,
  hover = true,
  controls = true,
  filterPresets,
  style, 
  className,
  id='ncss-table',
  ariaLabel,
  ariaDescribedBy,
  controlBarClassName,
  controlBarStyle,
  headerClassName,
  headerStyle,
}: TableProps) {

    // REFS
    const headerRef = React.useRef<HTMLDivElement>(null);
    const bodyRef = React.useRef<HTMLDivElement | null>(null);
    const wrapperRef = React.useRef<HTMLDivElement>(null);

    // COLUMNS    
      // Determine columns from config or infer from data
      const columns = React.useMemo(() => {
        if (columnsConfig && columnsConfig.length > 0) return columnsConfig;
        if (data.length > 0) return Object.keys(data[0]).map(key => ({ column: key, displayValue: key }));
        return [];
      }, [columnsConfig, data]);
      
      // Get column width style
      function getColumnStyle(columnObj: { column: string; displayValue: string; width?: string }) {
        if (columnObj.width) {
          return { width: columnObj.width };
        }
      return {};
    }
  
    // FILTERING
      // Filter data based on search criteria
      const { filteredData, filteredColumns, setColumnsFilter, setColumnOrder, filterState, setFilterConditions, resetFilters, setSortColumn, isSorting } = useTableFilter({ data, columns });

      // Reset scroll position when filters change
      // Only reset when user intentionally changes visible columns
      const prevFilteredColumnsLengthRef = React.useRef(filteredColumns.length);
      React.useEffect(() => {
        // Only reset if number of visible columns changed (user hid/showed columns)
        if (prevFilteredColumnsLengthRef.current !== filteredColumns.length) {
          if (headerRef.current) {
            headerRef.current.scrollLeft = 0;
          }
          if (bodyRef.current) {
            bodyRef.current.scrollLeft = 0;
            bodyRef.current.scrollTop = 0;
          }
          prevFilteredColumnsLengthRef.current = filteredColumns.length;
        }
      }, [filteredColumns.length]);



    // ZOOM
      // Zoom in/out functionality
      const {
        zoomLevel,
        minZoom,
        maxZoom,
        handleZoomIn,
        handleZoomOut,
      } = useTableZoom(1, 0.5, 1.5, 0.1);

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
      // Main scroll logic
      const {
        handleBodyScroll,
        handleWheelEvent,
        handleHeaderScroll,
        handleKeyDown,
        handleTableMouseDown,
        handleTableMouseLeave,
      } = useTableRendering({
        bodyRef,
        headerRef,
        zoomLevel,
        handleZoomIn,
        handleZoomOut,
      });


    // RENDER
    return (
      /* MAIN WRAPPER - WRAPS EVERYTHING */
      <section
        id={id}
        className={`table-wrap ${className || ''}`}
        style={{
          willChange: 'contents',
          ...style
        }}
        role="region"
        aria-label={ariaLabel || "Data table"}
        aria-describedby={ariaDescribedBy}
      >

        {/* Control Bar */}
        {controls && (
          <TableControlBar
            zoomLevel={zoomLevel}
            minZoom={minZoom}
            maxZoom={maxZoom}
            handleZoomIn={handleZoomIn}
            handleZoomOut={handleZoomOut}
            columns={columns}
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
          className="table-wrapper"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onClick={() => wrapperRef.current?.focus()}
          role="table"
          aria-rowcount={filteredData.length}
          aria-colcount={filteredColumns.length}
        >
          
          {/* Fixed Header */}
          <div className="table-header-body-wrapper">
            <div className="table-header-container">
              <TableHeader
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
            <div className="table-scrollbar-spacer"></div>
          </div>

          {/* Table Body */}
          <TableBody
            bodyRef={bodyRef as React.RefObject<HTMLDivElement>}
            data={filteredData}
            columns={filteredColumns}
            verticalSeparators={verticalSeparators}
            zoomLevel={zoomLevel}
            getColumnStyle={getColumnStyle}
            handleTableMouseDown={handleTableMouseDown}
            handleTableMouseLeave={handleTableMouseLeave}
            handleWheelEvent={handleWheelEvent}
            handleBodyScroll={handleBodyScroll}
            horizontalSeparators={horizontalSeparators}
            striped={striped}
            hover={hover}
          />
        </div>
      </section>
    );
  }

export default Table;