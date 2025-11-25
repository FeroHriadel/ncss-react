import { useState } from "react";

export function useTableZoom(initialZoom = 1, minZoom = 0.5, maxZoom = 1.5, zoomStep = 0.1) {
  const [zoomLevel, setZoomLevel] = useState(initialZoom);

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(maxZoom, prev + zoomStep));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(minZoom, prev - zoomStep));
  };

  return {
    zoomLevel,
    setZoomLevel,
    minZoom,
    maxZoom,
    zoomStep,
    handleZoomIn,
    handleZoomOut,
  };
}
