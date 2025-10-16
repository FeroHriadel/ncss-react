import React from 'react'

interface VirtualizedTableProps {
  data: { [key: string]: string | number | boolean | null | undefined | [] | object | React.ReactNode }[];
  columnNames?: { column: string; displayValue: string; width?: string }[];
}





function VirtualizedTable(props: VirtualizedTableProps) {
  
  // Props
  const { data, columnNames } = props

  // Refs for scroll synchronization
  const headerRef = React.useRef<HTMLDivElement>(null)
  const bodyRef = React.useRef<HTMLDivElement>(null)

  // Variables
  const columns = getColumns()

  // Scroll synchronization
  const handleBodyScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (headerRef.current) {
      headerRef.current.scrollLeft = e.currentTarget.scrollLeft
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

      {/* Scrollable Body */}
      <div 
        ref={bodyRef}
        className="h-[600px] overflow-auto border-l border-r border-b border-gray-300"
        onScroll={handleBodyScroll}
      >
        <table className="w-full" style={{ tableLayout: 'fixed' }}>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50 border-b border-gray-100 last:border-b-0">
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
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default VirtualizedTable