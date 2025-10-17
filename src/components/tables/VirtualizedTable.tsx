import React from 'react'
import { CiZoomIn, CiZoomOut } from "react-icons/ci"
import { HiOutlineViewColumns } from "react-icons/hi2"

interface VirtualizedTableProps {
  data: { [key: string]: string | number | boolean | null | undefined | [] | object | React.ReactNode }[];
  columnsConfig?: { column: string; displayValue: string; width?: string }[];
  height?: string; // Optional height prop (e.g., "400px", "22rem", "50vh")
  horizontalSeparators?: boolean; // Show horizontal borders between rows (default: true)
  verticalSeparators?: boolean; // Show vertical borders between columns (default: true)
  striped?: { enabled: boolean; color?: string } | boolean; // Alternate row colors with optional custom color
  hover?: { enabled: boolean; color?: string } | boolean; // Enable hover effects on rows with optional custom color
}





function VirtualizedTable(props: VirtualizedTableProps) {

  const { data, columnsConfig, height = "400px", horizontalSeparators = true, verticalSeparators = true, striped = true, hover = true } = props

  // Process hover prop - handle both boolean and object formats
  const hoverConfig = React.useMemo(() => {
    if (typeof hover === 'boolean') {
      return { enabled: hover, color: undefined }
    }
    return { enabled: hover.enabled, color: hover.color }
  }, [hover])

  // Process striped prop - handle both boolean and object formats
  const stripedConfig = React.useMemo(() => {
    if (typeof striped === 'boolean') {
      return { enabled: striped, color: undefined }
    }
    return { enabled: striped.enabled, color: striped.color }
  }, [striped])
  const headerRef = React.useRef<HTMLDivElement>(null)
  const bodyRef = React.useRef<HTMLDivElement>(null)
  const columns = getColumns()

  // Row-based rendering state
  const [startRowIndex, setStartRowIndex] = React.useState(0)
  const rowsPerPage = 15 // Reasonable number for font-size scaling approach
  const [isChangingRows, setIsChangingRows] = React.useState(false) // Prevent scroll loops
  const lastScrollTop = React.useRef(0) // Track scroll direction
  const [isDraggingScrollbar, setIsDraggingScrollbar] = React.useState(false)
  const scrollbarRef = React.useRef<HTMLDivElement>(null)
  const [isDraggingTable, setIsDraggingTable] = React.useState(false)
  const lastMousePosition = React.useRef({ x: 0, y: 0 })
  const [zoomLevel, setZoomLevel] = React.useState(1) // Zoom state (1 = 100%, 0.8 = 80%, 1.2 = 120%)
  const [showColumnOptions, setShowColumnOptions] = React.useState(false) // Column visibility dropdown
  const [visibleColumns, setVisibleColumns] = React.useState<{ [key: string]: boolean }>({}) // Track visible columns
  const columnOptionsRef = React.useRef<HTMLDivElement>(null) // Ref for dropdown
  
  // Zoom controls
  const minZoom = 0.5 // 50%
  const maxZoom = 1.5 // 150%
  const zoomStep = 0.1 // 10% increments
  
  // Column drag and drop state
  const [draggedColumn, setDraggedColumn] = React.useState<string | null>(null)
  const [dragOverColumn, setDragOverColumn] = React.useState<string | null>(null)
  const [columnOrder, setColumnOrder] = React.useState<string[]>([])
  const [ghostElement, setGhostElement] = React.useState<{ x: number; y: number; text: string } | null>(null)
  
  // Calculate visible rows based on start row index
  const getVisibleRows = () => {
    const start = startRowIndex
    const end = Math.min(start + rowsPerPage, data.length)
    return { start, end, rows: data.slice(start, end) }
  }

  const { start: visibleStart, rows: visibleRows } = getVisibleRows()

  // Custom scrollbar logic
  const handleScrollbarDrag = React.useCallback((e: React.MouseEvent | MouseEvent) => {
    if (!scrollbarRef.current) return
    
    const rect = scrollbarRef.current.getBoundingClientRect()
    const relativeY = e.clientY - rect.top
    const percentage = Math.max(0, Math.min(1, relativeY / rect.height))
    const maxStartIndex = Math.max(0, data.length - rowsPerPage)
    const targetRowIndex = Math.floor(percentage * maxStartIndex)
    
    if (targetRowIndex !== startRowIndex && targetRowIndex >= 0 && targetRowIndex <= maxStartIndex) {
      setStartRowIndex(targetRowIndex)
    }
  }, [data.length, rowsPerPage, startRowIndex])

  const handleScrollbarMouseDown = (e: React.MouseEvent) => {
    setIsDraggingScrollbar(true)
    handleScrollbarDrag(e)
  }

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingScrollbar) {
        handleScrollbarDrag(e)
      }
      if (isDraggingTable && bodyRef.current) {
        const deltaX = e.clientX - lastMousePosition.current.x
        const deltaY = e.clientY - lastMousePosition.current.y
        
        bodyRef.current.scrollLeft -= deltaX
        bodyRef.current.scrollTop -= deltaY
        
        lastMousePosition.current = { x: e.clientX, y: e.clientY }
      }
    }

    const handleMouseUp = () => {
      setIsDraggingScrollbar(false)
      setIsDraggingTable(false)
    }

    if (isDraggingScrollbar || isDraggingTable) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDraggingScrollbar, isDraggingTable, handleScrollbarDrag])

  // Table drag-to-scroll handlers
  const handleTableMouseDown = (e: React.MouseEvent) => {
    setIsDraggingTable(true)
    lastMousePosition.current = { x: e.clientX, y: e.clientY }
    e.preventDefault() // Prevent text selection
  }

  const handleTableMouseLeave = () => {
    setIsDraggingTable(false)
  }

  // Zoom handler functions
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(maxZoom, prev + zoomStep))
  }

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(minZoom, prev - zoomStep))
  }

  // Column drag and drop handlers
  const handleColumnMouseDown = (e: React.MouseEvent, columnKey: string, displayValue: string) => {
    setDraggedColumn(columnKey)
    setGhostElement({
      x: e.clientX,
      y: e.clientY,
      text: displayValue
    })
    e.preventDefault()
  }

  const handleColumnMouseMove = React.useCallback((e: MouseEvent) => {
    if (draggedColumn && ghostElement) {
      setGhostElement(prev => prev ? {
        ...prev,
        x: e.clientX,
        y: e.clientY
      } : null)
    }
  }, [draggedColumn, ghostElement])

  const handleColumnMouseUp = React.useCallback((targetColumnKey?: string) => {
    if (draggedColumn && targetColumnKey && draggedColumn !== targetColumnKey) {
      // Reorder columns
      const newOrder = [...(columnOrder.length > 0 ? columnOrder : columns.map(c => c.column))]
      const draggedIndex = newOrder.indexOf(draggedColumn)
      const targetIndex = newOrder.indexOf(targetColumnKey)
      
      if (draggedIndex !== -1 && targetIndex !== -1) {
        // Remove dragged column and insert at target position
        const [draggedItem] = newOrder.splice(draggedIndex, 1)
        newOrder.splice(targetIndex, 0, draggedItem)
        setColumnOrder(newOrder)
      }
    }
    
    setDraggedColumn(null)
    setDragOverColumn(null)
    setGhostElement(null)
  }, [draggedColumn, columnOrder, columns])

  const handleColumnMouseEnter = (columnKey: string) => {
    if (draggedColumn && draggedColumn !== columnKey) {
      setDragOverColumn(columnKey)
    }
  }

  const handleColumnMouseLeave = () => {
    setDragOverColumn(null)
  }

  // Initialize visible columns when columns change
  React.useEffect(() => {
    const initialVisibility: { [key: string]: boolean } = {}
    columns.forEach(col => {
      initialVisibility[col.column] = true // All columns visible by default
    })
    setVisibleColumns(initialVisibility)
  }, [columns])

  // Initialize column order when columns change
  React.useEffect(() => {
    if (columns.length > 0 && columnOrder.length === 0) {
      setColumnOrder(columns.map(col => col.column))
    }
  }, [columns, columnOrder.length])

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

  // Column visibility handlers
  const toggleColumnVisibility = (columnKey: string) => {
    setVisibleColumns(prev => ({
      ...prev,
      [columnKey]: !prev[columnKey]
    }))
  }

  const toggleColumnOptions = () => {
    setShowColumnOptions(prev => !prev)
  }

  // Click outside to close dropdown
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (columnOptionsRef.current && !columnOptionsRef.current.contains(event.target as Node)) {
        setShowColumnOptions(false)
      }
    }

    if (showColumnOptions) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showColumnOptions])

  // Filter visible columns and apply custom order
  const getVisibleColumns = () => {
    const orderedColumns = columnOrder.length > 0 ? columnOrder : columns.map(c => c.column)
    return orderedColumns
      .map(colKey => columns.find(col => col.column === colKey))
      .filter(col => col && visibleColumns[col.column] !== false) as { column: string; displayValue: string; width?: string }[]
  }

  // Handle mouse wheel events for row-by-row scrolling
  function handleWheelEvent(e: React.WheelEvent<HTMLDivElement>) {
    // Skip if we're currently changing rows
    if (isChangingRows) {
      return
    }

    // Prevent default scrolling behavior
    e.preventDefault()

    // Determine scroll direction from wheel delta
    const scrollingUp = e.deltaY < 0
    const scrollingDown = e.deltaY > 0

    console.log('Wheel Event:', {
      deltaY: e.deltaY,
      scrollingUp,
      scrollingDown,
      startRowIndex,
      maxRows: data.length
    })

    // Handle wheel up (previous row)
    if (scrollingUp && startRowIndex > 0) {
      console.log('Wheel up - scrolling to previous row')
      setIsChangingRows(true)
      setStartRowIndex(Math.max(0, startRowIndex - 1))
      
      setTimeout(() => {
        setIsChangingRows(false)
      }, 50) // Shorter delay for smoother scrolling
    }
    
    // Handle wheel down (next row)
    if (scrollingDown && startRowIndex < data.length - rowsPerPage) {
      console.log('Wheel down - scrolling to next row')
      setIsChangingRows(true)
      setStartRowIndex(Math.min(data.length - rowsPerPage, startRowIndex + 1))
      
      setTimeout(() => {
        setIsChangingRows(false)
      }, 50) // Shorter delay for smoother scrolling
    }
  }

  // Scroll synchronization + auto-pagination
  function handleBodyScroll(e: React.UIEvent<HTMLDivElement>) {
    // Sync horizontal scroll with header
    if (headerRef.current) {
      headerRef.current.scrollLeft = e.currentTarget.scrollLeft
    }
    
    // Skip auto-pagination if we're currently changing rows
    if (isChangingRows) {
      return
    }
    
    // Auto-pagination based on scroll position (adjusted for zoom)
    const scrollTop = e.currentTarget.scrollTop
    const scrollHeight = e.currentTarget.scrollHeight
    const clientHeight = e.currentTarget.clientHeight
    
    // Simple threshold
    const baseThreshold = 5
    const zoomAdjustedThreshold = baseThreshold
    
    // Determine scroll direction
    const scrollingDown = scrollTop > lastScrollTop.current
    const scrollingUp = scrollTop < lastScrollTop.current
    lastScrollTop.current = scrollTop
    
    // Zoom-adjusted calculations
    // When zoomed out, the actual content height is smaller than scrollHeight indicates
    const effectiveContentHeight = scrollHeight * zoomLevel
    const availableHeight = clientHeight
    
    // Enhanced debug logging
    console.log('Scroll Debug:', {
      scrollTop,
      scrollHeight,
      clientHeight,
      effectiveContentHeight,
      availableHeight,
      zoomLevel,
      zoomAdjustedThreshold,
      scrollingDown,
      scrollingUp,
      startRowIndex,
      maxRows: data.length,
      isChangingRows,
      atTop: scrollTop <= zoomAdjustedThreshold,
      atBottom: scrollTop + clientHeight >= scrollHeight - zoomAdjustedThreshold,
      contentFitsInView: effectiveContentHeight <= availableHeight
    })
    
    // Zoom-adjusted detection
    const atBottom = scrollTop + clientHeight >= scrollHeight - zoomAdjustedThreshold
    const atTop = scrollTop <= zoomAdjustedThreshold
    
    // Additional check: if content fits entirely in the view due to zoom, handle it differently
    const contentFitsInView = effectiveContentHeight <= availableHeight
    
    // Special handling when content fits entirely in view (common when zoomed out)
    if (contentFitsInView) {
      // When content fits, any scroll indicates desire to change rows
      if (scrollingDown && startRowIndex < data.length - rowsPerPage) {
        console.log('Content fits in view - scrolling down triggers next row')
        setIsChangingRows(true)
        setStartRowIndex(Math.min(data.length - rowsPerPage, startRowIndex + 1))
        
        setTimeout(() => {
          if (bodyRef.current) {
            bodyRef.current.scrollTop = 0
            lastScrollTop.current = 0
          }
          setTimeout(() => setIsChangingRows(false), 100)
        }, 30)
        return
      }
      
      if (scrollingUp && startRowIndex > 0) {
        console.log('Content fits in view - scrolling up triggers previous row')
        setIsChangingRows(true)
        setStartRowIndex(Math.max(0, startRowIndex - 1))
        
        setTimeout(() => {
          if (bodyRef.current) {
            bodyRef.current.scrollTop = 0
            lastScrollTop.current = 0
          }
          setTimeout(() => setIsChangingRows(false), 100)
        }, 30)
        return
      }
    }
    
    // Normal scroll boundary detection (when content doesn't fit in view)
    // Go to next row only when scrolling down and at bottom
    if (scrollingDown && atBottom && startRowIndex < data.length - rowsPerPage) {
      console.log('Triggering next row at scroll bottom')
      setIsChangingRows(true)
      setStartRowIndex(Math.min(data.length - rowsPerPage, startRowIndex + 1))
      
      // Reset scroll and clear the flag after a delay
      setTimeout(() => {
        if (bodyRef.current) {
          bodyRef.current.scrollTop = 0
          lastScrollTop.current = 0 // Reset scroll tracking
        }
        setTimeout(() => setIsChangingRows(false), 200) // Longer delay
      }, 50)
    }
    
    // Go to previous row only when scrolling up and at top
    if (scrollingUp && atTop && startRowIndex > 0) {
      console.log('Triggering previous row - conditions met:', { scrollingUp, atTop, startRowIndex })
      setIsChangingRows(true)
      setStartRowIndex(Math.max(0, startRowIndex - 1))
      
      // Reset scroll and clear the flag after a delay
      setTimeout(() => {
        if (bodyRef.current) {
          const maxScroll = bodyRef.current.scrollHeight - bodyRef.current.clientHeight
          bodyRef.current.scrollTop = Math.max(0, maxScroll - zoomAdjustedThreshold) // Use zoom-adjusted threshold
          lastScrollTop.current = Math.max(0, maxScroll - zoomAdjustedThreshold)
        }
        setTimeout(() => setIsChangingRows(false), 200) // Longer delay
      }, 50)
    } else if (scrollingUp && atTop) {
      console.log('Scroll up at top but startRowIndex is 0:', { startRowIndex })
    } else if (scrollingUp && startRowIndex > 0) {
      console.log('Scrolling up with rows available but not at top:', { atTop, scrollTop, zoomAdjustedThreshold })
    }
  }

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
      <div className="w-full flex justify-between items-center p-2 border border-gray-300 bg-gray-50">
        <div className="flex items-center">
          <span className="text-sm text-gray-600">Controls</span>
        </div>
        <div className="flex items-center gap-2 relative">
          {/* Column Visibility Toggle */}
          <div className="relative" ref={columnOptionsRef}>
            <button 
              className="p-1 hover:bg-gray-200 rounded transition-colors"
              title="Toggle Columns"
              onClick={toggleColumnOptions}
            >
              <HiOutlineViewColumns size={20} />
            </button>
            
            {/* Column Options Dropdown */}
            {showColumnOptions && (
              <div className="absolute top-full right-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-10 min-w-[200px]">
                <div className="p-2 border-b border-gray-200">
                  <span className="text-sm font-medium text-gray-700">Show/Hide Columns</span>
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {columns.map(col => (
                    <label
                      key={col.column}
                      className="flex items-center p-2 hover:bg-gray-50 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={visibleColumns[col.column] !== false}
                        onChange={() => toggleColumnVisibility(col.column)}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">{col.displayValue}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Zoom Controls */}
          <button 
            className="p-1 hover:bg-gray-200 rounded transition-colors"
            title="Zoom Out"
            onClick={handleZoomOut}
            disabled={zoomLevel <= minZoom}
          >
            <CiZoomOut size={20} className={zoomLevel <= minZoom ? 'text-gray-400' : ''} />
          </button>
          <span className="text-xs text-gray-500 min-w-[40px] text-center">
            {Math.round(zoomLevel * 100)}%
          </span>
          <button 
            className="p-1 hover:bg-gray-200 rounded transition-colors"
            title="Zoom In"
            onClick={handleZoomIn}
            disabled={zoomLevel >= maxZoom}
          >
            <CiZoomIn size={20} className={zoomLevel >= maxZoom ? 'text-gray-400' : ''} />
          </button>
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
                  {getVisibleColumns().map((col, index) => (
                    <th 
                      key={col.column} 
                      className={`text-left break-words cursor-move select-none transition-colors ${
                        verticalSeparators && index < getVisibleColumns().length - 1 ? 'border-r border-gray-200' : ''
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
              {visibleRows.map((row, i) => {
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
                    {getVisibleColumns().map((col, index) => {
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
                            verticalSeparators && index < getVisibleColumns().length - 1 ? 'border-r border-gray-200' : ''
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