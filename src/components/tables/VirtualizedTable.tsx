import React from 'react'

interface VirtualizedTableProps {
  data: { [key: string]: string | number | boolean | null | undefined | [] | object | React.ReactNode }[];
  columnNames?: { column: string; displayValue: string }[];
}





function VirtualizedTable(props: VirtualizedTableProps) {
  
  // Props
  const { data, columnNames } = props

  // Variables
  const columns = getColumns()


  // Get column headers - use columnNames if provided, otherwise use data keys
  function getColumns() {
    if (columnNames && columnNames.length > 0) return columnNames
    if (data.length > 0) return Object.keys(data[0]).map(key => ({ column: key, displayValue: key }))
    return []
  }


  // Render
  return (
    <section className='virtualized-table-wrap'>
      <div className="virtualized-table-controls h-[2rem]">Controls</div>
      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.column} className="px-4 py-2 text-left">
                {col.displayValue}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
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
                  <td key={col.column} className="px-4 py-2">
                    {renderedValue}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

export default VirtualizedTable