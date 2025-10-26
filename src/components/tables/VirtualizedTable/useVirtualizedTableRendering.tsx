import { useState, useRef, useCallback, useEffect } from "react";
import type { VirtualizedTableProps } from "./VirtualizedTable";



interface UseVirtualizedTableRenderingProps {
  data: VirtualizedTableProps["data"];
  bodyRef: React.RefObject<HTMLDivElement | null>;
  headerRef?: React.RefObject<HTMLDivElement | null>;
  scrollbarRef: React.RefObject<HTMLDivElement | null>;
  zoomLevel?: number;
}



export function useVirtualizedTableRendering({
  data,
  bodyRef,
  headerRef,
  scrollbarRef,
  zoomLevel = 1,
}: UseVirtualizedTableRenderingProps) {

  // VALUES AND STATE
    // Constants
    const estimatedRowHeight = 41;
    const overscanCount = 5;
    const scrollbarPadding = 4;
    
    // Virtualization state
    const [scrollOffset, setScrollOffset] = useState(0);
    const [forceUpdateCounter, setForceUpdateCounter] = useState(0);
    const rowHeights = useRef<number[]>([]);
    const measurementCache = useRef<Map<number, number>>(new Map());
    
    // Drag scrollbar state
    const [isDraggingScrollbar, setIsDraggingScrollbar] = useState(false);
    const [isDraggingTable, setIsDraggingTable] = useState(false);
    const lastMousePosition = useRef({ x: 0, y: 0 });
    
    // Initialize row heights array to match data length
    if (rowHeights.current.length !== data.length) {
      rowHeights.current = new Array(data.length).fill(estimatedRowHeight);
    }
  

  // HELPER FUNCTIONS  
    // Calculate total scrollable height by summing all row heights
    function getTotalSize() { return rowHeights.current.reduce((sum, height) => sum + height, 0);}
    
    // Get Y position where a specific row starts
    function getRowOffset(index: number) { return rowHeights.current.slice(0, index).reduce((sum, height) => sum + height, 0); }
  
    // Find which row index is at a given scroll position
    function findRowAtScrollPosition(scrollTop: number) {
      let accumulatedHeight = 0;
      for (let i = 0; i < data.length; i++) {
        if (accumulatedHeight + rowHeights.current[i] > scrollTop) {
          return i;
        }
        accumulatedHeight += rowHeights.current[i];
      }
      return 0;
    }
  
    // Calculate which rows are visible (plus overscan)
    function calculateVisibleRows() {
      const containerHeight = bodyRef.current?.clientHeight || 500;
      const startIndex = findRowAtScrollPosition(scrollOffset);
      //find last visible row
      let endIndex = startIndex;
      let visibleHeight = 0;
      for (let i = startIndex; i < data.length; i++) {
        visibleHeight += rowHeights.current[i];
        endIndex = i;
        if (visibleHeight >= containerHeight + (overscanCount * estimatedRowHeight)) {
          break;
        }
      }
      //add overscan padding
      const startWithOverscan = Math.max(0, startIndex - overscanCount);
      const endWithOverscan = Math.min(data.length - 1, endIndex + overscanCount);
      return { startWithOverscan, endWithOverscan };
    }
  
    // Build array of virtual items with positions
    function buildVirtualItems() {
      const { startWithOverscan, endWithOverscan } = calculateVisibleRows();
      const virtualItems = [];
      for (let i = startWithOverscan; i <= endWithOverscan; i++) {
        virtualItems.push({
          index: i,
          start: getRowOffset(i),
          size: rowHeights.current[i],
          key: i,
        });
      }
      return virtualItems;
    }
  

  // CORE VIRTUALIZATION FUNCTIONS
    // Returns which rows should be rendered (visible + overscan)
    const getVirtualItems = useCallback(() => {
      return buildVirtualItems();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scrollOffset, data.length, bodyRef, forceUpdateCounter]);
    
    // Measure a rendered row's actual height
    const measureElement = useCallback((node: HTMLTableRowElement | null, index: number) => {
      if (!node) return;
      const measuredHeight = node.getBoundingClientRect().height;
      // update if height changed
      if (measuredHeight > 0 && rowHeights.current[index] !== measuredHeight) {
        rowHeights.current[index] = measuredHeight;
        measurementCache.current.set(index, measuredHeight);
        setForceUpdateCounter(prev => prev + 1);
      }
    }, []);
  

  // SCROLL HANDLERS
    // Update scroll offset when user scrolls (triggers virtualization recalculation)
    const handleNativeScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
      const scrollTop = e.currentTarget.scrollTop;
      setScrollOffset(scrollTop);
      //sync header horizontal scroll
      if (headerRef?.current) headerRef.current.scrollLeft = e.currentTarget.scrollLeft;
    }, [headerRef]);
    
    // Sync header scroll when user scrolls header directly
    function handleHeaderScroll(e: React.UIEvent<HTMLDivElement>) {
      if (bodyRef.current) bodyRef.current.scrollLeft = e.currentTarget.scrollLeft;
    }
    
    // Handle mousewheel scrolling - uses native scroll
    function handleWheelEvent(e: React.WheelEvent<HTMLDivElement>) {
      if (!bodyRef.current) return;
      const delta = e.deltaY;
      const currentScroll = bodyRef.current.scrollTop;
      const maxScroll = getTotalSize() - (bodyRef.current.clientHeight || 500);
      const newScroll = Math.max(0, Math.min(maxScroll, currentScroll + delta));
      bodyRef.current.scrollTop = newScroll;
      setScrollOffset(newScroll);
    }
  

  // SCROLLBAR DRAG HANDLERS
    // Calculate scroll position from scrollbar drag position
    const handleScrollbarDrag = useCallback((e: React.MouseEvent | MouseEvent) => {
      if (!scrollbarRef.current || !bodyRef.current) return;
      const rect = scrollbarRef.current.getBoundingClientRect();
      const trackHeight = rect.height - (scrollbarPadding * 2);
      const relativeY = Math.max(scrollbarPadding, Math.min(rect.height - scrollbarPadding, e.clientY - rect.top)) - scrollbarPadding;
      const percentage = Math.max(0, Math.min(1, relativeY / trackHeight));
      //set scroll position directly (same as mousewheel)
      const totalSize = getTotalSize();
      const containerHeight = bodyRef.current.clientHeight;
      const maxScroll = Math.max(0, totalSize - containerHeight);
      const targetScrollTop = percentage * maxScroll;
      bodyRef.current.scrollTop = targetScrollTop;
    }, [scrollbarRef, bodyRef]);
    
    // Start scrollbar drag
    function handleScrollbarMouseDown(e: React.MouseEvent) {
      setIsDraggingScrollbar(true);
      handleScrollbarDrag(e);
    }
  

  // TABLE DRAG-TO-SCROLL HANDLERS
    // Start table drag-to-scroll
    function handleTableMouseDown(e: React.MouseEvent) {
      setIsDraggingTable(true);
      lastMousePosition.current = { x: e.clientX, y: e.clientY };
      e.preventDefault();
    }
    
    // Stop table drag when mouse leaves
    function handleTableMouseLeave() {
      setIsDraggingTable(false);
    }
  

  // KEYBOARD NAVIGATION HANDLERS
    // Handle arrow keys, page up/down, home/end for scrolling
    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
      if (!bodyRef.current) return;
      const container = bodyRef.current;
      const containerHeight = container.clientHeight;
      const containerWidth = container.clientWidth;
      const scrollTop = container.scrollTop;
      const scrollLeft = container.scrollLeft;
      const scrollHeight = container.scrollHeight;
      const scrollWidth = container.scrollWidth;
      
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        e.stopPropagation();
        container.scrollTop = scrollTop + estimatedRowHeight;
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        e.stopPropagation();
        container.scrollTop = Math.max(0, scrollTop - estimatedRowHeight);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        e.stopPropagation();
        container.scrollLeft = Math.min(scrollWidth - containerWidth, scrollLeft + 100);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        e.stopPropagation();
        container.scrollLeft = Math.max(0, scrollLeft - 100);
      } else if (e.key === 'PageDown') {
        e.preventDefault();
        e.stopPropagation();
        container.scrollTop = Math.min(scrollHeight - containerHeight, scrollTop + containerHeight);
      } else if (e.key === 'PageUp') {
        e.preventDefault();
        e.stopPropagation();
        container.scrollTop = Math.max(0, scrollTop - containerHeight);
      } else if (e.key === 'Home') {
        e.preventDefault();
        e.stopPropagation();
        container.scrollTop = 0;
      } else if (e.key === 'End') {
        e.preventDefault();
        e.stopPropagation();
        container.scrollTop = scrollHeight - containerHeight;
      }
    }, [bodyRef]);
  

  // EFFECTS
    // Clear all measurements when zoom level changes
    useEffect(() => {
      // Scale estimate proportionally to zoom to minimize initial discrepancy
      // Actual measurements will refine this, but closer initial estimate prevents jumps
      const scaledEstimate = Math.max(20, Math.ceil(estimatedRowHeight * zoomLevel));
      rowHeights.current = new Array(data.length).fill(scaledEstimate);
      measurementCache.current.clear();
      //delay to let font-size transition complete before remeasuring
      const timer = setTimeout(() => {
        setForceUpdateCounter(prev => prev + 1);
      }, 250);
      return () => clearTimeout(timer);
    }, [zoomLevel, data.length]);
    
    // Sync header horizontal scroll with body (event listener approach)
    useEffect(() => {
      if (!bodyRef || !headerRef) return;
      const body = bodyRef.current;
      const header = headerRef.current;
      if (!body || !header) return;
      function syncHeaderScroll() {
        if (header) header.scrollLeft = body!.scrollLeft;
      }
      body.addEventListener('scroll', syncHeaderScroll);
      return () => body.removeEventListener('scroll', syncHeaderScroll);
    }, [bodyRef, headerRef]);
    
    // Handle mouse move and mouse up for drag operations
    useEffect(() => {
      function handleMouseMove(e: MouseEvent) {
        //scrollbar drag
        if (isDraggingScrollbar) {
          handleScrollbarDrag(e);
        }
        //table drag-to-scroll
        if (isDraggingTable && bodyRef.current) {
          const deltaX = e.clientX - lastMousePosition.current.x;
          const deltaY = e.clientY - lastMousePosition.current.y;
          bodyRef.current.scrollLeft -= deltaX;
          bodyRef.current.scrollTop -= deltaY;
          lastMousePosition.current = { x: e.clientX, y: e.clientY };
        }
      }
      function handleMouseUp() {
        setIsDraggingScrollbar(false);
        setIsDraggingTable(false);
      }
      if (isDraggingScrollbar || isDraggingTable) {
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
      }
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }, [isDraggingScrollbar, isDraggingTable, handleScrollbarDrag, bodyRef]);


  // EXPOSE FUNCTIONS AND VALUES
  return {
    // Virtualization core
    getTotalSize,
    getVirtualItems,
    measureElement,
    
    // Scroll handlers
    handleNativeScroll,
    handleWheelEvent,
    handleHeaderScroll,
    handleKeyDown,
    
    // Scrollbar drag
    handleScrollbarMouseDown,
    
    // Table drag-to-scroll
    handleTableMouseDown,
    handleTableMouseLeave,
  };
}
