import React from "react";
import type { VirtualizedTableProps } from "./VirtualizedTable";



export interface Column {
  column: string;
  displayValue: string;
  width?: string;
}



interface VirtualizedTableBodyProps {
  bodyRef: React.RefObject<HTMLDivElement>;
  scrollbarRef: React.RefObject<HTMLDivElement>;
  data: VirtualizedTableProps["data"];
  columns: Column[];
  verticalSeparators: boolean;
  horizontalSeparators: boolean;
  zoomLevel: number;
  getColumnStyle: (col: Column) => React.CSSProperties;
  handleTableMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleTableMouseLeave: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleWheelEvent: (e: React.WheelEvent<HTMLDivElement>) => void;
  handleScrollbarMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleNativeScroll: (e: React.UIEvent<HTMLDivElement>) => void;
  height: string;
  striped: boolean | { enabled: boolean; color?: string };
  hover: boolean | { enabled: boolean; color?: string };
  getTotalSize: () => number;
  getVirtualItems: () => Array<{ index: number; start: number; size: number; key: number }>;
  measureElement: (node: HTMLTableRowElement | null, index: number) => void;
}



const VirtualizedTableBody: React.FC<VirtualizedTableBodyProps> = ({
  bodyRef,
  scrollbarRef,
  data,
  columns,
  verticalSeparators,
  horizontalSeparators,
  zoomLevel,
  getColumnStyle,
  handleTableMouseDown,
  handleTableMouseLeave,
  handleWheelEvent,
  handleScrollbarMouseDown,
  handleNativeScroll,
  height,
  striped,
  hover,
  getTotalSize,
  getVirtualItems,
  measureElement,
}) => {

  // VALUES
    // State and Refs
    const tableRef = React.useRef<HTMLTableElement>(null);
    const prevPositionsRef = React.useRef<string>('');
    const [tableScrollWidth, setTableScrollWidth] = React.useState<number>(0);
    const [columnPositions, setColumnPositions] = React.useState<number[]>([]);
    const [hoveredRowIndex, setHoveredRowIndex] = React.useState<number | null>(null);
    const virtualItems = getVirtualItems();
    const totalSize = getTotalSize();
    const visibleColumnsCount = columns.length;
  

  // HELPER FUNCTIONS
    // Get background color for a row (striped or white)
    function getRowBackgroundColor(rowIndex: number): string {
      if (!striped) return 'white';
      const stripedEnabled = typeof striped === 'boolean' ? striped : striped.enabled;
      if (!stripedEnabled) return 'white';
      return rowIndex % 2 === 1 ? 'rgb(243 244 246)' : 'white';
    }
    
    // Get hover CSS class for rows
    function getHoverBackgroundColor(): string | undefined {
      if (!hover) return undefined;
      const hoverEnabled = typeof hover === 'boolean' ? hover : hover.enabled;
      if (!hoverEnabled) return undefined;
      const customColor = typeof hover === 'object' ? hover.color : undefined;
      return customColor || 'rgb(243 244 246)'; // default to gray-100
    }
    
    // Render cell content (handles different data types)
    function renderCellValue(cellValue: unknown): React.ReactNode {
      if (React.isValidElement(cellValue)) return cellValue;
      if (typeof cellValue !== 'string') return JSON.stringify(cellValue);
      return String(cellValue);
    }
  
  
  // EVENT HANDLERS
    // Update scroll width on scroll
    function handleScrollWithUpdate(e: React.UIEvent<HTMLDivElement>) {
      handleNativeScroll(e);
      
      if (tableRef.current) {
        const newWidth = tableRef.current.scrollWidth;
        if (newWidth !== tableScrollWidth) setTableScrollWidth(newWidth);
      }
    }
  

  // EFFECTS
    // Measure column positions and table scroll width
    React.useEffect(() => {
      if (!tableRef.current) return;
        //helper function to measure column positions
        function measureColumns() {
          if (!tableRef.current) return;
          setTableScrollWidth(tableRef.current.scrollWidth); //update table scroll width for horizontal backgrounds/lines
          //measure column widths for vertical separator lines
          const firstRow = tableRef.current.querySelector('tbody tr');
          if (!firstRow) return;
          const cells = firstRow.querySelectorAll('td');
          const positions: number[] = [];
          let cumulativeWidth = 0;
          cells.forEach((cell, index) => {
            if (index < cells.length - 1) {
              cumulativeWidth += cell.offsetWidth;
              positions.push(cumulativeWidth);
            }
          });
          //only update state if positions changed (avoid unnecessary re-renders)
          const positionsStr = JSON.stringify(positions);
          if (positionsStr !== prevPositionsRef.current) {
            prevPositionsRef.current = positionsStr;
            setColumnPositions(positions);
          }
        }
      measureColumns(); //measure initially
      const handleResize = () => measureColumns(); //remeasure on window resize (e.g., DevTools open/close)
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, [zoomLevel, visibleColumnsCount, columns]);
  
  
  // RENDER
  return (
  <div className="flex">
    {/* Main scrollable container */}
    <div
      ref={bodyRef}
      className="overflow-auto border-l border-r border-b border-gray-300 rounded-bl [&::-webkit-scrollbar]:hidden flex-1 focus:outline-none"
      style={{
        height: totalSize > 0 && totalSize < (parseInt(height) || 400) 
          ? `${totalSize}px` 
          : height,
        maxHeight: height,
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
      onMouseDown={handleTableMouseDown}
      onMouseLeave={handleTableMouseLeave}
      onWheel={handleWheelEvent}
      onScroll={handleScrollWithUpdate}
    >
      {/* Container with total virtual height */}
      <div
        style={{
          height: `${totalSize}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {/* Table with absolutely positioned rows */}
        <table
          ref={tableRef}
          className="w-full border-collapse"
          style={{
            tableLayout: 'fixed',
            fontSize: `${zoomLevel}rem`,
            transition: 'font-size 0.2s ease-out',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 3,
            backgroundColor: 'transparent',
          }}
        >
          <tbody>
            {virtualItems.map((virtualRow) => {
              const row = data[virtualRow.index];
              const rowIndex = virtualRow.index;

              return (
                <tr 
                  key={virtualRow.key}
                  ref={(node) => measureElement(node, rowIndex)}
                  className="group"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    transform: `translateY(${virtualRow.start}px)`,
                    display: 'table',
                    tableLayout: 'fixed',
                  }}
                  onMouseEnter={() => setHoveredRowIndex(rowIndex)}
                  onMouseLeave={() => setHoveredRowIndex(null)}
                >
              {columns.map((col, index) => {
                const cellValue = row[col.column];
                const renderedValue = renderCellValue(cellValue);
                
                // Apply vertical separator to all columns except last
                const verticalSepClass = verticalSeparators && index < columns.length - 1
                  ? 'border-r border-gray-200'
                  : '';
                
                return (
                  <td
                    key={col.column}
                    className={verticalSepClass}
                    style={{
                      ...getColumnStyle(col),
                      padding: '0.375rem 0.75rem',
                      backgroundColor: 'transparent',
                      wordWrap: 'break-word',
                      overflowWrap: 'break-word',
                    }}
                  >
                    {renderedValue}
                  </td>
                );
              })}
            </tr>
          );
        })}
        </tbody>
      </table>
      
      {/* Absolute positioned backgrounds for striped rows */}
      {virtualItems.map((virtualRow) => {
        const rowIndex = virtualRow.index;
        const bgColor = getRowBackgroundColor(rowIndex);
        const hoverEnabled = getHoverBackgroundColor() !== undefined;
        const isHovered = hoveredRowIndex === rowIndex;
        
        return (
          <React.Fragment key={`bg-${virtualRow.key}`}>
            {/* Background fill */}
            <div
              style={{
                position: 'absolute',
                top: `${virtualRow.start}px`,
                left: 0,
                width: tableScrollWidth > 0 ? `${tableScrollWidth}px` : '100%',
                height: `${virtualRow.size}px`,
                backgroundColor: bgColor,
                pointerEvents: 'none',
                zIndex: 1,
              }}
            />
            {/* Hover overlay - uses bg-gray-200 background */}
            {hoverEnabled && (
              <div
                style={{
                  position: 'absolute',
                  top: `${virtualRow.start}px`,
                  left: 0,
                  width: tableScrollWidth > 0 ? `${tableScrollWidth}px` : '100%',
                  height: `${virtualRow.size}px`,
                  backgroundColor: 'rgb(229, 231, 235)', // Tailwind gray-200
                  pointerEvents: 'none',
                  zIndex: 2,
                  opacity: isHovered ? 1 : 0,
                  transition: 'opacity 0.15s ease-in-out',
                }}
              />
            )}
            {/* Horizontal separator line */}
            {horizontalSeparators && (
              <div
                style={{
                  position: 'absolute',
                  top: `${virtualRow.start + virtualRow.size}px`,
                  left: 0,
                  width: tableScrollWidth > 0 ? `${tableScrollWidth}px` : '100%',
                  height: '1px',
                  backgroundColor: 'rgb(229 231 235)',
                  pointerEvents: 'none',
                  zIndex: 1,
                }}
              />
            )}
          </React.Fragment>
        );
      })}
      
      {/* Vertical separator lines spanning full height */}
      {verticalSeparators && columnPositions.map((position, index) => (
        <div
          key={`vcol-${index}`}
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: `${position}px`,
            width: '1px',
            backgroundColor: 'rgb(229 231 235)',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
      ))}
      </div>
    </div>
    
    {/* Custom Scrollbar */}
    <div
      ref={scrollbarRef}
      className="w-3 bg-gray-50 border-r border-b border-gray-300 rounded-br relative cursor-pointer select-none"
      style={{ 
        height: totalSize > 0 && totalSize < (parseInt(height) || 400) 
          ? `${totalSize}px` 
          : height
      }}
      onMouseDown={handleScrollbarMouseDown}
    >
      {/* Scrollbar track */}
      <div className="absolute inset-x-0 top-1 bottom-1 bg-gray-200 rounded-full mx-0.5"></div>
      
      {/* Scrollbar thumb - reflects actual scroll position */}
      {(() => {
        if (!bodyRef.current) return null;
        
        const containerHeight = bodyRef.current.clientHeight || 500;
        const scrollTop = bodyRef.current.scrollTop || 0;
        
        // Calculate thumb size based on viewport vs total content
        const thumbHeightPercent = Math.max(10, (containerHeight / totalSize) * 100);
        
        // Calculate scroll progress (0 to 1)
        const maxScroll = totalSize - containerHeight;
        const scrollProgress = maxScroll > 0 ? scrollTop / maxScroll : 0;
        
        // Available space for thumb movement
        const availableSpace = 100 - thumbHeightPercent;
        
        // Position thumb within available space
        const topPosition = scrollProgress * availableSpace;
        
        return (
          <div
            className="absolute bg-gray-400 rounded-full transition-all duration-100 ease-out mx-0.5"
            style={{
              height: `${thumbHeightPercent}%`,
              top: `${topPosition}%`,
              left: '1px',
              right: '1px',
            }}
          />
        );
      })()}
    </div>
  </div>
  );
};

export default VirtualizedTableBody;
