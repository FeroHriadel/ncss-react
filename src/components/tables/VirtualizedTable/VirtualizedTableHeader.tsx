import React from "react";

interface Column {
  column: string;
  displayValue: string;
  width?: string;
}

interface VirtualizedTableHeaderProps {
  headerRef: React.RefObject<HTMLDivElement>;
  columnOrder: Column[];
  getVisibleColumns: (order: Column[]) => Column[];
  draggedColumn: string | null;
  dragOverColumn: string | null;
  getColumnStyle: (col: Column) => React.CSSProperties;
  zoomLevel: number;
  verticalSeparators: boolean;
  handleHeaderScroll: (e: React.UIEvent<HTMLDivElement>) => void;
  handleColumnMouseDown: (e: React.MouseEvent, column: string, displayValue: string) => void;
  handleColumnMouseUp: (column: string) => void;
  handleColumnMouseEnter: (column: string) => void;
  handleColumnMouseLeave: () => void;
}

const VirtualizedTableHeader: React.FC<VirtualizedTableHeaderProps> = ({
  headerRef,
  columnOrder,
  getVisibleColumns,
  draggedColumn,
  dragOverColumn,
  getColumnStyle,
  zoomLevel,
  verticalSeparators,
  handleHeaderScroll,
  handleColumnMouseDown,
  handleColumnMouseUp,
  handleColumnMouseEnter,
  handleColumnMouseLeave,
}) => (
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
          {getVisibleColumns(columnOrder).map((col, index) => (
            <th
              key={col.column}
              className={`text-left break-words cursor-move select-none transition-colors ${
                verticalSeparators &&
                index < getVisibleColumns(columnOrder).length - 1
                  ? "border-r border-gray-200"
                  : ""
              } ${draggedColumn === col.column ? "opacity-50" : ""} ${
                dragOverColumn === col.column ? "bg-blue-100" : ""
              }`}
              style={{
                ...getColumnStyle(col),
                padding: `${zoomLevel * 0.5}rem ${zoomLevel * 1}rem`,
              }}
              onMouseDown={(e) =>
                handleColumnMouseDown(e, col.column, col.displayValue)
              }
              onMouseUp={() => handleColumnMouseUp(col.column)}
              onMouseEnter={() => handleColumnMouseEnter(col.column)}
              onMouseLeave={handleColumnMouseLeave}
            >
              {col.displayValue}
            </th>
          ))}
        </tr>
      </thead>
    </table>
  </div>
);

export default VirtualizedTableHeader;
