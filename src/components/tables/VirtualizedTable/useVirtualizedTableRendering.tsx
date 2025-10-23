import { useState, useRef, useCallback, useEffect } from "react";
import type { VirtualizedTableProps } from "./VirtualizedTable";

interface UseVirtualizedTableRenderingProps {
  data: VirtualizedTableProps["data"];
  rowsPerPage?: number;
  bodyRef: React.RefObject<HTMLDivElement | null>;
  headerRef?: React.RefObject<HTMLDivElement | null>;
  scrollbarRef: React.RefObject<HTMLDivElement | null>;
}

export function useVirtualizedTableRendering({
  data,
  rowsPerPage = 15,
  bodyRef,
  headerRef,
  scrollbarRef,
}: UseVirtualizedTableRenderingProps) {
  // ===== State from useVirtualizedTableRows =====
  const [startRowIndex, setStartRowIndex] = useState(0);
  const lastScrollTop = useRef(0);

  // ===== State from useVirtualizedTableScroll =====
  const [isDraggingScrollbar, setIsDraggingScrollbar] = useState(false);
  const [isDraggingTable, setIsDraggingTable] = useState(false);
  const lastMousePosition = useRef({ x: 0, y: 0 });
  const dragAccumY = useRef(0);

  // ===== Functions from useVirtualizedTableRows =====
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

  function handleBodyScroll(e: React.UIEvent<HTMLDivElement>, headerRefParam?: React.RefObject<HTMLDivElement>) {
    const refToUse = headerRefParam || headerRef;
    if (refToUse && refToUse.current) {
      refToUse.current.scrollLeft = e.currentTarget.scrollLeft;
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

  // ===== Functions from useVirtualizedTableScroll =====
  
  // Sync header scroll with body scroll (useEffect)
  useEffect(() => {
    if (!bodyRef || !headerRef) return;
    const body = bodyRef.current;
    const header = headerRef.current;
    if (!body || !header) return;
    const syncHeaderScroll = () => {
      header.scrollLeft = body.scrollLeft;
    };
    body.addEventListener('scroll', syncHeaderScroll);
    return () => {
      body.removeEventListener('scroll', syncHeaderScroll);
    };
  }, [bodyRef, headerRef]);

  // Sync header scroll with body scroll (handler)
  const handleHeaderScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (bodyRef.current) {
      bodyRef.current.scrollLeft = e.currentTarget.scrollLeft;
    }
  };

  // Custom scrollbar drag logic
  const handleScrollbarDrag = useCallback((e: React.MouseEvent | MouseEvent) => {
    if (!scrollbarRef.current) return;
    const rect = scrollbarRef.current.getBoundingClientRect();
    const relativeY = e.clientY - rect.top;
    const percentage = Math.max(0, Math.min(1, relativeY / rect.height));
    const maxStartIndex = Math.max(0, data.length - rowsPerPage);
    const targetRowIndex = Math.floor(percentage * maxStartIndex);
    if (targetRowIndex !== startRowIndex && targetRowIndex >= 0 && targetRowIndex <= maxStartIndex) {
      setStartRowIndex(targetRowIndex);
    }
  }, [data.length, rowsPerPage, startRowIndex, setStartRowIndex, scrollbarRef]);

  const handleScrollbarMouseDown = (e: React.MouseEvent) => {
    setIsDraggingScrollbar(true);
    handleScrollbarDrag(e);
  };

  // Table drag-to-scroll handlers
  const handleTableMouseDown = (e: React.MouseEvent) => {
    setIsDraggingTable(true);
    lastMousePosition.current = { x: e.clientX, y: e.clientY };
    e.preventDefault();
  };

  const handleTableMouseLeave = () => {
    setIsDraggingTable(false);
  };

  // Mouse move/up listeners for drag
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingScrollbar) {
        handleScrollbarDrag(e);
      }
      if (isDraggingTable && bodyRef.current) {
        const deltaX = e.clientX - lastMousePosition.current.x;
        const deltaY = e.clientY - lastMousePosition.current.y;
        bodyRef.current.scrollLeft -= deltaX;
        // Don't use scrollTop for virtual rows, just accumulate drag
        dragAccumY.current -= deltaY;
        lastMousePosition.current = { x: e.clientX, y: e.clientY };

        const dragThreshold = 20; // px to trigger row change (faster)
        const maxStartIndex = Math.max(0, data.length - rowsPerPage);
        if (dragAccumY.current > dragThreshold) {
          setStartRowIndex((prev: number) => Math.min(maxStartIndex, prev + 1));
          dragAccumY.current = 0;
          bodyRef.current.scrollTop = Math.floor(bodyRef.current.scrollHeight / 2 - bodyRef.current.clientHeight / 2);
        }
        if (dragAccumY.current < -dragThreshold) {
          setStartRowIndex((prev: number) => {
            const next = Math.max(0, prev - 1);
            // If at row 0, reset scrollTop to top
            if (bodyRef.current) {
              if (next === 0) {
                bodyRef.current.scrollTop = 0;
              } else {
                bodyRef.current.scrollTop = Math.floor(bodyRef.current.scrollHeight / 2 - bodyRef.current.clientHeight / 2);
              }
            }
            return next;
          });
          dragAccumY.current = 0;
        }
      }
    };
    const handleMouseUp = () => {
      setIsDraggingScrollbar(false);
      setIsDraggingTable(false);
      dragAccumY.current = 0;
    };
    if (isDraggingScrollbar || isDraggingTable) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDraggingScrollbar, isDraggingTable, handleScrollbarDrag, bodyRef, data.length, rowsPerPage, setStartRowIndex]);

  // ===== Keyboard navigation =====
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      e.stopPropagation();
      setStartRowIndex(prev => {
        const maxIndex = Math.max(0, data.length - rowsPerPage);
        return Math.min(maxIndex, prev + 1);
      });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      e.stopPropagation();
      setStartRowIndex(prev => Math.max(0, prev - 1));
    } else if (e.key === 'PageDown') {
      e.preventDefault();
      e.stopPropagation();
      setStartRowIndex(prev => {
        const maxIndex = Math.max(0, data.length - rowsPerPage);
        return Math.min(maxIndex, prev + Math.floor(rowsPerPage / 2));
      });
    } else if (e.key === 'PageUp') {
      e.preventDefault();
      e.stopPropagation();
      setStartRowIndex(prev => Math.max(0, prev - Math.floor(rowsPerPage / 2)));
    } else if (e.key === 'Home') {
      e.preventDefault();
      e.stopPropagation();
      setStartRowIndex(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      e.stopPropagation();
      const maxIndex = Math.max(0, data.length - rowsPerPage);
      setStartRowIndex(maxIndex);
    }
  }, [data.length, rowsPerPage]);

  // ===== Return all functionality from both hooks =====
  return {
    // From useVirtualizedTableRows
    startRowIndex,
    setStartRowIndex,
    rowsPerPage,
    getVisibleRows,
    handleWheelEvent,
    handleBodyScroll,
    handleKeyDown, // Keyboard navigation
    // From useVirtualizedTableScroll
    isDraggingScrollbar,
    setIsDraggingScrollbar,
    scrollbarRef,
    handleScrollbarDrag,
    handleScrollbarMouseDown,
    isDraggingTable,
    setIsDraggingTable,
    lastMousePosition,
    handleTableMouseDown,
    handleTableMouseLeave,
    handleHeaderScroll,
  };
}
