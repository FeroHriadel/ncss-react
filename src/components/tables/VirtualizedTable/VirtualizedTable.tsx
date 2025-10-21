import React from 'react'
import VirtualizedTableControlBar from "./VirtualizedTableControlBar";
import VirtualizedTableHeader from "./VirtualizedTableHeader";
import { useVirtualizedTableDragAndDrop } from "./useVirtualizedTableDragAndDrop"
import { useVirtualizedTableScroll } from "./useVirtualizedTableScroll"
import { useVirtualizedTableColumns } from "./useVirtualizedTableColumns"
import { useVirtualizedTableRows } from "./useVirtualizedTableRows"
import { useVirtualizedTableZoom } from "./useVirtualizedTableZoom"



export interface VirtualizedTableProps {
  data: { [key: string]: string | number | boolean | null | undefined | [] | object | React.ReactNode }[];
  columnsConfig?: { column: string; displayValue: string; width?: string }[];
  height?: string; // Optional height prop (e.g., "400px", "22rem", "50vh")
  horizontalSeparators?: boolean; // Show horizontal borders between rows (default: true)
  verticalSeparators?: boolean; // Show vertical borders between columns (default: true)
  striped?: { enabled: boolean; color?: string } | boolean; // Alternate row colors with optional custom color
  hover?: { enabled: boolean; color?: string } | boolean; // Enable hover effects on rows with optional custom color
}



function VirtualizedTable({
  data,
  columnsConfig,
  // height = "400px",
  // horizontalSeparators = true,
  verticalSeparators = true,
  // striped = true,
  // hover = true
}: VirtualizedTableProps) {
    // Refs
    const headerRef = React.useRef<HTMLDivElement>(null);
    const bodyRef = React.useRef<HTMLDivElement | null>(null);
    const scrollbarRef = React.useRef<HTMLDivElement | null>(null);

    // Columns
    function getColumns() {
      if (columnsConfig && columnsConfig.length > 0) return columnsConfig;
      if (data.length > 0) return Object.keys(data[0]).map(key => ({ column: key, displayValue: key }));
      return [];
    }
    const columns = getColumns();

    // Column Drag and Drop
    const {
      columnOrder,
      draggedColumn,
      dragOverColumn,
      ghostElement,
      handleColumnMouseDown,
      handleColumnMouseUp,
      handleColumnMouseEnter,
      handleColumnMouseLeave,
    } = useVirtualizedTableDragAndDrop({ columns });

    // Column Visibility
    const {
      toggleColumnVisibility,
      getVisibleColumns,
    } = useVirtualizedTableColumns({ columns });

    // Column Visibility Toggle Options
    const dropdownOptions = columns.map(col => ({
      value: col.column,
      displayValue: col.displayValue,
      onClick: () => toggleColumnVisibility(col.column)
    }));
    const preselectedDropdownOptions = columns.map(col => col.column);

    // Rows
    const {
      startRowIndex,
      setStartRowIndex,
      rowsPerPage,
      handleWheelEvent,
    } = useVirtualizedTableRows({ data, rowsPerPage: 15 });

    // Scrollbar Dragging
    const {
      handleHeaderScroll,
      handleTableMouseDown,
      handleTableMouseLeave,
      handleScrollbarMouseDown,
    } = useVirtualizedTableScroll({
      bodyRef,
      headerRef,
      scrollbarRef,
      startRowIndex,
      setStartRowIndex,
      rowsPerPage,
      dataLength: data.length,
    });

    // Row hover effect
    // ...existing code...

    // Zoom functionality
    const {
      zoomLevel,
      minZoom,
      maxZoom,
      handleZoomIn,
      handleZoomOut,
    } = useVirtualizedTableZoom(1, 0.5, 1.5, 0.1);

    // Get column width style
    function getColumnStyle(columnObj: { column: string; displayValue: string; width?: string }) {
      if (columnObj.width) {
        return { width: columnObj.width };
      }
      return {};
    }

    // Render
    return (
      <section className='virtualized-table-wrap'>
        <VirtualizedTableControlBar
          dropdownOptions={dropdownOptions}
          preselectedDropdownOptions={preselectedDropdownOptions}
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
              columnOrder={getVisibleColumns(columnOrder)}
              getVisibleColumns={() => getVisibleColumns(columnOrder)}
              draggedColumn={draggedColumn}
              dragOverColumn={dragOverColumn}
              getColumnStyle={getColumnStyle}
              zoomLevel={zoomLevel}
              verticalSeparators={verticalSeparators}
              handleHeaderScroll={handleHeaderScroll}
              handleColumnMouseDown={handleColumnMouseDown}
              handleColumnMouseUp={handleColumnMouseUp}
              handleColumnMouseEnter={handleColumnMouseEnter}
              handleColumnMouseLeave={handleColumnMouseLeave}
            />
          </div>
          {/* Spacer to account for custom scrollbar */}
          <div className="w-2 border-t border-r border-gray-300 bg-gray-50"></div>
        </div>

        {/* Scrollable Body with Custom Scrollbar */}
        <div className="flex">
          <div 
            ref={bodyRef}
            className="overflow-auto border-l border-r border-b border-gray-300 [&::-webkit-scrollbar]:hidden flex-1"
            style={{ 
              height: '400px',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
            onMouseDown={handleTableMouseDown}
            onMouseLeave={handleTableMouseLeave}
            onWheel={handleWheelEvent}
          >
            <table className="w-full min-h-full border-collapse" style={{ 
              tableLayout: 'fixed',
              fontSize: `${zoomLevel}rem`,
              transition: 'font-size 0.2s ease-out'
            }}>
              <tbody>
                {data.slice(startRowIndex, startRowIndex + rowsPerPage).map((row, i) => (
                  <tr key={i} className="border-b border-gray-200">
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
                            verticalSeparators && index < getVisibleColumns(columnOrder).length - 1 ? 'border-r border-gray-200' : ''
                          }`}
                          style={{
                            ...getColumnStyle(col),
                            padding: `${zoomLevel * 0.5}rem ${zoomLevel * 1}rem`
                          }}
                        >
                          {renderedValue}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Custom Scrollbar */}
          <div 
            ref={scrollbarRef}
            className="w-2 bg-gray-50 border-r border-b border-gray-300 relative cursor-pointer select-none"
            style={{ height: '400px' }}
            onMouseDown={handleScrollbarMouseDown}
          >
            <div className="absolute inset-x-0 top-1 bottom-1 bg-gray-200 rounded-full mx-0.5"></div>
            {/* Scrollbar Thumb (dummy, not interactive) */}
            <div 
              className="absolute bg-gray-400 rounded-full transition-all duration-200 ease-out mx-0.5"
              style={{
                height: `${Math.max(20, (rowsPerPage / data.length) * 80)}%`,
                top: `${2 + (startRowIndex / Math.max(1, data.length - rowsPerPage)) * (96 - Math.max(20, (rowsPerPage / data.length) * 80))}%`,
                left: '1px',
                right: '1px'
              }}
            />
          </div>
        </div>

        {ghostElement && (
          <div
            className="fixed pointer-events-none z-50 bg-white border border-gray-300 px-2 py-1 rounded shadow-lg text-sm"
            style={{
              left: ghostElement.x + 15,
              top: ghostElement.y - 5,
              transform: 'translateY(-50%)'
            }}
          >
            {ghostElement.text}
          </div>
        )}
      </section>
    );
  }

export default VirtualizedTable;