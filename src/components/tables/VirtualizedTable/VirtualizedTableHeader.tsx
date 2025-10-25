import React, { useState, useCallback } from "react";

interface Column {
  column: string;
  displayValue: string;
  width?: string;
}

interface VirtualizedTableHeaderProps {
  headerRef: React.RefObject<HTMLDivElement>;
  visibleColumns: Column[];
  getColumnStyle: (col: Column) => React.CSSProperties;
  zoomLevel: number;
  verticalSeparators: boolean;
  handleHeaderScroll: (e: React.UIEvent<HTMLDivElement>) => void;
  setColumnOrder: (newOrder: string[]) => void;
}

interface GhostElement {
  x: number;
  y: number;
  text: string;
}

const VirtualizedTableHeader: React.FC<VirtualizedTableHeaderProps> = ({
  headerRef,
  visibleColumns,
  getColumnStyle,
  zoomLevel,
  verticalSeparators,
  handleHeaderScroll,
  setColumnOrder,
}) => {
  // Drag state
  const [draggedColumn, setDraggedColumn] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);
  const [ghostElement, setGhostElement] = useState<GhostElement | null>(null);

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent, column: string, displayValue: string) => {
    e.preventDefault();
    setDraggedColumn(column);
    setGhostElement({
      x: e.clientX,
      y: e.clientY,
      text: displayValue,
    });
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (ghostElement) {
      setGhostElement({
        ...ghostElement,
        x: e.clientX,
        y: e.clientY,
      });
    }
  }, [ghostElement]);

  const handleMouseUp = useCallback(() => {
    if (draggedColumn && dragOverColumn && draggedColumn !== dragOverColumn) {
      // Get all column keys from visibleColumns
      const currentOrder = visibleColumns.map(col => col.column);
      
      // Find indices
      const draggedIndex = currentOrder.indexOf(draggedColumn);
      const dragOverIndex = currentOrder.indexOf(dragOverColumn);
      
      // Reorder
      const newOrder = [...currentOrder];
      newOrder.splice(draggedIndex, 1);
      newOrder.splice(dragOverIndex, 0, draggedColumn);
      
      // Update order
      setColumnOrder(newOrder);
    }
    
    // Reset drag state
    setDraggedColumn(null);
    setDragOverColumn(null);
    setGhostElement(null);
  }, [draggedColumn, dragOverColumn, visibleColumns, setColumnOrder]);

  const handleMouseEnter = (column: string) => {
    if (draggedColumn) {
      setDragOverColumn(column);
    }
  };

  const handleMouseLeave = () => {
    setDragOverColumn(null);
  };

  // Add global mouse listeners when dragging
  React.useEffect(() => {
    if (draggedColumn) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [draggedColumn, handleMouseMove, handleMouseUp]);

  return (
    <>
      <div
        ref={headerRef}
        style={{
          overflow: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        className="[&::-webkit-scrollbar]:hidden"
        onScroll={handleHeaderScroll}
      >
        <table
          className="w-full border-collapse"
          style={{
            tableLayout: "fixed",
            fontSize: `${zoomLevel}rem`,
            transition: "font-size 0.2s ease-out",
          }}
        >
          <thead className="bg-gray-50">
            <tr>
              {visibleColumns.map((col, index) => (
                <th
                  key={col.column}
                  className={`text-left break-words cursor-move select-none transition-colors ${
                    verticalSeparators &&
                    index < visibleColumns.length - 1
                      ? "border-r border-gray-200"
                      : ""
                  } ${draggedColumn === col.column ? "opacity-50" : ""} ${
                    dragOverColumn === col.column ? "bg-blue-100" : ""
                  }`}
                  style={{
                    ...getColumnStyle(col),
                    padding: `${zoomLevel * 0.5}rem ${zoomLevel * 1}rem`,
                  }}
                  onMouseDown={(e) => handleMouseDown(e, col.column, col.displayValue)}
                  onMouseEnter={() => handleMouseEnter(col.column)}
                  onMouseLeave={handleMouseLeave}
                >
                  {col.displayValue}
                </th>
              ))}
            </tr>
          </thead>
        </table>
      </div>

      {/* Ghost element that follows cursor */}
      {ghostElement && (
        <div
          className="fixed pointer-events-none z-50 bg-white border border-gray-300 px-2 py-1 rounded shadow-lg text-sm"
          style={{
            left: ghostElement.x + 15,
            top: ghostElement.y - 5,
            transform: "translateY(-50%)",
          }}
        >
          {ghostElement.text}
        </div>
      )}
    </>
  );
};

export default VirtualizedTableHeader;
