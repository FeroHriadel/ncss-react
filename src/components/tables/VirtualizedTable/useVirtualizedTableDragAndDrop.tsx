import React from "react";

export function useVirtualizedTableDragAndDrop({ columns, columnOrder, setColumnOrder }: {
  columns: { column: string; displayValue: string; width?: string }[];
  columnOrder: string[];
  setColumnOrder: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const [draggedColumn, setDraggedColumn] = React.useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = React.useState<string | null>(null);
  const [ghostElement, setGhostElement] = React.useState<{ x: number; y: number; text: string } | null>(null);

  const handleColumnMouseDown = (e: React.MouseEvent, columnKey: string, displayValue: string) => {
    setDraggedColumn(columnKey);
    setGhostElement({
      x: e.clientX,
      y: e.clientY,
      text: displayValue,
    });
    e.preventDefault();
  };

  const handleColumnMouseMove = React.useCallback((e: MouseEvent) => {
    if (draggedColumn && ghostElement) {
      setGhostElement(prev => prev ? {
        ...prev,
        x: e.clientX,
        y: e.clientY,
      } : null);
    }
  }, [draggedColumn, ghostElement]);

  const handleColumnMouseUp = React.useCallback((targetColumnKey?: string) => {
    if (draggedColumn && targetColumnKey && draggedColumn !== targetColumnKey) {
      const newOrder = [...(columnOrder.length > 0 ? columnOrder : columns.map(c => c.column))];
      const draggedIndex = newOrder.indexOf(draggedColumn);
      const targetIndex = newOrder.indexOf(targetColumnKey);
      if (draggedIndex !== -1 && targetIndex !== -1) {
        const [draggedItem] = newOrder.splice(draggedIndex, 1);
        newOrder.splice(targetIndex, 0, draggedItem);
        setColumnOrder(newOrder);
      }
    }
    setDraggedColumn(null);
    setDragOverColumn(null);
    setGhostElement(null);
  }, [draggedColumn, columnOrder, columns, setColumnOrder]);

  const handleColumnMouseEnter = (columnKey: string) => {
    if (draggedColumn && draggedColumn !== columnKey) {
      setDragOverColumn(columnKey);
    }
  };

  const handleColumnMouseLeave = () => {
    setDragOverColumn(null);
  };

  // Handle global mouse events for column dragging
  React.useEffect(() => {
    if (draggedColumn) {
      document.addEventListener("mousemove", handleColumnMouseMove);
      document.addEventListener("mouseup", () => handleColumnMouseUp());
    }
    return () => {
      document.removeEventListener("mousemove", handleColumnMouseMove);
      document.removeEventListener("mouseup", () => handleColumnMouseUp());
    };
  }, [draggedColumn, handleColumnMouseMove, handleColumnMouseUp]);

  return {
    draggedColumn,
    setDraggedColumn,
    dragOverColumn,
    setDragOverColumn,
    ghostElement,
    setGhostElement,
    handleColumnMouseDown,
    handleColumnMouseMove,
    handleColumnMouseUp,
    handleColumnMouseEnter,
    handleColumnMouseLeave,
  };
}
