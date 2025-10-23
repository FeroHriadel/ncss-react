import React from 'react'
import VirtualizedTableColumnGhost from "./VirtualizedTableColumnGhost";
import VirtualizedTableControlBar from "./VirtualizedTableControlBar";
import VirtualizedTableHeader from "./VirtualizedTableHeader";
import VirtualizedTableBody from "./VirtualizedTableBody";
import { useVirtualizedTableDragAndDrop } from "./useVirtualizedTableDragAndDrop"
import { useVirtualizedTableRendering } from "./useVirtualizedTableRendering"
import { useVirtualizedTableColumns } from "./useVirtualizedTableColumns"
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
  height = "400px",
  horizontalSeparators = true,
  verticalSeparators = true,
  striped = true,
  hover = true
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

    // Zoom functionality
    const {
      zoomLevel,
      minZoom,
      maxZoom,
      handleZoomIn,
      handleZoomOut,
    } = useVirtualizedTableZoom(1, 0.5, 1.5, 0.1);

    // Calculate rows per page based on height
    // Start with a reasonable estimate based on typical row height at current zoom
    const estimatedRowHeight = zoomLevel * 32; // Rough estimate: font size + padding + border
    const heightInPx = parseInt(height) || 500;
    const initialEstimate = Math.min(
      Math.max(3, Math.floor(heightInPx / estimatedRowHeight)),
      data.length
    );
    const [calculatedRowsPerPage, setCalculatedRowsPerPage] = React.useState(initialEstimate);
    
    // Measure actual row height after first render
    React.useEffect(() => {
      if (bodyRef.current && data.length > 0) {
        // Measure multiple rows to get accurate average height including borders
        const allRows = bodyRef.current.querySelectorAll('tbody tr');
        if (allRows.length > 0) {
          // Measure the total height of all currently rendered rows
          const firstRow = allRows[0];
          const lastRow = allRows[allRows.length - 1];
          const firstRect = firstRow.getBoundingClientRect();
          const lastRect = lastRow.getBoundingClientRect();
          const totalHeight = lastRect.bottom - firstRect.top;
          const avgRowHeight = totalHeight / allRows.length;
          
          const heightInPx = parseInt(height) || 500;
          // Subtract 1 from calculated rows to ensure we can always scroll to see the last row fully
          // We render +2 extra rows in the body to fill gaps
          const calculatedRows = Math.max(1, Math.floor(heightInPx / avgRowHeight) - 1);
          // Never render more rows than we have data
          const cappedRows = Math.min(calculatedRows, data.length);
          setCalculatedRowsPerPage(cappedRows);
        }
      }
    }, [bodyRef, data.length, height, zoomLevel]);

    // Rendering (Rows + Scrolling + Dragging)
    const {
      startRowIndex,
      rowsPerPage,
      handleWheelEvent,
      handleHeaderScroll,
      handleTableMouseDown,
      handleTableMouseLeave,
      handleScrollbarMouseDown,
      handleKeyDown,
    } = useVirtualizedTableRendering({
      data,
      rowsPerPage: calculatedRowsPerPage,
      bodyRef,
      headerRef,
      scrollbarRef,
    });

    // Row hover effect
    // ...existing code...

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

        <VirtualizedTableBody
          bodyRef={bodyRef as React.RefObject<HTMLDivElement>}
          scrollbarRef={scrollbarRef as React.RefObject<HTMLDivElement>}
          data={data}
          columnOrder={getVisibleColumns(columnOrder)}
          getVisibleColumns={order => getVisibleColumns(order.map(col => col.column))}
          verticalSeparators={verticalSeparators}
          zoomLevel={zoomLevel}
          rowsPerPage={rowsPerPage}
          startRowIndex={startRowIndex}
          getColumnStyle={getColumnStyle}
          handleTableMouseDown={handleTableMouseDown}
          handleTableMouseLeave={handleTableMouseLeave}
          handleWheelEvent={handleWheelEvent}
          handleScrollbarMouseDown={handleScrollbarMouseDown}
          handleKeyDown={handleKeyDown}
          height={height}
          horizontalSeparators={horizontalSeparators}
          striped={striped}
          hover={hover}
        />

        {ghostElement && (
            <VirtualizedTableColumnGhost
              x={ghostElement.x}
              y={ghostElement.y}
              text={ghostElement.text}
            />
        )}
      </section>
    );
  }

export default VirtualizedTable;