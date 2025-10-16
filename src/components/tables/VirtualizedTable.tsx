import React from 'react'
import { CiZoomIn, CiZoomOut } from "react-icons/ci"

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

  // Pagination-style rendering state
  const [currentPage, setCurrentPage] = React.useState(0)
  const rowsPerPage = 10
  const [isChangingPage, setIsChangingPage] = React.useState(false) // Prevent scroll loops
  const lastScrollTop = React.useRef(0) // Track scroll direction
  const [isDraggingScrollbar, setIsDraggingScrollbar] = React.useState(false)
  const scrollbarRef = React.useRef<HTMLDivElement>(null)
  const [isDraggingTable, setIsDraggingTable] = React.useState(false)
  const lastMousePosition = React.useRef({ x: 0, y: 0 })
  const [zoomLevel, setZoomLevel] = React.useState(1) // Zoom state (1 = 100%, 0.8 = 80%, 1.2 = 120%)
  
  // Zoom controls
  const minZoom = 0.5 // 50%
  const maxZoom = 2.0 // 200%
  const zoomStep = 0.1 // 10% increments
  
  // Calculate visible rows based on current page
  const getVisibleRows = () => {
    const start = currentPage * rowsPerPage
    const end = Math.min(start + rowsPerPage, data.length)
    return { start, end, rows: data.slice(start, end) }
  }

  const { start: visibleStart, rows: visibleRows } = getVisibleRows()
  const totalPages = Math.ceil(data.length / rowsPerPage)

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
        <div className="flex items-center gap-2">
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
                  {columns.map((col, index) => (
                    <th 
                      key={col.column} 
                      className={`px-4 py-2 text-left break-words ${
                        verticalSeparators && index < columns.length - 1 ? 'border-r border-gray-200' : ''
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
                    {columns.map((col, index) => {
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
                            verticalSeparators && index < columns.length - 1 ? 'border-r border-gray-200' : ''
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
    </section>
  )
}

export default VirtualizedTable