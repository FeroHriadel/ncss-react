import React from 'react'
import { CiZoomIn, CiZoomOut } from "react-icons/ci"
import { HiOutlineViewColumns } from "react-icons/hi2"
import { LuFilter } from "react-icons/lu"

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
  // ========================================
  // PROP DESTRUCTURING & BASIC SETUP
  // ========================================
  const { data, columnsConfig, height = "400px", horizontalSeparators = true, verticalSeparators = true, striped = true, hover = true } = props
  
  // Refs for DOM elements
  const headerRef = React.useRef<HTMLDivElement>(null)
  const bodyRef = React.useRef<HTMLDivElement>(null)
  const scrollbarRef = React.useRef<HTMLDivElement>(null)
  const columnOptionsRef = React.useRef<HTMLDivElement>(null)

  // ========================================
  // MEMOS & COMPUTED VALUES
  // ========================================
  
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

  // ========================================
  // ZOOM FUNCTIONALITY
  // ========================================
  const [zoomLevel, setZoomLevel] = React.useState(1)
  const minZoom = 0.5
  const maxZoom = 2.0
  const zoomStep = 0.1

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(maxZoom, prev + zoomStep))
  }

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(minZoom, prev - zoomStep))
  }

  // ========================================
  // COLUMN SHOW/HIDE FUNCTIONALITY
  // ========================================
  const [showColumnOptions, setShowColumnOptions] = React.useState(false)
  const [visibleColumns, setVisibleColumns] = React.useState<{ [key: string]: boolean }>({})

  const columns = getColumns()

  // Initialize visible columns when columns change
  React.useEffect(() => {
    const initialVisibility: { [key: string]: boolean } = {}
    columns.forEach(col => {
      initialVisibility[col.column] = true // All columns visible by default
    })
    setVisibleColumns(initialVisibility)
  }, [columns])

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

  const toggleColumnVisibility = (columnKey: string) => {
    setVisibleColumns(prev => ({
      ...prev,
      [columnKey]: !prev[columnKey]
    }))
  }

  const toggleColumnOptions = () => {
    setShowColumnOptions(prev => !prev)
  }

  const getVisibleColumns = () => {
    return columns.filter(col => visibleColumns[col.column] !== false)
  }

  // ========================================
  // PAGINATION FUNCTIONALITY
  // ========================================
  const [currentPage, setCurrentPage] = React.useState(0)
  const [isChangingPage, setIsChangingPage] = React.useState(false)
  const lastScrollTop = React.useRef(0)
  const rowsPerPage = 10

  const getVisibleRows = () => {
    const start = currentPage * rowsPerPage
    const end = Math.min(start + rowsPerPage, data.length)
    return { start, end, rows: data.slice(start, end) }
  }

  const { start: visibleStart, rows: visibleRows } = getVisibleRows()
  const totalPages = Math.ceil(data.length / rowsPerPage)

  // ========================================
  // SCROLLBAR & DRAG FUNCTIONALITY
  // ========================================
  const [isDraggingScrollbar, setIsDraggingScrollbar] = React.useState(false)
  const [isDraggingTable, setIsDraggingTable] = React.useState(false)
  const lastMousePosition = React.useRef({ x: 0, y: 0 })



  // Custom scrollbar logic
  const handleScrollbarDrag = React.useCallback((e: React.MouseEvent | MouseEvent) => {
    if (!scrollbarRef.current) return
    const rect = scrollbarRef.current.getBoundingClientRect()
    const relativeY = e.clientY - rect.top
    const percentage = Math.max(0, Math.min(1, relativeY / rect.height))
    const targetPage = Math.floor(percentage * totalPages)
    if (targetPage !== currentPage && targetPage >= 0 && targetPage < totalPages) {
      setCurrentPage(targetPage)
    }
  }, [totalPages, currentPage])

  const handleScrollbarMouseDown = (e: React.MouseEvent) => {
    setIsDraggingScrollbar(true)
    handleScrollbarDrag(e)
  }

  const handleTableMouseDown = (e: React.MouseEvent) => {
    setIsDraggingTable(true)
    lastMousePosition.current = { x: e.clientX, y: e.clientY }
    e.preventDefault() // Prevent text selection
  }

  const handleTableMouseLeave = () => {
    setIsDraggingTable(false)
  }

  // ========================================
  // FILTER FUNCTIONALITY
  // ========================================
  const [showFilterModal, setShowFilterModal] = React.useState(false)

  const toggleFilterModal = () => {
    setShowFilterModal(prev => !prev)
  }

  // ========================================
  // EFFECTS
  // ========================================
  
  // Mouse events for dragging (scrollbar and table)
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

  // ========================================
  // UTILITY FUNCTIONS
  // ========================================
  
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



  React.useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      if (isDraggingScrollbar) handleScrollbarDrag(e);
      if (isDraggingTable && bodyRef.current) {
        const deltaX = e.clientX - lastMousePosition.current.x
        const deltaY = e.clientY - lastMousePosition.current.y
        bodyRef.current.scrollLeft -= deltaX
        bodyRef.current.scrollTop -= deltaY
        lastMousePosition.current = { x: e.clientX, y: e.clientY }
      }
    }
    function handleMouseUp () {
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


 






  // Scroll synchronization + auto-pagination
  function handleBodyScroll(e: React.UIEvent<HTMLDivElement>) {
    // Sync horizontal scroll with header
    if (headerRef.current) {
      headerRef.current.scrollLeft = e.currentTarget.scrollLeft
    }
    
    // Skip auto-pagination if we're currently changing pages
    if (isChangingPage) {
      return
    }
    
    // Auto-pagination based on scroll position
    const scrollTop = e.currentTarget.scrollTop
    const scrollHeight = e.currentTarget.scrollHeight
    const clientHeight = e.currentTarget.clientHeight
    
    // Determine scroll direction
    const scrollingDown = scrollTop > lastScrollTop.current
    const scrollingUp = scrollTop < lastScrollTop.current
    lastScrollTop.current = scrollTop
    
    // Debug logging
    console.log('Scroll Debug:', {
      scrollTop,
      scrollHeight,
      clientHeight,
      scrollingDown,
      scrollingUp,
      currentPage,
      totalPages,
      isChangingPage
    })
    
    // Only trigger page changes at the very edges with clear direction
    const atBottom = scrollTop + clientHeight >= scrollHeight - 5 // Very close to bottom
    const atTop = scrollTop <= 5 // Very close to top
    
    // Go to next page only when scrolling down and at bottom
    if (scrollingDown && atBottom && currentPage < totalPages - 1) {
      console.log('Triggering next page')
      setIsChangingPage(true)
      setCurrentPage(currentPage + 1)
      
      // Reset scroll and clear the flag after a delay
      setTimeout(() => {
        if (bodyRef.current) {
          bodyRef.current.scrollTop = 0
          lastScrollTop.current = 0 // Reset scroll tracking
        }
        setTimeout(() => setIsChangingPage(false), 200) // Longer delay
      }, 50)
    }
    
    // Go to previous page only when scrolling up and at top
    if (scrollingUp && atTop && currentPage > 0) {
      console.log('Triggering previous page')
      setIsChangingPage(true)
      setCurrentPage(currentPage - 1)
      
      // Reset scroll and clear the flag after a delay
      setTimeout(() => {
        if (bodyRef.current) {
          const maxScroll = bodyRef.current.scrollHeight - bodyRef.current.clientHeight
          bodyRef.current.scrollTop = maxScroll - 5 // Near bottom but not exactly
          lastScrollTop.current = maxScroll - 5
        }
        setTimeout(() => setIsChangingPage(false), 200) // Longer delay
      }, 50)
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
          {/* Filter Modal Toggle */}
          <button 
            className="p-1 hover:bg-gray-200 rounded transition-colors"
            title="Filter Data"
            onClick={toggleFilterModal}
          >
            <LuFilter size={20} />
          </button>
          
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
              transform: `scale(${zoomLevel})`,
              transformOrigin: 'top left',
              transition: 'transform 0.2s ease-out'
            }}>
              <thead className="bg-gray-50">
                <tr>
                  {getVisibleColumns().map((col, index) => (
                    <th 
                      key={col.column} 
                      className={`px-4 py-2 text-left break-words ${
                        verticalSeparators && index < getVisibleColumns().length - 1 ? 'border-r border-gray-200' : ''
                      }`}
                      style={getColumnStyle(col)}
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
            height: height,
            scrollbarWidth: 'none', /* Firefox */
            msOverflowStyle: 'none', /* Internet Explorer 10+ */
          }}
          onScroll={handleBodyScroll}
          onMouseDown={handleTableMouseDown}
          onMouseLeave={handleTableMouseLeave}
        >
          <table className="w-full min-h-full border-collapse" style={{ 
            tableLayout: 'fixed',
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'top left',
            transition: 'transform 0.2s ease-out'
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
                          className={`px-4 py-2 break-words ${
                            verticalSeparators && index < getVisibleColumns().length - 1 ? 'border-r border-gray-200' : ''
                          }`}
                          style={getColumnStyle(col)}
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
          style={{ height: height }}
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
              height: `${Math.max(20, (1 / totalPages) * 80)}%`,
              top: `${2 + (currentPage / Math.max(1, totalPages - 1)) * (96 - Math.max(20, (1 / totalPages) * 80))}%`,
              left: '1px',
              right: '1px'
            }}
          />
        </div>
      </div>

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[80vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Filter Data</h3>
              <button
                onClick={toggleFilterModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="p-4 overflow-y-auto">
              <p className="text-gray-600 mb-4">Filter options will be implemented here.</p>
              
              {/* Placeholder content */}
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                  <input 
                    type="text" 
                    placeholder="Search in all columns..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Column</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">Select column...</option>
                    {getVisibleColumns().map(col => (
                      <option key={col.column} value={col.column}>{col.displayValue}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Filter Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="contains">Contains</option>
                    <option value="equals">Equals</option>
                    <option value="starts">Starts with</option>
                    <option value="ends">Ends with</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
                  <input 
                    type="text" 
                    placeholder="Filter value..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
            
            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-4 border-t border-gray-200">
              <button
                onClick={toggleFilterModal}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={toggleFilterModal}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Apply Filter
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default VirtualizedTable