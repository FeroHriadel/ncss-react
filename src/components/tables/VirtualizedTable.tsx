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
              {columns.map((col) => (
                <td key={col.column} className="px-4 py-2">
                  {typeof row[col.column] === 'object' && row[col.column] !== null && !Array.isArray(row[col.column])
                    ? row[col.column] as React.ReactNode
                    : String(row[col.column])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

export default VirtualizedTable