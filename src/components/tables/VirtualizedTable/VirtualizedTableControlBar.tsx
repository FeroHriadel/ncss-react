import React from "react";
import IconButton from "../../buttons/IconButton";
import MultiSelect, { type MultiSelectHandle } from "../../dropdowns/MultiSelect";
import { CiZoomIn, CiZoomOut, CiViewColumn, CiFilter } from "react-icons/ci";
import Modal from "../../dialogs/Modal";
import VirtualizedTableFilter, { type FilterRow } from "./VirtualizedTableFilter";
import { IoRefresh } from "react-icons/io5";
import Pill from "../../pills/Pill";



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
  resetFilters: () => void; // Reset all filters to initial state
  resultCount: number; // Number of filtered results
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
  resetFilters,
  resultCount,
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

  // Get human-readable condition label
  function getConditionLabel(condition: string | null): string {
    const conditionMap: Record<string, string> = {
      'equals': 'equals',
      'not_equals': 'does not equal',
      'contains': 'contains',
      'not_contains': 'does not contain',
      'greater_than': 'is greater than',
      'less_than': 'is less than',
      'starts_with': 'starts with',
      'ends_with': 'ends with',
      'is_between': 'is between',
    };
    return condition ? conditionMap[condition] || condition : '';
  }

  // Get column display name
  function getColumnDisplayName(columnKey: string | null): string {
    if (!columnKey) return '';
    const column = columns.find(col => col.column === columnKey);
    return column ? column.displayValue : columnKey;
  }

  // Format filter condition as readable text
  function formatFilterCondition(filter: FilterRow): string {
    const columnName = getColumnDisplayName(filter.column);
    const conditionLabel = getConditionLabel(filter.condition);
    return `${columnName} ${conditionLabel} ${filter.value}`;
  }

  // Remove a specific filter condition
  function removeFilterCondition(filterId: number) {
    const updatedConditions = filterState.conditions.filter(condition => condition.id !== filterId);
    setFilterConditions(updatedConditions);
  }


  // Render
  return (
    <>
      {/* Row number (left side) and controls (right side) Container */}
      <div className="w-full flex justify-between items-center p-2 border border-gray-300 bg-gray-200 rounded mb-2">

        {/*Left Side */}
        <div className="flex items-center">
          <span className="text-sm text-gray-600">
            {resultCount} {resultCount === 1 ? 'result' : 'results'}
          </span>
        </div>


        {/** Right Side */}
        <div className="flex items-center gap-2 relative">

          {/* Filter Modal */}
          <Modal
            trigger={<IconButton title="Filter" icon={<CiFilter size={20} />} onClick={openModal} />}
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

          {/* Refresh */}
          <IconButton
            title="Refresh data"
            onClick={resetFilters}
            icon={<IoRefresh size={20} />}
          />
        </div>
      </div>

      {/* Applied filters info bar */}
      {filterState.conditions.length > 0 && (
        <div className="applied-filters-wrap w-full p-2 rounded border border-gray-300 bg-gray-100 mb-2">
          <span className="text-xs text-gray-600 font-light block mb-1">Active Filters:</span>
          <div className="flex gap-2 flex-wrap items-center">
            {filterState.conditions.map((filter, index) => {
              const isLastPill = index === filterState.conditions.length - 1;
              return (
                <React.Fragment key={filter.id}>
                  <Pill onClose={() => removeFilterCondition(filter.id)}>
                    {formatFilterCondition(filter)}
                    {!isLastPill && filter.operator && (
                      <span className="ml-2 font-bold">
                        {filter.operator.toUpperCase()}
                      </span>
                    )}
                  </Pill>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      )}
    </>
  )
};

export default VirtualizedTableControlBar;
