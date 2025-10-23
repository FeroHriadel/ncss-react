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
  height: string;
  striped: boolean | { enabled: boolean; color?: string };
  hover: boolean | { enabled: boolean; color?: string };
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
  height,
  striped,
  hover,
}) => {
  const handleMouseDownWithFocus = (e: React.MouseEvent<HTMLDivElement>) => {
    // Ensure the container gets focus when clicked
    if (bodyRef.current) {
      bodyRef.current.focus();
    }
    handleTableMouseDown(e);
  };

  return (
  <div className="flex">
    <div
      ref={bodyRef}
      tabIndex={0}
      className="overflow-x-auto overflow-y-hidden border-l border-r border-b border-gray-300 [&::-webkit-scrollbar]:hidden flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
      style={{
        height,
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
      onMouseDown={handleMouseDownWithFocus}
      onMouseLeave={handleTableMouseLeave}
      onWheel={handleWheelEvent}
      onKeyDown={handleKeyDown}
    >
      <table
        className="w-full border-collapse"
        style={{
          tableLayout: 'fixed',
          fontSize: `${zoomLevel}rem`,
          transition: 'font-size 0.2s ease-out',
        }}
      >
        <tbody>
          {(() => {
            // Render extra rows to fill container and ensure last row is fully visible
            const isAtEnd = startRowIndex >= data.length - rowsPerPage;
            const endIndex = isAtEnd 
              ? data.length  // Show all remaining rows when at end
              : Math.min(startRowIndex + rowsPerPage + 2, data.length); // Render +2 extra to fill gaps
            return data.slice(startRowIndex, endIndex);
          })().map((row, i) => {
            // Striped logic
            let stripedClass = '';
            if (striped && (typeof striped === 'boolean' ? striped : striped.enabled)) {
              stripedClass = i % 2 === 1 ? (typeof striped === 'object' && striped.color ? striped.color : 'bg-gray-100') : '';
            }
            // Hover logic
            let hoverClass = '';
            if (hover && (typeof hover === 'boolean' ? hover : hover.enabled)) {
              hoverClass = typeof hover === 'object' && hover.color ? `hover:${hover.color}` : 'hover:bg-gray-100';
            }
            // Horizontal separators
            const horizontalSepClass = horizontalSeparators ? 'border-b border-gray-200' : '';

            return (
              <tr key={i} className={`${horizontalSepClass} ${stripedClass} ${hoverClass}`.trim()}>
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
                return (
                  <td
                    key={col.column}
                    className={`break-words ${
                      verticalSeparators && index < getVisibleColumns(columnOrder).length - 1
                        ? 'border-r border-gray-200'
                        : ''
                    }`}
                    style={{
                      ...getColumnStyle(col),
                      padding: '0.375rem 0.75rem', // Fixed conservative padding (6px 12px)
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
