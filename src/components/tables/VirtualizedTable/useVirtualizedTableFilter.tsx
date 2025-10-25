import { useMemo, useState } from 'react';
import type { VirtualizedTableProps } from './VirtualizedTable';



interface UseVirtualizedTableFilterOptions {
  data: VirtualizedTableProps['data'];
  columns: { column: string; displayValue: string }[];
}

interface FilterState {
  columnsFilter: string[]; // Which columns to show
  columnOrder: string[]; // Order of columns
  // Future filters can be added here:
  // searchFilter?: string;
  // rangeFilter?: { column: string; min: number; max: number };
  // customFilter?: (row: any) => boolean;
}



export function useVirtualizedTableFilter({ data, columns }: UseVirtualizedTableFilterOptions) {
  // Filter state - centralized for all filter types
  const [filterState, setFilterState] = useState<FilterState>({ 
    columnsFilter: columns.map(col => col.column),
    columnOrder: columns.map(col => col.column),
  });


  // Setter for column filter
  function setColumnsFilter(selectedColumns: string[]) { setFilterState(prev => ({...prev, columnsFilter: selectedColumns })); };

  // Setter for column order
  function setColumnOrder(newOrder: string[]) { 
    setFilterState(prev => ({...prev, columnOrder: newOrder })); 
  };


  // Filtered data - what for rows in table body (not for columns in table header!)
  const filteredData = useMemo(() => {
    // If no filters are active, return original data
    if (filterState.columnsFilter.length === columns.length) {
      return data;
    }

    // Single iteration - apply all filters at once
    return data.map(row => {
      // Filter columns: only keep selected columns
      const filteredRow: typeof row = {};
      filterState.columnsFilter.forEach(columnKey => {
        if (columnKey in row) {
          filteredRow[columnKey] = row[columnKey];
        }
      });

      // Future filters can be applied here in the same iteration:
      // - Search filter: check if row matches search term
      // - Range filter: check if numeric values are in range
      // - Custom filter: apply custom logic
      
      return filteredRow;
    });
  }, [data, filterState, columns.length]);


  // Filtered columns - only show selected columns in header - affect table header only (not table rows in table body!)
  const filteredColumns = useMemo(() => {
    //apply order first, then filter
    const orderedColumns = filterState.columnOrder
      .map(colKey => columns.find(col => col.column === colKey))
      .filter((col): col is { column: string; displayValue: string; width?: string } => col !== undefined);
    //then filter by visibility
    return orderedColumns.filter(col => filterState.columnsFilter.includes(col.column));
  }, [columns, filterState.columnsFilter, filterState.columnOrder]);


  // Expose state and setters
  return {
    filteredData,
    filteredColumns,
    filterState,
    setColumnsFilter,
    setColumnOrder,
    // Future filter setters can be added here:
    // setSearchFilter,
    // setRangeFilter,
    // setCustomFilter,
  };
}
