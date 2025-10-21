import React from 'react'
import { useVirtualizedTableDragAndDrop } from "./useVirtualizedTableDragAndDrop"
import { useVirtualizedTableScroll } from "./useVirtualizedTableScroll"
import { useVirtualizedTableColumns } from "./useVirtualizedTableColumns"
import { useVirtualizedTableRows } from "./useVirtualizedTableRows"
import { useVirtualizedTableZoom } from "./useVirtualizedTableZoom"
import { CiZoomIn, CiZoomOut } from "react-icons/ci"
import ButtonIcon from "../../buttons/ButtonIcon"
import { HiOutlineViewColumns } from "react-icons/hi2"
import DropdownIcon from "../../dropdowns/DropdownIcon"

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
  const columns = getColumns();
  const [columnOrder, setColumnOrder] = React.useState<string[]>([]);
  const {
    draggedColumn,
    dragOverColumn,
    ghostElement,
    handleColumnMouseDown,
    handleColumnMouseMove,
    handleColumnMouseUp,
    handleColumnMouseEnter,
    handleColumnMouseLeave,
  } = useVirtualizedTableDragAndDrop({ columns, columnOrder, setColumnOrder });
  const {
    toggleColumnVisibility,
    getVisibleColumns,
  } = useVirtualizedTableColumns({ columns });
  const dropdownOptions = columns.map(col => ({
    value: col.column,
    displayValue: col.displayValue,
    onClick: () => toggleColumnVisibility(col.column)
  }));
  const {
    startRowIndex,
    setStartRowIndex,
    rowsPerPage,
    getVisibleRows,
    handleWheelEvent,
    handleBodyScroll,
  } = useVirtualizedTableRows({ data, rowsPerPage: 15 });
  const { start: visibleStart, rows: visibleRows } = getVisibleRows();
  const {
    handleScrollbarMouseDown,
    handleTableMouseDown,
    handleTableMouseLeave,
    isDraggingScrollbar,
  } = useVirtualizedTableScroll({
    bodyRef,
    scrollbarRef,
    startRowIndex,
    setStartRowIndex,
    rowsPerPage,
    dataLength: data.length,
  });
  // Row hover effect - handle both boolean and object formats from props
  const hoverConfig = React.useMemo(() => {
    if (typeof hover === 'boolean') {
      return { enabled: hover, color: undefined }
    }
    return { enabled: hover.enabled, color: hover.color }
  }, [hover]);
  // Striped table prop - handle both boolean and object formats from props
  const stripedConfig = React.useMemo(() => {
    if (typeof striped === 'boolean') {
      return { enabled: striped, color: undefined }
    }
    return { enabled: striped.enabled, color: striped.color }
  }, [striped]);
  const preselectedDropdownOptions = columns.map(col => col.column);

  // Zoom functionality
  const {
    zoomLevel,
    minZoom,
    maxZoom,
    handleZoomIn,
    handleZoomOut,
  } = useVirtualizedTableZoom(1, 0.5, 1.5, 0.1);

  // ...all hooks and variables are now declared above...

  // Initialize column order when columns change
  React.useEffect(() => {
    if (columns.length > 0 && columnOrder.length === 0) {
      setColumnOrder(columns.map(col => col.column));
    }
  }, [columns, columnOrder.length]);

  // Handle global mouse events for column dragging
  React.useEffect(() => {
    if (draggedColumn) {
      document.addEventListener('mousemove', handleColumnMouseMove)
      document.addEventListener('mouseup', () => handleColumnMouseUp())
    }

    return () => {
      document.removeEventListener('mousemove', handleColumnMouseMove)
      document.removeEventListener('mouseup', () => handleColumnMouseUp())
    }
  }, [draggedColumn, handleColumnMouseMove, handleColumnMouseUp])

  const handleHeaderScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (bodyRef.current) {
      bodyRef.current.scrollLeft = e.currentTarget.scrollLeft
    }
  }

  // Get column headers - use columnsConfig if provided, otherwise use data keys
  function getColumns() {
    if (columnsConfig && columnsConfig.length > 0) return columnsConfig
    if (data.length > 0) return Object.keys(data[0]).map(key => ({ column: key, displayValue: key }))
    return []
  }

  // Get column width style
  function getColumnStyle(columnObj: { column: string; displayValue: string; width?: string }) {
    if (columnObj.width) {
      return { width: columnObj.width }
    }
    return {}
  }


  // Render
  return (
    <section className='virtualized-table-wrap'>
      {/* Control Bar */}
      <div className="w-full flex justify-between items-center p-2 border border-gray-300 bg-gray-50">
        <div className="flex items-center">
          <span className="text-sm text-gray-600">Controls</span>
        </div>
        <div className="flex items-center gap-2 relative">
          {/* Column Visibility Toggle */}
          <DropdownIcon
            className="relative"
            icon={<HiOutlineViewColumns size={20} />}
            title="Toggle Columns"
            options={dropdownOptions}
            preselectedOptions={preselectedDropdownOptions}
          />
          
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
      
      {/* Fixed Header */}
      <div className="flex">
        <div className="border border-gray-300 overflow-hidden flex-1">
          <div 
            ref={headerRef}
            style={{ 
              overflow: 'auto',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
            className="[&::-webkit-scrollbar]:hidden"
            onScroll={handleHeaderScroll}
          >
            <table className="w-full border-collapse" style={{ 
              tableLayout: 'fixed',
              fontSize: `${zoomLevel}rem`, // Scale font size instead of transform
              transition: 'font-size 0.2s ease-out'
            }}>
              <thead className="bg-gray-50">
                <tr>
                  {getVisibleColumns(columnOrder).map((col, index) => (
                    <th 
                      key={col.column} 
                      className={`text-left break-words cursor-move select-none transition-colors ${
                        verticalSeparators && index < getVisibleColumns(columnOrder).length - 1 ? 'border-r border-gray-200' : ''
                      } ${
                        draggedColumn === col.column ? 'opacity-50' : ''
                      } ${
                        dragOverColumn === col.column ? 'bg-blue-100' : ''
                      }`}
                      style={{
                        ...getColumnStyle(col),
                        padding: `${zoomLevel * 0.5}rem ${zoomLevel * 1}rem` // Scale padding with zoom
                      }}
                      onMouseDown={(e) => handleColumnMouseDown(e, col.column, col.displayValue)}
                      onMouseUp={() => handleColumnMouseUp(col.column)}
                      onMouseEnter={() => handleColumnMouseEnter(col.column)}
                      onMouseLeave={handleColumnMouseLeave}
                    >
                      {col.displayValue}
                    </th>
                  ))}
                </tr>
              </thead>
            </table>
          </div>
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
            height: height, // Keep original height
            scrollbarWidth: 'none', /* Firefox */
            msOverflowStyle: 'none', /* Internet Explorer 10+ */
          }}
          onScroll={handleBodyScroll}
          onWheel={handleWheelEvent}
          onMouseDown={handleTableMouseDown}
          onMouseLeave={handleTableMouseLeave}
        >
          <table className="w-full min-h-full border-collapse" style={{ 
            tableLayout: 'fixed',
            fontSize: `${zoomLevel}rem`, // Scale font size instead of transform
            transition: 'font-size 0.2s ease-out'
          }}>
            <tbody>
              {/* Render only current page rows */}
              {visibleRows.map((row: VirtualizedTableProps["data"][number], i: number) => {
                const rowIndex = visibleStart + i
                
                return (
                  <tr 
                    key={rowIndex} 
                    className={`${horizontalSeparators ? 'border-b border-gray-200' : ''} ${
                      stripedConfig.enabled && rowIndex % 2 === 1 && !stripedConfig.color ? 'bg-gray-100' : ''
                    } ${
                      hoverConfig.enabled && !hoverConfig.color ? 'hover:bg-gray-200' : ''
                    }`}
                    style={{
                      backgroundColor: stripedConfig.enabled && rowIndex % 2 === 1 && stripedConfig.color 
                        ? stripedConfig.color 
                        : undefined
                    }}
                    onMouseEnter={hoverConfig.enabled && hoverConfig.color ? (e) => {
                      e.currentTarget.style.backgroundColor = hoverConfig.color!
                    } : undefined}
                    onMouseLeave={hoverConfig.enabled && hoverConfig.color ? (e) => {
                      const stripedBg = stripedConfig.enabled && rowIndex % 2 === 1 
                        ? stripedConfig.color || '#f3f4f6' 
                        : ''
                      e.currentTarget.style.backgroundColor = stripedBg
                    } : undefined}
                  >
                    {getVisibleColumns(columnOrder).map((col, index) => {
                      const cellValue = row[col.column]
                      
                      // Handle different data types
                      let renderedValue
                      if (cellValue === null || cellValue === undefined) {
                        renderedValue = ''
                      } else if (Array.isArray(cellValue)) {
                        // Arrays: keep as comma-separated string
                        renderedValue = String(cellValue)
                      } else if (React.isValidElement(cellValue)) {
                        // JSX/React elements: render as ReactNode
                        renderedValue = cellValue as React.ReactNode
                      } else if (typeof cellValue === 'object') {
                        // Plain objects: stringify as JSON
                        renderedValue = JSON.stringify(cellValue)
                      } else {
                        // Primitives: convert to string
                        renderedValue = String(cellValue)
                      }

                      return (
                        <td 
                          key={col.column} 
                          className={`break-words ${
                            verticalSeparators && index < getVisibleColumns(columnOrder).length - 1 ? 'border-r border-gray-200' : ''
                          }`}
                          style={{
                            ...getColumnStyle(col),
                            padding: `${zoomLevel * 0.5}rem ${zoomLevel * 1}rem` // Scale padding with zoom
                          }}
                        >
                          {renderedValue}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Custom Scrollbar */}
        <div 
          ref={scrollbarRef}
          className="w-2 bg-gray-50 border-r border-b border-gray-300 relative cursor-pointer select-none"
          style={{ height: height }} // Keep original height
          onMouseDown={handleScrollbarMouseDown}
        >
          {/* Scrollbar Track */}
          <div className="absolute inset-x-0 top-1 bottom-1 bg-gray-200 rounded-full mx-0.5"></div>
          
          {/* Scrollbar Thumb */}
          <div 
            className={`absolute bg-gray-400 rounded-full transition-all duration-200 ease-out mx-0.5 ${
              isDraggingScrollbar ? 'bg-gray-600 scale-110' : 'hover:bg-gray-500'
            }`}
            style={{
              height: `${Math.max(20, (rowsPerPage / data.length) * 80)}%`,
              top: `${2 + (startRowIndex / Math.max(1, data.length - rowsPerPage)) * (96 - Math.max(20, (rowsPerPage / data.length) * 80))}%`,
              left: '1px',
              right: '1px'
            }}
          />
        </div>
      </div>

      {/* Ghost element for column dragging */}
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
  )
}

export default VirtualizedTable