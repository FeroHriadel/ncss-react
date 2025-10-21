import React from "react";

export interface VirtualizedTableColumnGhostProps {
  x: number;
  y: number;
  text: React.ReactNode;
}

const VirtualizedTableColumnGhost: React.FC<VirtualizedTableColumnGhostProps> = ({ x, y, text }) => (
  <div
    className="fixed pointer-events-none z-50 bg-white border border-gray-300 px-2 py-1 rounded shadow-lg text-sm"
    style={{
      left: x + 15,
      top: y - 5,
      transform: "translateY(-50%)",
    }}
  >
    {text}
  </div>
);

export default VirtualizedTableColumnGhost;
