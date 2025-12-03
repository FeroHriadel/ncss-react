import { useMemo, useState, useEffect } from 'react';
import * as React from 'react';
import type { TableProps } from './Table';
import type { FilterRow } from './TableFilter';



interface UseTableFilterOptions {
  data: TableProps['data'];
  columns: { column: string; displayValue: string }[];
}

interface FilterState {
  columnsFilter: string[]; // Which columns to show
  columnOrder: string[]; // Order of columns
  conditions: FilterRow[]; // Filter conditions
  sortColumn: string | null; // Column to sort by
  sortDirection: 'asc' | 'desc' | null; // Sort direction
}



export function useTableFilter({ data, columns }: UseTableFilterOptions) {
  // STATE & VALUES
  // Filter state - centralized for all filter types
  const [filterState, setFilterState] = useState<FilterState>({ 
    columnsFilter: columns.map(col => col.column),
    columnOrder: columns.map(col => col.column),
    conditions: [],
    sortColumn: null,
    sortDirection: null,
  });

  // Loading state - indicates when data is being filtered/sorted
  const [isSorting, setIsSorting] = useState(false);

  // Update filter state when columns change (e.g., when data loads)
  useEffect(() => {
    setFilterState(prev => ({
      ...prev,
      columnsFilter: columns.map(col => col.column),
      columnOrder: columns.map(col => col.column),
    }));
  }, [columns]);


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
  function evaluateCondition(row: TableProps['data'][0], condition: FilterRow): boolean {
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
  function evaluateAllConditions(row: TableProps['data'][0]): boolean {
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

  // Setter for sorting
  function setSortColumn(column: string) {
    setFilterState(prev => {
      // If clicking the same column, toggle direction
      if (prev.sortColumn === column) {
        if (prev.sortDirection === 'asc') {
          return { ...prev, sortDirection: 'desc' };
        } else if (prev.sortDirection === 'desc') {
          return { ...prev, sortColumn: null, sortDirection: null };
        }
      }
      // New column, start with ascending
      return { ...prev, sortColumn: column, sortDirection: 'asc' };
    });
  };

  // Get the type of a value for sorting
  function getValueType(value: unknown): 'number' | 'string' | 'null' | 'boolean' | 'array' | 'object' | 'react' {
    if (value === null || value === undefined) return 'null';
    if (typeof value === 'number') return 'number';
    if (typeof value === 'boolean') return 'boolean';
    if (typeof value === 'string') return 'string';
    if (Array.isArray(value)) return 'array';
    if (React.isValidElement(value)) return 'react';
    if (typeof value === 'object') return 'object';
    return 'string';
  }

  // Sort comparator function
  function sortComparator(a: unknown, b: unknown): number {
    const typeA = getValueType(a);
    const typeB = getValueType(b);
    // Handle null/undefined - always sort to end
    if (typeA === 'null' && typeB === 'null') return 0;
    if (typeA === 'null') return 1;
    if (typeB === 'null') return -1;
    // If types differ, compare as strings
    if (typeA !== typeB) {
      return normalizeValue(a).localeCompare(normalizeValue(b));
    }
    // Same type comparisons
    switch (typeA) {
      case 'number':
        return (a as number) - (b as number);
      case 'boolean':
        return a === b ? 0 : a ? 1 : -1;
      case 'string':
        return (a as string).localeCompare(b as string);
      case 'react': {
        // Extract text from React elements
        const textA = normalizeValue(a);
        const textB = normalizeValue(b);
        return textA.localeCompare(textB);
      }
      case 'array':
      case 'object': {
        // Stringify and compare
        const strA = JSON.stringify(a);
        const strB = JSON.stringify(b);
        return strA.localeCompare(strB);
      }
      default:
        return normalizeValue(a).localeCompare(normalizeValue(b));
    }
  }



  // Filtered data - apply row filtering based on conditions, then column filtering, then sorting
  const filteredData = useMemo(() => {
    let result = data
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
    // Apply sorting if a column is selected
    if (filterState.sortColumn && filterState.sortDirection) {
      result = [...result].sort((a, b) => {
        const valueA = a[filterState.sortColumn!];
        const valueB = b[filterState.sortColumn!];
        const comparison = sortComparator(valueA, valueB);
        return filterState.sortDirection === 'asc' ? comparison : -comparison;
      });
    }
    return result;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, filterState]);


  // Track when filtering/sorting is in progress
  useEffect(() => {
    // Set loading state to true when operation starts
    setIsSorting(true);
    // Use a small timeout to ensure the loading state is visible
    // and then set it to false after the computation is done
    const timeoutId = setTimeout(() => {
      setIsSorting(false);
    }, 100);
    return () => clearTimeout(timeoutId);
  }, [data, filterState]);

    // Reset all filters to initial state
    const resetFilters = () => {
      setFilterState({
        columnsFilter: columns.map(col => col.column),
        columnOrder: columns.map(col => col.column),
        conditions: [],
        sortColumn: null,
        sortDirection: null,
      });
    };



  // MAIN STATE (filterdColumns) COMPUTATION
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
    setFilterConditions,
    setSortColumn,
    resetFilters,
    isSorting,
  };
}
