import { useState, useRef, useCallback } from "react";
import type { VirtualizedTableProps } from "./VirtualizedTable";



interface UseVirtualizedTableRowsProps {
  data: VirtualizedTableProps["data"];
  rowsPerPage?: number;
}



export function useVirtualizedTableRows({ data, rowsPerPage = 15 }: UseVirtualizedTableRowsProps) {
  const [startRowIndex, setStartRowIndex] = useState(0);
  const lastScrollTop = useRef(0);

  const getVisibleRows = useCallback(() => {
    const start = startRowIndex;
    const end = Math.min(start + rowsPerPage, data.length);
    return { start, end, rows: data.slice(start, end) };
  }, [startRowIndex, rowsPerPage, data]);

  function handleWheelEvent(e: React.WheelEvent<HTMLDivElement>) {
    const scrollingUp = e.deltaY < 0;
    const scrollingDown = e.deltaY > 0;
    if (scrollingUp) {
      setStartRowIndex(prev => Math.max(0, prev - 1));
    }
    if (scrollingDown) {
      setStartRowIndex(prev => {
        const maxIndex = Math.max(0, data.length - rowsPerPage);
        return Math.min(maxIndex, prev + 1);
      });
    }
  }

  function handleBodyScroll(e: React.UIEvent<HTMLDivElement>, headerRef?: React.RefObject<HTMLDivElement>) {
    if (headerRef && headerRef.current) {
      headerRef.current.scrollLeft = e.currentTarget.scrollLeft;
    }
    const scrollTop = e.currentTarget.scrollTop;
    const scrollHeight = e.currentTarget.scrollHeight;
    const clientHeight = e.currentTarget.clientHeight;
    const baseThreshold = 5;
    const zoomAdjustedThreshold = baseThreshold;
    const scrollingDown = scrollTop > lastScrollTop.current;
    const scrollingUp = scrollTop < lastScrollTop.current;
    lastScrollTop.current = scrollTop;
    const atBottom = scrollTop + clientHeight >= scrollHeight - zoomAdjustedThreshold;
    const atTop = scrollTop <= zoomAdjustedThreshold;
    if (scrollingDown && atBottom && startRowIndex < data.length - rowsPerPage) {
      setStartRowIndex(prev => Math.min(data.length - rowsPerPage, prev + 1));
    }
    if (scrollingUp && atTop && startRowIndex > 0) {
      setStartRowIndex(prev => Math.max(0, prev - 1));
    }
  }

  return {
    startRowIndex,
    setStartRowIndex,
    rowsPerPage,
    getVisibleRows,
    handleWheelEvent,
    handleBodyScroll,
  };
}
