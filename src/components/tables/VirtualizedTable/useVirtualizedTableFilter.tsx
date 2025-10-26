import { useMemo, useState } from 'react';
import * as React from 'react';
import type { VirtualizedTableProps } from './VirtualizedTable';
import type { FilterRow } from './VirtualizedTableFilter';



interface UseVirtualizedTableFilterOptions {
  data: VirtualizedTableProps['data'];
  columns: { column: string; displayValue: string }[];
}

interface FilterState {
  columnsFilter: string[]; // Which columns to show
  columnOrder: string[]; // Order of columns
  conditions: FilterRow[]; // Filter conditions
}




export function useVirtualizedTableFilter({ data, columns }: UseVirtualizedTableFilterOptions) {
  // Filter state - centralized for all filter types
  const [filterState, setFilterState] = useState<FilterState>({ 
    columnsFilter: columns.map(col => col.column),
    columnOrder: columns.map(col => col.column),
    conditions: [],
  });


  // HELPER FUNCTIONS
  // Normalize any value to string for comparison
  function normalizeValue(value: unknown): string {
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';
    if (typeof value === 'string') return value;
    if (typeof value === 'number') return String(value);
    if (typeof value === 'boolean') return String(value);
    if (Array.isArray(value)) return value.join(', ');
    if (React.isValidElement(value)) {
      // Extract text content from React elements
      const extractText = (node: React.ReactNode): string => {
        if (typeof node === 'string') return node;
        if (typeof node === 'number') return String(node);
        if (Array.isArray(node)) return node.map(extractText).join('');
        if (React.isValidElement(node)) {
          const props = node.props as { children?: React.ReactNode };
          if (props.children) {
            return extractText(props.children);
          }
        }
        return '';
      };
      return extractText(value);
    }
    if (typeof value === 'object') {
      return JSON.stringify(value);
    }
    return String(value);
  }

  // Evaluate a single condition
  function evaluateCondition(row: VirtualizedTableProps['data'][0], condition: FilterRow): boolean {
    if (!condition.column || !condition.condition || !condition.value) return true;
    
    const cellValue = row[condition.column];
    const normalizedCellValue = normalizeValue(cellValue).toLowerCase();
    const normalizedFilterValue = condition.value.toLowerCase();

    switch (condition.condition) {
      case 'equals':
        return normalizedCellValue === normalizedFilterValue;
      
      case 'not_equals':
        return normalizedCellValue !== normalizedFilterValue;
      
      case 'contains':
        return normalizedCellValue.includes(normalizedFilterValue);
      
      case 'not_contains':
        return !normalizedCellValue.includes(normalizedFilterValue);
      
      case 'starts_with':
        return normalizedCellValue.startsWith(normalizedFilterValue);
      
      case 'ends_with':
        return normalizedCellValue.endsWith(normalizedFilterValue);
      
      case 'greater_than': {
        const cellNum = parseFloat(normalizedCellValue);
        const filterNum = parseFloat(normalizedFilterValue);
        if (isNaN(cellNum) || isNaN(filterNum)) return false;
        return cellNum > filterNum;
      }
      
      case 'less_than': {
        const cellNum = parseFloat(normalizedCellValue);
        const filterNum = parseFloat(normalizedFilterValue);
        if (isNaN(cellNum) || isNaN(filterNum)) return false;
        return cellNum < filterNum;
      }
      
      case 'is_between': {
        // Expected format: "min,max"
        const [min, max] = normalizedFilterValue.split(',').map(v => parseFloat(v.trim()));
        const cellNum = parseFloat(normalizedCellValue);
        if (isNaN(cellNum) || isNaN(min) || isNaN(max)) return false;
        return cellNum >= min && cellNum <= max;
      }
      
      default:
        return true;
    }
  }

  // Evaluate all conditions with AND/OR logic (single pass)
  function evaluateAllConditions(row: VirtualizedTableProps['data'][0]): boolean {
    if (filterState.conditions.length === 0) return true;

    let result = true;
    let currentOperator: 'and' | 'or' | null = null;

    for (const condition of filterState.conditions) {
      // Skip invalid conditions
      if (!condition.column || !condition.condition || !condition.value.trim()) {
        continue;
      }

      const conditionResult = evaluateCondition(row, condition);

      if (currentOperator === null) {
        // First condition
        result = conditionResult;
      } else if (currentOperator === 'and') {
        result = result && conditionResult;
      } else if (currentOperator === 'or') {
        result = result || conditionResult;
      }

      // Set operator for next iteration
      currentOperator = condition.operator as 'and' | 'or' | null;
    }

    return result;
  }


  // Setter for column filter
  function setColumnsFilter(selectedColumns: string[]) { setFilterState(prev => ({...prev, columnsFilter: selectedColumns })); };

  // Setter for column order
  function setColumnOrder(newOrder: string[]) { 
    setFilterState(prev => ({...prev, columnOrder: newOrder })); 
  };

  // Setter for filter conditions
  function setFilterConditions(conditions: FilterRow[]) {
    setFilterState(prev => ({...prev, conditions }));
  };



  // Filtered data - apply row filtering based on conditions, then column filtering
  const filteredData = useMemo(() => {
    // Single iteration - apply all filters at once
    return data
      .filter(row => evaluateAllConditions(row)) // Filter rows based on conditions
      .map(row => {
        // Filter columns: only keep selected columns
        const filteredRow: typeof row = {};
        filterState.columnsFilter.forEach(columnKey => {
          if (columnKey in row) {
            filteredRow[columnKey] = row[columnKey];
          }
        });
        return filteredRow;
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, filterState]);



  // Filtered columns - only show selected columns in header - affect table header only (not table rows in table body!)
  const filteredColumns = useMemo(() => {
    //apply order first, then filter
    const orderedColumns = filterState.columnOrder
      .map(colKey => columns.find(col => col.column === colKey))
      .filter((col): col is { column: string; displayValue: string; width?: string } => col !== undefined);
    //then filter by visibility
    return orderedColumns.filter(col => filterState.columnsFilter.includes(col.column));
  }, [columns, filterState.columnsFilter, filterState.columnOrder]);


  // Reset all filters to initial state
  const resetFilters = () => {
    setFilterState({
      columnsFilter: columns.map(col => col.column),
      columnOrder: columns.map(col => col.column),
      conditions: [],
    });
  };


  // Expose state and setters
  return {
    filteredData,
    filteredColumns,
    filterState,
    setColumnsFilter,
    setColumnOrder,
    setFilterConditions,
    resetFilters,
  };
}
