import { useCallback, useRef, useEffect } from "react";

interface UseTableRenderingProps {
  bodyRef: React.RefObject<HTMLDivElement | null>;
  headerRef?: React.RefObject<HTMLDivElement | null>;
  zoomLevel?: number;
  handleZoomIn?: () => void;
  handleZoomOut?: () => void;
}

export function useTableRendering({
  bodyRef,
  headerRef,
  handleZoomIn,
  handleZoomOut,
}: UseTableRenderingProps) {

  // VALUES AND STATE
    // Drag table state
    const isDraggingTableRef = useRef(false);
    const lastMousePosition = useRef({ x: 0, y: 0 });

  // SCROLL HANDLERS
    // Sync header horizontal scroll with body
    const handleBodyScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
      //sync header horizontal scroll
      if (headerRef?.current) headerRef.current.scrollLeft = e.currentTarget.scrollLeft;
    }, [headerRef]);
    
    // Sync header scroll when user scrolls header directly
    function handleHeaderScroll(e: React.UIEvent<HTMLDivElement>) {
      if (bodyRef.current) bodyRef.current.scrollLeft = e.currentTarget.scrollLeft;
    }
    
    // Handle mousewheel scrolling for zoom
    function handleWheelEvent(e: React.WheelEvent<HTMLDivElement>) {
      if (e.ctrlKey) {
        e.preventDefault();
        if (e.deltaY < 0) {
          if (handleZoomIn) handleZoomIn();
        } else {
          if (handleZoomOut) handleZoomOut();
        }
      }
    }

  // TABLE DRAG-TO-SCROLL HANDLERS
    // Start table drag-to-scroll
    function handleTableMouseDown(e: React.MouseEvent) {
      isDraggingTableRef.current = true;
      lastMousePosition.current = { x: e.clientX, y: e.clientY };
      e.preventDefault();
    }
    
    // Stop table drag when mouse leaves
    function handleTableMouseLeave() {
      isDraggingTableRef.current = false;
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
        container.scrollTop = scrollTop + 50;
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        e.stopPropagation();
        container.scrollTop = Math.max(0, scrollTop - 50);
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
      } else if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        e.stopPropagation();
        if (handleZoomIn) handleZoomIn();
      } else if (e.key === '-' || e.key === '_') {
        e.preventDefault();
        e.stopPropagation();
        if (handleZoomOut) handleZoomOut();
      }
    }, [bodyRef, handleZoomIn, handleZoomOut]);

  // EFFECTS
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
        //table drag-to-scroll
        if (isDraggingTableRef.current && bodyRef.current) {
          const deltaX = e.clientX - lastMousePosition.current.x;
          const deltaY = e.clientY - lastMousePosition.current.y;
          bodyRef.current.scrollLeft -= deltaX;
          bodyRef.current.scrollTop -= deltaY;
          lastMousePosition.current = { x: e.clientX, y: e.clientY };
        }
      }
      function handleMouseUp() {
        isDraggingTableRef.current = false;
      }
      if (isDraggingTableRef.current) {
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
      }
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }, [bodyRef]);


  // EXPOSE FUNCTIONS AND VALUES
  return {
    // Scroll handlers
    handleBodyScroll,
    handleWheelEvent,
    handleHeaderScroll,
    handleKeyDown,
    
    // Table drag-to-scroll
    handleTableMouseDown,
    handleTableMouseLeave,
  };
}
