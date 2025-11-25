import React, { useState, useEffect, useRef } from 'react';
import './TableBody.css';
import type { TableProps } from "./Table";

export interface Column {
  column: string;
  displayValue: string;
  width?: string;
}

interface TableBodyProps {
  bodyRef: React.RefObject<HTMLDivElement>;
  data: TableProps["data"];
  columns: Column[];
  verticalSeparators: boolean;
  zoomLevel: number;
  getColumnStyle: (col: Column) => React.CSSProperties;
  handleTableMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleTableMouseLeave: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleWheelEvent: (e: React.WheelEvent<HTMLDivElement>) => void;
  handleBodyScroll: (e: React.UIEvent<HTMLDivElement>) => void;
  horizontalSeparators: boolean;
  striped: boolean | { enabled: boolean; color?: string };
  hover: boolean | { enabled: boolean; color?: string };
}

const TableBody: React.FC<TableBodyProps> = ({
  bodyRef,
  data,
  columns,
  verticalSeparators,
  horizontalSeparators,
  zoomLevel,
  getColumnStyle,
  handleTableMouseDown,
  handleTableMouseLeave,
  handleWheelEvent,
  handleBodyScroll,
  striped,
  hover,
}) => {

  // VALUES
    // State and Refs
    const tableRef = useRef<HTMLTableElement>(null);
    const prevPositionsRef = useRef<string>('');
    const [tableScrollWidth, setTableScrollWidth] = useState<number>(0);
    const [columnPositions, setColumnPositions] = useState<number[]>([]);
    const [hoveredRowIndex, setHoveredRowIndex] = useState<number | null>(null);
    const [copyNotification, setCopyNotification] = useState<{ x: number; y: number; text: string } | null>(null);
    const visibleColumnsCount = columns.length;

  // HELPER FUNCTIONS
    // Get background CSS class for a row (striped or white)
    function getRowBackgroundClass(rowIndex: number): string {
      if (!striped) return 'table-row-bg table-row-bg-white';
      const stripedEnabled = typeof striped === 'boolean' ? striped : striped.enabled;
      if (!stripedEnabled) return 'table-row-bg table-row-bg-white';
      return rowIndex % 2 === 1 ? 'table-row-bg table-row-bg-striped' : 'table-row-bg table-row-bg-white';
    }
    
    // Check if hover is enabled for rows
    function isHoverEnabled(): boolean {
      if (!hover) return false;
      const hoverEnabled = typeof hover === 'boolean' ? hover : hover.enabled;
      return hoverEnabled;
    }
    
    // Render cell content (handles different data types)
    function renderCellValue(cellValue: unknown): React.ReactNode {
      if (React.isValidElement(cellValue)) return cellValue;
      if (typeof cellValue !== 'string') return JSON.stringify(cellValue);
      return String(cellValue);
    }

    // Extract text content from cell value for clipboard
    function extractTextFromCell(cellValue: unknown): string {
      if (React.isValidElement(cellValue)) {
        // Extract text content from React elements
        const extractText = (node: React.ReactNode): string => {
          if (typeof node === 'string') return node;
          if (typeof node === 'number') return String(node);
          if (React.isValidElement(node)) {
            const props = node.props as { children?: React.ReactNode };
            if (props.children) {
              if (Array.isArray(props.children)) {
                return props.children.map(extractText).join('');
              }
              return extractText(props.children);
            }
          }
          return '';
        };
        return extractText(cellValue);
      }
      if (typeof cellValue === 'string') return cellValue;
      if (typeof cellValue === 'number') return String(cellValue);
      if (typeof cellValue === 'boolean') return String(cellValue);
      if (cellValue === null) return 'null';
      if (cellValue === undefined) return 'undefined';
      if (Array.isArray(cellValue)) return cellValue.join(', ');
      return JSON.stringify(cellValue);
    }

    // Copy cell text to clipboard on double-click
    function handleCellDoubleClick(event: React.MouseEvent, cellValue: unknown) {
      // Don't copy if clicked element is interactive (button, link, etc.)
      const target = event.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.tagName === 'INPUT') {
        return;
      }
      const textContent = extractTextFromCell(cellValue);
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textContent)
          .then(() => {
            // Show notification at cursor position
            setCopyNotification({
              x: event.clientX,
              y: event.clientY,
              text: 'Copied!'
            });
            // Hide notification after 1 second
            setTimeout(() => {
              setCopyNotification(null);
            }, 1000);
          })
          .catch((err) => {
            console.error('Failed to copy to clipboard:', err);
          });
      }
    }

  // EVENT HANDLERS
    // Update scroll width on scroll
    function handleScrollWithUpdate(e: React.UIEvent<HTMLDivElement>) {
      handleBodyScroll(e);
      if (tableRef.current) {
        const newWidth = tableRef.current.scrollWidth;
        if (newWidth !== tableScrollWidth) setTableScrollWidth(newWidth);
      }
    }

  // EFFECTS
    // Measure column positions and table scroll width
    useEffect(() => {
      if (!tableRef.current) return;
        //helper function to measure column positions
        function measureColumns() {
          if (!tableRef.current) return;
          setTableScrollWidth(tableRef.current.scrollWidth); //update table scroll width for horizontal backgrounds/lines
          //measure column widths for vertical separator lines
          const firstRow = tableRef.current.querySelector('tbody tr');
          if (!firstRow) return;
          const cells = firstRow.querySelectorAll('td');
          const positions: number[] = [];
          let cumulativeWidth = 0;
          cells.forEach((cell, index) => {
            if (index < cells.length - 1) {
              cumulativeWidth += cell.offsetWidth;
              positions.push(cumulativeWidth);
            }
          });
          //only update state if positions changed (avoid unnecessary re-renders)
          const positionsStr = JSON.stringify(positions);
          if (positionsStr !== prevPositionsRef.current) {
            prevPositionsRef.current = positionsStr;
            setColumnPositions(positions);
          }
        }
      measureColumns(); //measure initially
      const handleResize = () => measureColumns(); //remeasure on window resize (e.g., DevTools open/close)
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, [zoomLevel, visibleColumnsCount, columns]);

  // RENDER
  return (
  <div className="table-body-wrapper">
    {/* Main scrollable container */}
    <div
      ref={bodyRef}
      className="table-body"
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
      onMouseDown={handleTableMouseDown}
      onMouseLeave={handleTableMouseLeave}
      onWheel={handleWheelEvent}
      onScroll={handleScrollWithUpdate}
    >

      {/* Table with all rows */}
      <table
        ref={tableRef}
        className="table-body-table"
        style={{
          tableLayout: 'fixed',
          fontSize: `${zoomLevel}rem`,
          transition: 'font-size 0.2s ease-out',
          width: '100%',
          backgroundColor: 'transparent',
        }}
      >

        {/* Table Body */}
        <tbody role="rowgroup">

          {/* Render all rows */}
          {data.map((row, rowIndex) => (
            <tr 
              key={rowIndex}
              className={`table-body-row ${getRowBackgroundClass(rowIndex)} ${isHoverEnabled() && hoveredRowIndex === rowIndex ? 'table-row-hovered' : ''}`}
              onMouseEnter={() => setHoveredRowIndex(rowIndex)}
              onMouseLeave={() => setHoveredRowIndex(null)}
              role="row"
              aria-rowindex={rowIndex + 1}
            >
              {/* Table cells */}
              {columns.map((col, colIndex) => {
                const cellValue = row[col.column];
                return (
                  <td
                    key={colIndex}
                    className="table-body-cell"
                    style={{
                      ...getColumnStyle(col),
                      borderBottom: horizontalSeparators ? '1px solid var(--nc-table-header-border)' : 'none',
                    }}
                    role="cell"
                    aria-colindex={colIndex + 1}
                    onDoubleClick={(e) => handleCellDoubleClick(e, cellValue)}
                  >
                    {renderCellValue(cellValue)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Vertical column separator lines */}
      <div style={{position: 'relative', pointerEvents: 'none'}}>
      {verticalSeparators && columnPositions.map((position, index) => (
        <div
          key={`vcol-${index}`}
          className="table-vertical-separator-line"
          style={{
            left: `${position}px`,
          }}
        />
      ))}
      </div>
    </div>

    {/* Copy notification */}
    {copyNotification && (
      <div
        className="copy-notification"
        style={{
          position: 'fixed',
          left: `${copyNotification.x}px`,
          top: `${copyNotification.y - 30}px`,
          zIndex: 10000,
        }}
      >
        {copyNotification.text}
      </div>
    )}
  </div>
  );
};

export default TableBody;
