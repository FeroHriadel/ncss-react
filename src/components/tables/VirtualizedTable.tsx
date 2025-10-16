import React from 'react'

interface VirtualizedTableProps {
  data: { [key: string]: string | number | boolean | null | undefined | [] | object | React.ReactNode }[];
  columnNames?: { column: string; displayValue: string; width?: string }[];
}





function VirtualizedTable(props: VirtualizedTableProps) {

  const { data, columnNames } = props
  const headerRef = React.useRef<HTMLDivElement>(null)
  const bodyRef = React.useRef<HTMLDivElement>(null)
  const rowRefs = React.useRef<(HTMLTableRowElement | null)[]>([])
  const columns = getColumns()

  // Virtualization state
  const [scrollTop, setScrollTop] = React.useState(0)
  const [containerHeight] = React.useState(600) // Fixed container height
  const [rowHeights, setRowHeights] = React.useState<number[]>([]) // Track actual row heights
  const [estimatedRowHeight] = React.useState(50) // Initial estimate
  const overscan = 10 // Number of extra rows to render above/below

  // Calculate row positions and visible range
  const getRowHeight = (index: number): number => {
    return rowHeights[index] || estimatedRowHeight
  }

  const getRowOffset = (index: number): number => {
    let offset = 0
    for (let i = 0; i < index; i++) {
      offset += getRowHeight(i)
    }
    return offset
  }

  const getTotalHeight = (): number => {
    return getRowOffset(data.length)
  }

  // Calculate which rows should be visible based on actual positions
  const getVisibleRange = () => {
    let start = 0
    let end = data.length - 1
    
    // Find first visible row
    let currentOffset = 0
    for (let i = 0; i < data.length; i++) {
      const rowHeight = getRowHeight(i)
      if (currentOffset + rowHeight >= scrollTop) {
        start = i
        break
      }
      currentOffset += rowHeight
    }
    
    // Find last visible row
    currentOffset = getRowOffset(start)
    for (let i = start; i < data.length; i++) {
      if (currentOffset >= scrollTop + containerHeight) {
        end = i - 1
        break
      }
      currentOffset += getRowHeight(i)
    }
    
    return {
      start: Math.max(0, start - overscan),
      end: Math.min(data.length - 1, end + overscan)
    }
  }

  const visibleRange = getVisibleRange()

  // Row height measurement
  const measureRowHeight = React.useCallback((rowIndex: number, element: HTMLTableRowElement | null) => {
    if (element && rowHeights[rowIndex] !== element.offsetHeight) {
      setRowHeights(prev => {
        const newHeights = [...prev]
        newHeights[rowIndex] = element.offsetHeight
        return newHeights
      })
    }
  }, [rowHeights])

  // Scroll synchronization
  function handleBodyScroll(e: React.UIEvent<HTMLDivElement>) {
    // Sync horizontal scroll with header
    if (headerRef.current) {
      headerRef.current.scrollLeft = e.currentTarget.scrollLeft
    }
    
    // Track vertical scroll for virtualization
    setScrollTop(e.currentTarget.scrollTop)
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

      {/* Scrollable Body */}
      <div 
        ref={bodyRef}
        className="h-[600px] overflow-auto border-l border-r border-b border-gray-300"
        onScroll={handleBodyScroll}
      >
        {/* Simple virtualization with container transform */}
        <div 
          style={{ 
            height: getTotalHeight(),
            position: 'relative',
            transform: `translateY(-${getRowOffset(visibleRange.start)}px)`
          }}
        >
          <table className="w-full" style={{ tableLayout: 'fixed' }}>
            <tbody>
              {/* Render only visible rows */}
              {Array.from({ length: visibleRange.end - visibleRange.start + 1 }, (_, i) => {
                const rowIndex = visibleRange.start + i
                const row = data[rowIndex]
                if (!row) return null
                
                return (
                  <tr 
                    key={rowIndex} 
                    ref={(el) => {
                      rowRefs.current[rowIndex] = el
                      measureRowHeight(rowIndex, el)
                    }}
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
      </div>
    </section>
  )
}

export default VirtualizedTable