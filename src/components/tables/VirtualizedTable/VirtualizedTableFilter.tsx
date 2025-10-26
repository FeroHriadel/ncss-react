import { useState } from "react";
import Button from "../../buttons/Button";
import type { DropdownOption } from "../../dropdowns/MultiSelect";
import Select from "../../dropdowns/Select";
import Input from "../../inputs/Input";
import Pill from "../../pills/Pill";
import CloseButton from "../../buttons/CloseButton";



export interface VirtualizedTableFilterProps {
  columns: { column: string; displayValue: string }[];
  closeModal: () => void;
}

export interface FilterRow {
  id: number;
  column: string | null;
  condition: string | null;
  value: string;
  operator: string | null;
}



export default function VirtualizedTableFilter({ columns, closeModal }: VirtualizedTableFilterProps) {
  // STATE & DROPDOWNS OPTIONS
  const columnsSelectOptions: DropdownOption[] = columns.map(col => ({
    value: col.column,
    displayValue: col.displayValue
  }));
  const conditionSelectOptions: DropdownOption []= [
    {value: 'equals', displayValue: 'Equals'}, 
    {value: 'not_equals', displayValue: 'Does not equal'},
    {value: 'contains', displayValue: 'Contains'},
    {value: 'not_contains', displayValue: 'Does not contain'},
    {value: 'greater_than', displayValue: 'Greater than'},
    {value: 'less_than', displayValue: 'Less than'},
    {value: 'starts_with', displayValue: 'Starts with'},
    {value: 'ends_with', displayValue: 'Ends with'},
    {value: 'is_between', displayValue: 'Is between'},
  ];
  const operatorSelectOptions: DropdownOption[] = [
    {value: 'and', displayValue: 'AND'},
    {value: 'or', displayValue: 'OR'},
  ];
  const [filterRows, setFilterRows] = useState<FilterRow[]>([
    { id: 1, column: null, condition: null, value: '', operator: null }
  ]);


  // HANDLERS
  const isRowValid = (row: FilterRow) => {
    return row.column !== null && 
           row.condition !== null && 
           row.value.trim() !== '' && 
           row.operator !== null;
  };

  const isRowPartiallyValid = (row: FilterRow) => {
    return row.column !== null && 
           row.condition !== null && 
           row.value.trim() !== '';
  };

  const handleClearFilters = () => {
    setFilterRows([{ id: Date.now(), column: null, condition: null, value: '', operator: null }]);
  };

  const removeRow = (id: number) => {
    setFilterRows(rows => {
      //don't allow removing the last row
      if (rows.length === 1) {
        return [{ id: Date.now(), column: null, condition: null, value: '', operator: null }];
      }
      return rows.filter(row => row.id !== id);
    });
  };

  const updateRow = (id: number, field: keyof FilterRow, value: string | null) => {
    setFilterRows(rows => {
      const updatedRows = rows.map(row => row.id === id ? { ...row, [field]: value } : row);
      //if we just set an operator and the row is now fully valid, add a new row
      if (field === 'operator' && value !== null) {
        const updatedRow = updatedRows.find(r => r.id === id);
        if (updatedRow && isRowValid(updatedRow)) {
          const newRow: FilterRow = {
            id: Date.now(),
            column: null,
            condition: null,
            value: '',
            operator: null
          };
          return [...updatedRows, newRow];
        }
      }
      return updatedRows;
    });
  };


  // RENDER
  return (
    <div className="w-full h-full">
      {/* Clear and Presets */}
      <h2 className="text-2xl font-bold mb-6">DATA FILTER</h2>
      <h3 className="text-lg font-semibold">Filter Options</h3>
      <p className="text-sm text-gray-700 mb-4">Add filter conditions to refine your data. Clear Filters or use Filter Presets (if available) below.</p>
      <section className="flex flex-wrap mb-12">
        <Button 
          width="160px" 
          className="m-1 mt-0 ml-0"
          onClick={handleClearFilters}
        >
          Clear Filters
        </Button>
        <Select width="160px" className="m-1 mt-0 ml-0" title="Filter Presets" options={[{ value: 'preset1', displayValue: 'Preset 1' }, { value: 'preset2', displayValue: 'Preset 2' }]} />
      </section>

      {/* Filters */}
      <h3 className="text-lg font-semibold">Filters to Apply</h3>
      <p className="text-sm text-gray-700 mb-4">Review and adjust your active filters. Click 'Apply Filters' to save changes.</p>
      <section>
        {filterRows.map((row, index) => (
          <div key={row.id}>
            <div className="w-full flex gap-1 items-center flex-wrap mb-2">
              <Select 
                options={columnsSelectOptions} 
                title="Column" 
                width="160px" 
                className="" 
                preselectedOption={row.column || undefined}
                onChange={(value) => updateRow(row.id, 'column', value)}
              />
              <Select 
                options={conditionSelectOptions} 
                title="Condition" 
                width="160px" 
                className="" 
                preselectedOption={row.condition || undefined}
                onChange={(value) => updateRow(row.id, 'condition', value)}
              />
              <Input 
                width="160px" 
                className="border border-gray-300" 
                placeholder="Condition value" 
                value={row.value}
                onChange={(e) => updateRow(row.id, 'value', e.target.value)}
              />
              {isRowPartiallyValid(row) && (
                <Select 
                  options={operatorSelectOptions} 
                  title="Operator" 
                  width="160px" 
                  className="" 
                  preselectedOption={row.operator || undefined}
                  onChange={(value) => updateRow(row.id, 'operator', value)}
                />
              )}
              <CloseButton className="min-w-[40px] h-[40px]" title="Remove condition" onClick={() => removeRow(row.id)} />
            </div>
            {row.operator && index < filterRows.length - 1 && (
              <div className="mb-4">
                <Pill>{row.operator.toUpperCase()}</Pill>
              </div>
            )}
            {!row.operator && index < filterRows.length - 1 && (
              <div className="mb-4"></div>
            )}
          </div>
        ))}
      </section>

      {/* Close & Apply */}
      <section className="w-full flex gap-1 justify-end">
        <Button variant="red" onClick={closeModal}>Cancel</Button>
        <Button>Apply Filters</Button>
      </section>
    </div>
  )
}