import React from "react";

export interface UseVirtualizedTableColumnsOptions {
  columns: { column: string; displayValue: string; width?: string }[];
}

export function useVirtualizedTableColumns({ columns }: UseVirtualizedTableColumnsOptions) {
  // State for column visibility
  const [visibleColumns, setVisibleColumns] = React.useState<{ [key: string]: boolean }>({});
  // State for dropdown visibility
  const [showColumnOptions, setShowColumnOptions] = React.useState(false);
  // Ref for dropdown
  const columnOptionsRef = React.useRef<HTMLDivElement>(null);

  // Initialize visible columns when columns change
  React.useEffect(() => {
    const initialVisibility: { [key: string]: boolean } = {};
    columns.forEach(col => {
      initialVisibility[col.column] = true;
    });
    setVisibleColumns(initialVisibility);
  }, [columns]);

  // Toggle column visibility
  const toggleColumnVisibility = (columnKey: string) => {
    setVisibleColumns(prev => ({
      ...prev,
      [columnKey]: !prev[columnKey]
    }));
  };

  // Click outside to close dropdown
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (columnOptionsRef.current && !columnOptionsRef.current.contains(event.target as Node)) {
        setShowColumnOptions(false);
      }
    };
    if (showColumnOptions) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showColumnOptions]);

  // Filter visible columns and apply custom order
  const getVisibleColumns = (columnOrder: string[]) => {
    const orderedColumns = columnOrder.length > 0 ? columnOrder : columns.map(c => c.column);
    return orderedColumns
      .map(colKey => columns.find(col => col.column === colKey))
      .filter(col => col && visibleColumns[col.column] !== false) as { column: string; displayValue: string; width?: string }[];
  };

  return {
    visibleColumns,
    setVisibleColumns,
    showColumnOptions,
    setShowColumnOptions,
    columnOptionsRef,
    toggleColumnVisibility,
    getVisibleColumns,
  };
}
