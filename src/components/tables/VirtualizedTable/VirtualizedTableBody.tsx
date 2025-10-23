import React from "react";

interface Column {
  column: string;
  displayValue: string;
  width?: string;
}

interface VirtualizedTableBodyProps {
  bodyRef: React.RefObject<HTMLDivElement>;
  scrollbarRef: React.RefObject<HTMLDivElement>;
  data: import("./VirtualizedTable").VirtualizedTableProps["data"];
  columnOrder: Column[];
  getVisibleColumns: (order: Column[]) => Column[];
  verticalSeparators: boolean;
  horizontalSeparators: boolean;
  zoomLevel: number;
  rowsPerPage: number;
  startRowIndex: number;
  getColumnStyle: (col: Column) => React.CSSProperties;
  handleTableMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleTableMouseLeave: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleWheelEvent: (e: React.WheelEvent<HTMLDivElement>) => void;
  handleScrollbarMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
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
  columnOrder,
  getVisibleColumns,
  verticalSeparators,
  horizontalSeparators,
  zoomLevel,
  rowsPerPage,
  startRowIndex,
  getColumnStyle,
  handleTableMouseDown,
  handleTableMouseLeave,
  handleWheelEvent,
  handleScrollbarMouseDown,
  handleKeyDown,
  handleNativeScroll,
  height,
  striped,
  hover,
  getTotalSize,
  getVirtualItems,
  measureElement,
}) => {
  const handleMouseDownWithFocus = (e: React.MouseEvent<HTMLDivElement>) => {
    // Ensure the container gets focus when clicked
    if (bodyRef.current) {
      bodyRef.current.focus();
    }
    handleTableMouseDown(e);
  };

  const virtualItems = getVirtualItems();
  const totalSize = getTotalSize();
  
  // Ref to measure column widths
  const tableRef = React.useRef<HTMLTableElement>(null);
  const [columnPositions, setColumnPositions] = React.useState<number[]>([]);
  const prevPositionsRef = React.useRef<string>('');
  
  // Get visible columns count for stable dependency
  const visibleColumnsCount = getVisibleColumns(columnOrder).length;
  
  // Measure column positions
  React.useEffect(() => {
    if (tableRef.current) {
      const firstRow = tableRef.current.querySelector('tbody tr');
      if (firstRow) {
        const cells = firstRow.querySelectorAll('td');
        const positions: number[] = [];
        let cumulativeWidth = 0;
        
        cells.forEach((cell, index) => {
          if (index < cells.length - 1) { // Don't add line after last column
            cumulativeWidth += cell.offsetWidth;
            positions.push(cumulativeWidth);
          }
        });
        
        // Only update if positions actually changed
        const positionsStr = JSON.stringify(positions);
        if (positionsStr !== prevPositionsRef.current) {
          prevPositionsRef.current = positionsStr;
          setColumnPositions(positions);
        }
      }
    }
  }, [zoomLevel, visibleColumnsCount]); // Stable dependencies only


  return (
  <div className="flex">
    <div
      ref={bodyRef}
      tabIndex={0}
      className="overflow-auto border-l border-r border-b border-gray-300 [&::-webkit-scrollbar]:hidden flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
      style={{
        height,
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
      onMouseDown={handleMouseDownWithFocus}
      onMouseLeave={handleTableMouseLeave}
      onWheel={handleWheelEvent}
      onKeyDown={handleKeyDown}
      onScroll={handleNativeScroll}
    >
      {/* Container with total size */}
      <div
        style={{
          height: `${totalSize}px`,
          width: '100%',
          position: 'relative',
        }}
      >
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
            zIndex: 10,
            backgroundColor: 'transparent',
          }}
        >
          <tbody>
            {virtualItems.map((virtualRow) => {
              const row = data[virtualRow.index];
              const rowIndex = virtualRow.index;
              
              // Hover logic - for hover effect
              let hoverClass = '';
              if (hover && (typeof hover === 'boolean' ? hover : hover.enabled)) {
                hoverClass = typeof hover === 'object' && hover.color ? `hover:${hover.color}` : 'hover:bg-gray-100';
              }

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
                >
              {getVisibleColumns(columnOrder).map((col, index) => {
                const cellValue = row[col.column];
                let renderedValue;
                if (cellValue === null || cellValue === undefined) {
                  renderedValue = '';
                } else if (Array.isArray(cellValue)) {
                  renderedValue = String(cellValue);
                } else if (React.isValidElement(cellValue)) {
                  renderedValue = cellValue as React.ReactNode;
                } else if (typeof cellValue === 'object') {
                  renderedValue = JSON.stringify(cellValue);
                } else {
                  renderedValue = String(cellValue);
                }
                
                // Build cell classes: vertical separator only (no bg, no horizontal border)
                const verticalSepClass = verticalSeparators && index < getVisibleColumns(columnOrder).length - 1
                  ? 'border-r border-gray-200'
                  : '';
                
                return (
                  <td
                    key={col.column}
                    className={`${verticalSepClass} ${hoverClass}`.trim()}
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
      
      {/* Absolute positioned backgrounds and separator lines */}
      {virtualItems.map((virtualRow) => {
        const rowIndex = virtualRow.index;
        const linePosition = virtualRow.start + virtualRow.size;
        
        // Striped background for the area
        let bgColor = 'white';
        if (striped && (typeof striped === 'boolean' ? striped : striped.enabled)) {
          bgColor = rowIndex % 2 === 1 ? 'rgb(243 244 246)' : 'white';
        }
        
        return (
          <React.Fragment key={`sep-${virtualRow.key}`}>
            {/* Background fill for this row */}
            <div
              style={{
                position: 'absolute',
                top: `${virtualRow.start}px`,
                left: 0,
                right: 0,
                height: `${virtualRow.size}px`,
                backgroundColor: bgColor,
                pointerEvents: 'none',
                zIndex: 5,
              }}
            />
            {/* Horizontal separator line */}
            {horizontalSeparators && (
              <div
                style={{
                  position: 'absolute',
                  top: `${linePosition}px`,
                  left: 0,
                  right: 0,
                  height: '1px',
                  backgroundColor: 'rgb(229 231 235)',
                  pointerEvents: 'none',
                  zIndex: 100,
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
            zIndex: 100,
          }}
        />
      ))}
      </div>
    </div>
    {/* Custom Scrollbar */}
    <div
      ref={scrollbarRef}
      className="w-2 bg-gray-50 border-r border-b border-gray-300 relative cursor-pointer select-none"
      style={{ height }}
      onMouseDown={handleScrollbarMouseDown}
    >
      <div className="absolute inset-x-0 top-1 bottom-1 bg-gray-200 rounded-full mx-0.5"></div>
      {/* Scrollbar Thumb (dummy, not interactive) */}
      {(() => {
        // Calculate thumb size as percentage of visible rows vs total rows
        const thumbHeightPercent = Math.max(20, (rowsPerPage / data.length) * 100);
        // Calculate scroll progress (0 to 1)
        const scrollProgress = startRowIndex / Math.max(1, data.length - rowsPerPage);
        // Available space for thumb movement (track height - thumb height)
        const availableSpace = 100 - thumbHeightPercent;
        // Position thumb within the track, accounting for 4px (1rem = ~4px) padding
        const topPosition = 1 + (scrollProgress * availableSpace * 0.96); // 96% to account for padding
        
        return (
          <div
            className="absolute bg-gray-400 rounded-full transition-all duration-200 ease-out mx-0.5"
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
