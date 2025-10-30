import React, { useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { BiSolidUpArrow } from "react-icons/bi";




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
  sortColumn: string | null;
  sortDirection: 'asc' | 'desc' | null;
  setSortColumn: (column: string) => void;
  headerClassName?: string;
  headerStyle?: React.CSSProperties;
}

interface GhostElement {
  x: number;
  y: number;
  text: string;
  width: string;
  padding: string;
}




const VirtualizedTableHeader: React.FC<VirtualizedTableHeaderProps> = ({
  headerRef,
  visibleColumns,
  getColumnStyle,
  zoomLevel,
  handleHeaderScroll,
  setColumnOrder,
  verticalSeparators,
  sortColumn,
  sortDirection,
  setSortColumn,
  headerClassName,
  headerStyle,
}) => {
  // Drag state
  const [draggedColumn, setDraggedColumn] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);
  const [ghostElement, setGhostElement] = useState<GhostElement | null>(null);

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent, column: string, displayValue: string, col: Column) => {
    e.preventDefault();
    setDraggedColumn(column);
    const columnStyle = getColumnStyle(col);
    const width = columnStyle.width as string || 'auto';
    const padding = `${zoomLevel * 0.5}rem ${zoomLevel * 1}rem`;
    
    setGhostElement({
      x: e.clientX,
      y: e.clientY,
      text: displayValue,
      width: width,
      padding: padding,
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
          ...headerStyle,
        }}
        className={"[&::-webkit-scrollbar]:hidden " + (headerClassName ? ` ${headerClassName}` : "")}
        onScroll={handleHeaderScroll}
        role="rowgroup"
      >
        <table
          className="w-full border-collapse"
          style={{
            tableLayout: "fixed",
          }}
        >
          <thead className="bg-gray-200">
            <tr role="row">
              {visibleColumns.map((col, index) => (
                <th
                  key={col.column}
                  className={`
                    text-left text-gray-600 text-sm break-words cursor-move select-none transition-colors ${draggedColumn === col.column ? "opacity-50" : ""} 
                    ${dragOverColumn === col.column ? "bg-blue-100" : ""} 
                    ${verticalSeparators && col.column !== visibleColumns[visibleColumns.length - 1].column ? "border-r border-gray-300" : ""}    
                  `}
                  style={{
                    ...getColumnStyle(col),
                    padding: `${zoomLevel * 0.5}rem ${zoomLevel * 1}rem`,
                  }}
                  onMouseDown={(e) => handleMouseDown(e, col.column, col.displayValue, col)}
                  onMouseEnter={() => handleMouseEnter(col.column)}
                  onMouseLeave={handleMouseLeave}
                  role="columnheader"
                  aria-colindex={index + 1}
                  aria-sort={sortColumn === col.column ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span>{col.displayValue}</span>
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        setSortColumn(col.column);
                      }}
                      role="button"
                      aria-label={`Sort by ${col.displayValue}`}
                      tabIndex={0}
                      className="cursor-pointer hover:text-gray-800 transition-colors flex-shrink-0"
                      style={{
                        transform: sortColumn === col.column && sortDirection === 'desc' ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s',
                        opacity: sortColumn === col.column ? 1 : 0.4,
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setSortColumn(col.column);
                        }
                      }}
                    >
                      <BiSolidUpArrow size={12} />
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
        </table>
      </div>

      {/* Ghost element that follows cursor - rendered in a portal to avoid positioning issues */}
      {ghostElement && createPortal(
        <div
          className="fixed pointer-events-none z-50 bg-gray-200 border border-gray-300 rounded shadow-lg text-sm text-left text-gray-600 break-words"
          role="presentation"
          aria-hidden="true"
          style={{
            left: ghostElement.x,
            top: ghostElement.y,
            width: ghostElement.width,
            padding: ghostElement.padding,
            transform: 'translate(10px, 10px)',
          }}
        >
          {ghostElement.text}
        </div>,
        document.body
      )}
    </>
  );
};

export default VirtualizedTableHeader;
