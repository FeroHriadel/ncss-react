import React from "react";
import IconButton from "../../buttons/IconButton";
import MultiSelect, { type MultiSelectHandle } from "../../dropdowns/MultiSelect";
import { CiZoomIn, CiZoomOut, CiViewColumn, CiFilter } from "react-icons/ci";
import Modal from "../../dialogs/Modal";
import VirtualizedTableFilter, { type FilterRow } from "./VirtualizedTableFilter";



interface FilterState {
  columnsFilter: string[];
  columnOrder: string[];
  conditions: FilterRow[];
}

interface ControlBarProps {
  zoomLevel: number;
  minZoom: number;
  maxZoom: number;
  handleZoomIn: () => void;
  handleZoomOut: () => void;
  columns: { column: string; displayValue: string }[];
  setColumnsFilter: (selectedColumns: string[]) => void;
  filterState: FilterState;
  setFilterConditions: (conditions: FilterRow[]) => void;
  data: Record<string, unknown>[]; // For type inference in filter
}



const VirtualizedTableControlBar: React.FC<ControlBarProps> = ({
  zoomLevel,
  minZoom,
  maxZoom,
  handleZoomIn,
  handleZoomOut,
  columns,
  setColumnsFilter,
  filterState,
  setFilterConditions,
  data,
}) => {

  // Refs & values
  const multiselectRef = React.useRef<MultiSelectHandle>(null);
  const columnOptions = columns.map(col => ({ value: col.column, displayValue: col.displayValue }));  
  const preselectedOptions = columns.map(col => col.column);
  const [modalOpen, setModalOpen] = React.useState(false);


  // Handlers
  function handleColumnsChange(selectedColumns: string[]) {
    setColumnsFilter(selectedColumns);
  }

  function closeModal() {
    setModalOpen(false);
  }

  function openModal() {
    setModalOpen(true);
  }


  // Render
  return (
    <div className="w-full flex justify-between items-center p-2 border border-gray-300 border-b-0 bg-gray-50 rounded">

      {/*Left Side */}
      <div className="flex items-center">
        <span className="text-sm text-gray-600">Controls</span>
      </div>


      {/** Right Side */}
      <div className="flex items-center gap-2 relative">

        {/* Filter Modal */}
        <Modal
          trigger={<IconButton title="Filter" icon={<CiFilter size={20} onClick={openModal} />} />}
          className="w-[95%] sm:w-[75%]"
          isOpen={modalOpen}
          onClose={closeModal}
        >
          <VirtualizedTableFilter 
            columns={columns} 
            closeModal={closeModal}
            filterConditions={filterState.conditions}
            setFilterConditions={setFilterConditions}
            data={data}
          />
        </Modal>
          

        {/* Hide/show columns dropdown */}
        <MultiSelect
          trigger={<IconButton title="Show/Hide Columns" icon={<CiViewColumn size={20} />} />}
          options={columnOptions}
          title="Show/Hide Columns"
          preselectedOptions={preselectedOptions}
          ref={multiselectRef}
          onChange={handleColumnsChange}
        />

        {/* Zoom Controls */}
        <IconButton
          title="Zoom Out"
          onClick={handleZoomOut}
          icon={<CiZoomOut size={20} />}
          style={zoomLevel <= minZoom ? { pointerEvents: 'none', opacity: 0.6 } : undefined}
          disabled={zoomLevel <= minZoom}
        />

        <span className="text-xs text-gray-500 min-w-[40px] text-center">
          {Math.round(zoomLevel * 100)}%
        </span>

        <IconButton
          title="Zoom In"
          onClick={handleZoomIn}
          icon={<CiZoomIn size={20} />}
          style={zoomLevel >= maxZoom ? { pointerEvents: 'none', opacity: 0.6 } : undefined}
          disabled={zoomLevel >= maxZoom}
        />
      </div>
    </div>
  )
};

export default VirtualizedTableControlBar;
