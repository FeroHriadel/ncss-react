import { useState, useRef, useCallback } from "react";
import type { VirtualizedTableProps } from "./VirtualizedTable";



interface UseVirtualizedTableRowsProps {
  data: VirtualizedTableProps["data"];
  rowsPerPage?: number;
}



export function useVirtualizedTableRows({ data, rowsPerPage = 15 }: UseVirtualizedTableRowsProps) {
  const [startRowIndex, setStartRowIndex] = useState(0);
  const [isChangingRows, setIsChangingRows] = useState(false);
  const lastScrollTop = useRef(0);

  const getVisibleRows = useCallback(() => {
    const start = startRowIndex;
    const end = Math.min(start + rowsPerPage, data.length);
    return { start, end, rows: data.slice(start, end) };
  }, [startRowIndex, rowsPerPage, data]);

  function handleWheelEvent(e: React.WheelEvent<HTMLDivElement>) {
    if (isChangingRows) return;
    e.preventDefault();
    const scrollingUp = e.deltaY < 0;
    const scrollingDown = e.deltaY > 0;
    if (scrollingUp && startRowIndex > 0) {
      setIsChangingRows(true);
      setStartRowIndex(Math.max(0, startRowIndex - 1));
      setTimeout(() => setIsChangingRows(false), 50);
    }
    if (scrollingDown && startRowIndex < data.length - rowsPerPage) {
      setIsChangingRows(true);
      setStartRowIndex(Math.min(data.length - rowsPerPage, startRowIndex + 1));
      setTimeout(() => setIsChangingRows(false), 50);
    }
  }

  function handleBodyScroll(e: React.UIEvent<HTMLDivElement>, headerRef?: React.RefObject<HTMLDivElement>) {
    if (headerRef && headerRef.current) {
      headerRef.current.scrollLeft = e.currentTarget.scrollLeft;
    }
    if (isChangingRows) return;
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
      setIsChangingRows(true);
      setStartRowIndex(Math.min(data.length - rowsPerPage, startRowIndex + 1));
      setTimeout(() => setIsChangingRows(false), 50);
    }
    if (scrollingUp && atTop && startRowIndex > 0) {
      setIsChangingRows(true);
      setStartRowIndex(Math.max(0, startRowIndex - 1));
      setTimeout(() => setIsChangingRows(false), 50);
    }
  }

  return {
    startRowIndex,
    setStartRowIndex,
    rowsPerPage,
    isChangingRows,
    setIsChangingRows,
    getVisibleRows,
    handleWheelEvent,
    handleBodyScroll,
  };
}
