import React from "react";

export function useVirtualizedTableScroll({
  bodyRef,
  headerRef,
  scrollbarRef,
  startRowIndex,
  setStartRowIndex,
  rowsPerPage,
  dataLength
}: {
  bodyRef: React.RefObject<HTMLDivElement | null>;
  headerRef?: React.RefObject<HTMLDivElement | null>;
  scrollbarRef: React.RefObject<HTMLDivElement | null>;
  startRowIndex: number;
  setStartRowIndex: (idx: number) => void;
  rowsPerPage: number;
  dataLength: number;
}) {
  // Sync header scroll with body scroll
  React.useEffect(() => {
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
  // Sync header scroll with body scroll
  const handleHeaderScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (bodyRef.current) {
      bodyRef.current.scrollLeft = e.currentTarget.scrollLeft;
    }
  };
  const [isDraggingScrollbar, setIsDraggingScrollbar] = React.useState(false);
  const [isDraggingTable, setIsDraggingTable] = React.useState(false);
  const lastMousePosition = React.useRef({ x: 0, y: 0 });

  // Custom scrollbar drag logic
  const handleScrollbarDrag = React.useCallback((e: React.MouseEvent | MouseEvent) => {
    if (!scrollbarRef.current) return;
    const rect = scrollbarRef.current.getBoundingClientRect();
    const relativeY = e.clientY - rect.top;
    const percentage = Math.max(0, Math.min(1, relativeY / rect.height));
    const maxStartIndex = Math.max(0, dataLength - rowsPerPage);
    const targetRowIndex = Math.floor(percentage * maxStartIndex);
    if (targetRowIndex !== startRowIndex && targetRowIndex >= 0 && targetRowIndex <= maxStartIndex) {
      setStartRowIndex(targetRowIndex);
    }
  }, [dataLength, rowsPerPage, startRowIndex, setStartRowIndex, scrollbarRef]);

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
  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingScrollbar) {
        handleScrollbarDrag(e);
      }
      if (isDraggingTable && bodyRef.current) {
        const deltaX = e.clientX - lastMousePosition.current.x;
        const deltaY = e.clientY - lastMousePosition.current.y;
        bodyRef.current.scrollLeft -= deltaX;
        bodyRef.current.scrollTop -= deltaY;
        lastMousePosition.current = { x: e.clientX, y: e.clientY };
      }
    };
    const handleMouseUp = () => {
      setIsDraggingScrollbar(false);
      setIsDraggingTable(false);
    };
    if (isDraggingScrollbar || isDraggingTable) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDraggingScrollbar, isDraggingTable, handleScrollbarDrag, bodyRef]);

  return {
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
