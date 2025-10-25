import { useMemo, useState } from 'react';
import type { VirtualizedTableProps } from './VirtualizedTable';

interface UseVirtualizedTableFilterOptions {
  data: VirtualizedTableProps['data'];
  columns: { column: string; displayValue: string }[];
}

interface FilterState {
  columnsFilter: string[]; // Which columns to show
  // Future filters can be added here:
  // searchFilter?: string;
  // rangeFilter?: { column: string; min: number; max: number };
  // customFilter?: (row: any) => boolean;
}

export function useVirtualizedTableFilter({ data, columns }: UseVirtualizedTableFilterOptions) {
  // Filter state - centralized for all filter types
  const [filterState, setFilterState] = useState<FilterState>({
    columnsFilter: columns.map(col => col.column), // Initially show all columns
  });

  // Setter for column filter
  const setColumnsFilter = (selectedColumns: string[]) => {
    setFilterState(prev => ({
      ...prev,
      columnsFilter: selectedColumns,
    }));
  };

  // Filtered data - single iteration over data array for performance
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

  // Filtered columns - only show selected columns in header
  const filteredColumns = useMemo(() => {
    return columns.filter(col => filterState.columnsFilter.includes(col.column));
  }, [columns, filterState.columnsFilter]);

  return {
    filteredData,
    filteredColumns,
    filterState,
    setColumnsFilter,
    // Future filter setters can be added here:
    // setSearchFilter,
    // setRangeFilter,
    // setCustomFilter,
  };
}
