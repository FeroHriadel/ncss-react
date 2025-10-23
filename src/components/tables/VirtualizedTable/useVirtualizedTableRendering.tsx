import { useState, useRef, useCallback, useEffect } from "react";
import type { VirtualizedTableProps } from "./VirtualizedTable";

interface UseVirtualizedTableRenderingProps {
  data: VirtualizedTableProps["data"];
  rowsPerPage?: number;
  bodyRef: React.RefObject<HTMLDivElement | null>;
  headerRef?: React.RefObject<HTMLDivElement | null>;
  scrollbarRef: React.RefObject<HTMLDivElement | null>;
  zoomLevel?: number;
}

export function useVirtualizedTableRendering({
  data,
  rowsPerPage = 15,
  bodyRef,
  headerRef,
  scrollbarRef,
  zoomLevel = 1,
}: UseVirtualizedTableRenderingProps) {
  // ===== TanStack-inspired virtualization =====
  const [scrollOffset, setScrollOffset] = useState(0);
  const [forceUpdateCounter, setForceUpdateCounter] = useState(0);
  const rowHeights = useRef<number[]>([]);
  const measurementCache = useRef<Map<number, number>>(new Map());
  const estimatedRowHeight = 41;
  
  // Initialize row heights if not already set
  if (rowHeights.current.length !== data.length) {
    rowHeights.current = new Array(data.length).fill(estimatedRowHeight);
  }
  
  // Clear measurements when zoom changes to force remeasurement
  useEffect(() => {
    // Use a larger estimated height when zooming in to prevent overflow during remeasurement
    const adjustedEstimate = Math.ceil(estimatedRowHeight * zoomLevel * 1.5);
    rowHeights.current = new Array(data.length).fill(adjustedEstimate);
    measurementCache.current.clear();
    
    // Small delay to let font-size transition complete, then force re-render
    const timer = setTimeout(() => {
      setForceUpdateCounter(prev => prev + 1);
    }, 250); // Wait for font-size transition (0.2s) + small buffer
    
    return () => clearTimeout(timer);
  }, [zoomLevel, data.length]);

  // Calculate total size and offsets (similar to TanStack's getTotalSize)
  const getTotalSize = useCallback(() => {
    return rowHeights.current.reduce((sum, height) => sum + height, 0);
  }, []);

  // Get start position for each row
  const getRowOffset = useCallback((index: number) => {
    return rowHeights.current.slice(0, index).reduce((sum, height) => sum + height, 0);
  }, []);

  // Calculate which rows should be visible based on scroll offset
  const getVirtualItems = useCallback(() => {
    const containerHeight = bodyRef.current?.clientHeight || 500;
    
    // Find the first visible row
    let startIndex = 0;
    let accumulatedHeight = 0;
    
    for (let i = 0; i < data.length; i++) {
      if (accumulatedHeight + rowHeights.current[i] > scrollOffset) {
        startIndex = i;
        break;
      }
      accumulatedHeight += rowHeights.current[i];
    }
    
    // Find the last visible row (with overscan)
    const overscan = 5;
    let endIndex = startIndex;
    let visibleHeight = 0;
    
    for (let i = startIndex; i < data.length; i++) {
      visibleHeight += rowHeights.current[i];
      endIndex = i;
      if (visibleHeight >= containerHeight + (overscan * estimatedRowHeight)) {
        break;
      }
    }
    
    // Add overscan to start
    startIndex = Math.max(0, startIndex - overscan);
    endIndex = Math.min(data.length - 1, endIndex + overscan);
    
    // Generate virtual items with their positions
    const virtualItems = [];
    for (let i = startIndex; i <= endIndex; i++) {
      virtualItems.push({
        index: i,
        start: getRowOffset(i),
        size: rowHeights.current[i],
        key: i,
      });
    }
    
    return virtualItems;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollOffset, data.length, bodyRef, getRowOffset, forceUpdateCounter]);

  // Measure element callback (like TanStack's measureElement)
  const measureElement = useCallback((node: HTMLTableRowElement | null, index: number) => {
    if (!node) return;
    
    const measuredHeight = node.getBoundingClientRect().height;
    
    // Only update if the height has changed
    if (measuredHeight > 0 && rowHeights.current[index] !== measuredHeight) {
      rowHeights.current[index] = measuredHeight;
      measurementCache.current.set(index, measuredHeight);
      // Force a re-render to update positions
      setForceUpdateCounter(prev => prev + 1);
    }
  }, []);

  // ===== Legacy state for compatibility =====
  const [startRowIndex, setStartRowIndex] = useState(0);
  const isResettingScroll = useRef(false);

  // ===== Drag state =====
  const [isDraggingScrollbar, setIsDraggingScrollbar] = useState(false);
  const [isDraggingTable, setIsDraggingTable] = useState(false);
  const lastMousePosition = useRef({ x: 0, y: 0 });
  const dragAccumY = useRef(0);

  // ===== Scroll handling (TanStack-inspired) =====
  
  // Handle native scroll - update our scroll offset
  const handleNativeScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    setScrollOffset(scrollTop);
    
    // Sync header horizontal scroll
    if (headerRef?.current) {
      headerRef.current.scrollLeft = e.currentTarget.scrollLeft;
    }
  }, [headerRef]);

  // Wheel event - smooth scrolling
  function handleWheelEvent(e: React.WheelEvent<HTMLDivElement>) {
    if (!bodyRef.current) return;
    
    const delta = e.deltaY;
    const currentScroll = bodyRef.current.scrollTop;
    const maxScroll = getTotalSize() - (bodyRef.current.clientHeight || 500);
    const newScroll = Math.max(0, Math.min(maxScroll, currentScroll + delta));
    
    bodyRef.current.scrollTop = newScroll;
    setScrollOffset(newScroll);
  }

  // Legacy compatibility
  const getVisibleRows = useCallback(() => {
    const start = startRowIndex;
    const end = Math.min(start + rowsPerPage, data.length);
    return { start, end, rows: data.slice(start, end) };
  }, [startRowIndex, rowsPerPage, data]);

  function handleBodyScroll(e: React.UIEvent<HTMLDivElement>, headerRefParam?: React.RefObject<HTMLDivElement>) {
    const refToUse = headerRefParam || headerRef;
    if (refToUse && refToUse.current) {
      refToUse.current.scrollLeft = e.currentTarget.scrollLeft;
    }
  }
  
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

  // Reset vertical scroll position when startRowIndex changes
  // This keeps the browser scroll in the middle so virtual scrolling can continue
  useEffect(() => {
    if (!bodyRef.current) return;
    isResettingScroll.current = true;
    // Reset to top to allow consistent scrolling behavior
    bodyRef.current.scrollTop = 0;
    // Allow scroll events after a brief moment
    setTimeout(() => {
      isResettingScroll.current = false;
    }, 50);
  }, [startRowIndex, bodyRef]);

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
    const padding = 4; // Account for top-1 and bottom-1 padding (4px each)
    const trackHeight = rect.height - (padding * 2);
    const relativeY = Math.max(padding, Math.min(rect.height - padding, e.clientY - rect.top)) - padding;
    const percentage = Math.max(0, Math.min(1, relativeY / trackHeight));
    const maxStartIndex = Math.max(0, data.length - rowsPerPage);
    const targetRowIndex = Math.round(percentage * maxStartIndex);
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
        
        // Directly scroll the container (same as mousewheel)
        bodyRef.current.scrollLeft -= deltaX;
        bodyRef.current.scrollTop -= deltaY;
        
        lastMousePosition.current = { x: e.clientX, y: e.clientY };
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
  }, [isDraggingScrollbar, isDraggingTable, handleScrollbarDrag, bodyRef]);

  // ===== Keyboard navigation =====
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!bodyRef.current) return;
    
    const container = bodyRef.current;
    const containerHeight = container.clientHeight;
    const scrollTop = container.scrollTop;
    const scrollHeight = container.scrollHeight;
    
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      e.stopPropagation();
      // Scroll down by one row height (use estimated)
      container.scrollTop = scrollTop + estimatedRowHeight;
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      e.stopPropagation();
      // Scroll up by one row height
      container.scrollTop = Math.max(0, scrollTop - estimatedRowHeight);
    } else if (e.key === 'PageDown') {
      e.preventDefault();
      e.stopPropagation();
      // Scroll down by container height
      container.scrollTop = Math.min(scrollHeight - containerHeight, scrollTop + containerHeight);
    } else if (e.key === 'PageUp') {
      e.preventDefault();
      e.stopPropagation();
      // Scroll up by container height
      container.scrollTop = Math.max(0, scrollTop - containerHeight);
    } else if (e.key === 'Home') {
      e.preventDefault();
      e.stopPropagation();
      // Scroll to top
      container.scrollTop = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      e.stopPropagation();
      // Scroll to bottom
      container.scrollTop = scrollHeight - containerHeight;
    }
  }, [bodyRef]);

  // ===== Return all functionality =====
  return {
    // TanStack-inspired virtualization
    scrollOffset,
    getTotalSize,
    getVirtualItems,
    measureElement,
    handleNativeScroll,
    // Legacy compatibility
    startRowIndex,
    setStartRowIndex,
    rowsPerPage,
    getVisibleRows,
    handleWheelEvent,
    handleBodyScroll,
    handleKeyDown,
    // Drag & scroll
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
