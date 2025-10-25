import React from "react";

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
}

const VirtualizedTableHeader: React.FC<VirtualizedTableHeaderProps> = ({
  headerRef,
  visibleColumns,
  getColumnStyle,
  zoomLevel,
  verticalSeparators,
  handleHeaderScroll,
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
          {visibleColumns.map((col, index) => (
            <th
              key={col.column}
              className={`text-left break-words ${
                verticalSeparators &&
                index < visibleColumns.length - 1
                  ? "border-r border-gray-200"
                  : ""
              }`}
              style={{
                ...getColumnStyle(col),
                padding: `${zoomLevel * 0.5}rem ${zoomLevel * 1}rem`,
              }}
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
