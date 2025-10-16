import React from 'react'

interface VirtualizedTableProps {
  data: { [key: string]: string | number | boolean | null | undefined | [] | object | React.ReactNode }[];
  columnNames?: { column: string; displayValue: string; width?: string }[];
}





function VirtualizedTable(props: VirtualizedTableProps) {

  const { data, columnNames } = props
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
    }

    const handleMouseUp = () => {
      setIsDraggingScrollbar(false)
    }

    if (isDraggingScrollbar) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDraggingScrollbar, handleScrollbarDrag])

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

  // Get column headers - use columnNames if provided, otherwise use data keys
  function getColumns() {
    if (columnNames && columnNames.length > 0) return columnNames
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
      <div className="virtualized-table-controls h-[2rem]">Controls</div>
      
      {/* Fixed Header */}
      <div className="border border-gray-300 overflow-hidden">
        <div 
          ref={headerRef}
          style={{ 
            overflow: 'auto', /* Both x and y scrolling */
            scrollbarWidth: 'none', /* Firefox */
            msOverflowStyle: 'none', /* Internet Explorer 10+ */
          }}
          className="[&::-webkit-scrollbar]:hidden" /* Chrome, Safari and Opera */
          onScroll={handleHeaderScroll}
        >
          <table className="w-full" style={{ tableLayout: 'fixed' }}>
            <thead className="bg-gray-50">
              <tr>
                {columns.map((col) => (
                  <th 
                    key={col.column} 
                    className="px-4 py-2 text-left border-r border-gray-200 last:border-r-0 break-words"
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

      {/* Scrollable Body with Custom Scrollbar */}
      <div className="flex">
        <div 
          ref={bodyRef}
          className="h-[400px] overflow-auto border-l border-r border-b border-gray-300 [&::-webkit-scrollbar]:hidden flex-1"
          style={{ 
            scrollbarWidth: 'none', /* Firefox */
            msOverflowStyle: 'none', /* Internet Explorer 10+ */
          }}
          onScroll={handleBodyScroll}
        >
          <table className="w-full min-h-full" style={{ tableLayout: 'fixed' }}>
            <tbody>
              {/* Render only current page rows */}
              {visibleRows.map((row, i) => {
                const rowIndex = visibleStart + i
                
                return (
                  <tr 
                    key={rowIndex} 
                    className="hover:bg-gray-50 border-b border-gray-200"
                  >
                    {columns.map((col) => {
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
                          className="px-4 py-2 border-r border-gray-200 last:border-r-0 break-words"
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
          className="w-2 h-[400px] bg-gray-50 border-r border-b border-gray-300 relative cursor-pointer select-none"
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