import { useState, useRef } from "react";
import * as React from 'react';
import Button from "../../buttons/Button";
import type { DropdownOption } from "../../dropdowns/MultiSelect";
import Select, { type SelectHandle } from "../../dropdowns/Select";
import Input from "../../inputs/Input";
import Pill from "../../pills/Pill";
import CloseButton from "../../buttons/CloseButton";



export interface FilterRow {
  id: number;
  column: string | null;
  condition: string | null;
  value: string;
  operator: 'and' | 'or' | null;
}

export interface FilterPreset {
  name: string;
  filters: Omit<FilterRow, 'id'>[];
}

export interface VirtualizedTableFilterProps {
  columns: { column: string; displayValue: string }[];
  closeModal: () => void;
  filterConditions: FilterRow[];
  setFilterConditions: (conditions: FilterRow[]) => void;
  data?: Record<string, unknown>[]; // Sample data to infer column types
  filterPresets?: FilterPreset[];
}

type ColumnType = 'number' | 'string' | 'boolean' | 'array' | 'object' | 'html' | 'unknown';




export default function VirtualizedTableFilter({ columns, closeModal, filterConditions, setFilterConditions, data, filterPresets }: VirtualizedTableFilterProps) {
  // HELPER FUNCTIONS
  // Infer column type from sample data
  const inferColumnType = (columnName: string): ColumnType => {
    if (!data || data.length === 0) return 'unknown';
    
    // Sample first non-null value
    const sampleValue = data.find(row => row[columnName] != null)?.[columnName];
    if (sampleValue === undefined || sampleValue === null) return 'unknown';
    
    if (React.isValidElement(sampleValue)) return 'html';
    if (typeof sampleValue === 'number') return 'number';
    if (typeof sampleValue === 'boolean') return 'boolean';
    if (Array.isArray(sampleValue)) return 'array';
    if (typeof sampleValue === 'object') return 'object';
    if (typeof sampleValue === 'string') return 'string';
    
    return 'unknown';
  };

  // Get available conditions based on column type
  const getConditionsForColumn = (columnName: string | null): DropdownOption[] => {
    if (!columnName) return conditionSelectOptions;
    
    const columnType = inferColumnType(columnName);
    
    switch (columnType) {
      case 'number':
        return conditionSelectOptions.filter(opt => 
          ['equals', 'not_equals', 'greater_than', 'less_than', 'is_between'].includes(opt.value)
        );
      
      case 'string':
        return conditionSelectOptions.filter(opt => 
          ['equals', 'not_equals', 'contains', 'not_contains', 'starts_with', 'ends_with'].includes(opt.value)
        );
      
      case 'boolean':
        return conditionSelectOptions.filter(opt => 
          ['equals', 'not_equals'].includes(opt.value)
        );
      
      case 'html':
        return conditionSelectOptions.filter(opt => 
          ['contains', 'not_contains', 'starts_with', 'ends_with'].includes(opt.value)
        );
      
      case 'array':
      case 'object':
        return conditionSelectOptions.filter(opt => 
          ['contains', 'not_contains'].includes(opt.value)
        );
      
      default:
        return conditionSelectOptions; // Show all if type unknown
    }
  };

  // Get placeholder text based on condition
  const getPlaceholderForCondition = (columnName: string | null, condition: string | null): string => {
    if (!columnName || !condition) return 'Enter value';
    
    const columnType = inferColumnType(columnName);
    
    if (condition === 'is_between') {
      return columnType === 'number' 
        ? 'Enter comma separated numbers: e.g., 20, 55'
        : 'Enter comma separated values: e.g., value1, value2';
    }
    
    switch (columnType) {
      case 'number':
        return 'Enter a number';
      case 'boolean':
        return 'Enter true or false';
      case 'array':
        return 'Enter text';
      case 'object':
        return 'Enter text';
      case 'html':
        return 'Enter text';
      default:
        return 'Enter value';
    }
  };

  // Validate filter value based on column type and condition
  const validateFilterValue = (columnName: string | null, condition: string | null, value: string): boolean => {
    if (!columnName || !condition || !value.trim()) return true; // Skip validation for empty
    
    const columnType = inferColumnType(columnName);
    
    // Arrays, objects, and HTML can accept any text
    if (['array', 'object', 'html'].includes(columnType)) return true;
    
    // Number validation
    if (columnType === 'number') {
      if (condition === 'is_between') {
        const parts = value.split(',').map(v => v.trim());
        if (parts.length !== 2) {
          console.warn(`Column '${columnName}' is a number. For 'is between', please enter exactly two comma-separated numbers (e.g., "20, 55").`);
          return false;
        }
        if (parts.some(p => isNaN(parseFloat(p)))) {
          console.warn(`Column '${columnName}' is a number but '${value}' contains non-numeric values. Please enter valid numbers.`);
          return false;
        }
      } else {
        if (isNaN(parseFloat(value))) {
          console.warn(`Column '${columnName}' is a number but '${value}' is not a valid number. Please enter a number.`);
          return false;
        }
      }
    }
    
    // Boolean validation
    if (columnType === 'boolean') {
      const lowerValue = value.toLowerCase();
      if (!['true', 'false', '1', '0'].includes(lowerValue)) {
        console.warn(`Column '${columnName}' is a boolean but '${value}' is not a valid boolean. Please enter 'true' or 'false'.`);
        return false;
      }
    }
    
    return true;
  };

  // STATE & DROPDOWNS OPTIONS
  const columnsSelectOptions: DropdownOption[] = columns.map(col => ({
    value: col.column,
    displayValue: col.displayValue
  }));
  const conditionSelectOptions: DropdownOption []= [
    {value: 'equals', displayValue: 'equals'}, 
    {value: 'not_equals', displayValue: 'does not equal'},
    {value: 'contains', displayValue: 'contains'},
    {value: 'not_contains', displayValue: 'does not contain'},
    {value: 'greater_than', displayValue: 'is greater than'},
    {value: 'less_than', displayValue: 'is less than'},
    {value: 'starts_with', displayValue: 'starts with'},
    {value: 'ends_with', displayValue: 'ends with'},
    {value: 'is_between', displayValue: 'is between'},
  ];
  const operatorSelectOptions: DropdownOption[] = [
    {value: 'and', displayValue: 'AND'},
    {value: 'or', displayValue: 'OR'},
  ];
  
  // Refs
  const presetSelectRef = useRef<SelectHandle>(null);
  
  // Use local state for editing, then apply on button click
  const [filterRows, setFilterRows] = useState<FilterRow[]>(() => {
    if (filterConditions && filterConditions.length > 0) {
      return filterConditions;
    }
    return [{ id: 1, column: null, condition: null, value: '', operator: null }];
  });


  // HANDLERS
  const isRowValid = (row: FilterRow) => {
    return row.column !== null && 
           row.condition !== null && 
           row.value.trim() !== '' && 
           row.operator !== null;
  };

  const handleClearFilters = () => {
    setFilterRows([{ id: Date.now(), column: null, condition: null, value: '', operator: null }]);
    if (presetSelectRef.current) {
      presetSelectRef.current.clear();
    }
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
      const updatedRows = rows.map(row => {
        if (row.id !== id) return row;
        
        // When column changes, reset condition, value, and operator
        if (field === 'column' && value !== null) {
          return {
            ...row,
            column: value,
            condition: null,
            value: '',
            operator: null
          };
        }
        
        // When condition changes, reset value and operator
        if (field === 'condition' && value !== null) {
          return {
            ...row,
            condition: value,
            value: '',
            operator: null
          };
        }
        
        // When value is cleared, reset operator
        if (field === 'value' && (!value || value.trim() === '')) {
          return {
            ...row,
            value: value || '',
            operator: null
          };
        }
        
        return { ...row, [field]: value };
      });
      
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

  const handleApplyFilters = () => {
    // Filter out invalid rows (rows that don't have all required fields)
    const validRows = filterRows.filter(row => 
      row.column !== null && row.condition !== null && row.value.trim() !== ''
    );
    
    // Validate each row's value against column type
    const allValid = validRows.every(row => 
      validateFilterValue(row.column, row.condition, row.value)
    );
    
    if (!allValid) {
      console.warn('Some filter values are invalid. Please check the warnings above.');
      return; // Don't apply filters if validation fails
    }
    
    setFilterConditions(validRows);
    closeModal();
  };

  const handlePresetChange = (presetName: string | null) => {
    if (!presetName || !filterPresets) return;
    
    const preset = filterPresets.find(p => p.name === presetName);
    if (!preset) return;
    
    // Convert preset filters to FilterRows with unique IDs
    const newRows: FilterRow[] = preset.filters.map((filter, index) => ({
      ...filter,
      id: Date.now() + index,
    }));
    
    // Add an empty row at the end for adding more filters
    newRows.push({
      id: Date.now() + preset.filters.length,
      column: null,
      condition: null,
      value: '',
      operator: null
    });
    
    setFilterRows(newRows);
  };

  // Create preset options for Select
  const presetOptions: DropdownOption[] = filterPresets
    ? filterPresets.map(preset => ({
        value: preset.name,
        displayValue: preset.name
      }))
    : [];

  const presetHeaderTitle = filterPresets && filterPresets.length > 0 
    ? 'Filter Presets' 
    : 'No presets available';


  // RENDER
  return (
    <div className="w-full h-full" role="form" aria-label="Table filters">
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
        <Select 
          ref={presetSelectRef}
          width="160px" 
          className="m-1 mt-0 ml-0" 
          title="Filter Presets"
          headerTitle={presetHeaderTitle}
          options={presetOptions}
          onChange={handlePresetChange}
          disabled={!filterPresets || filterPresets.length === 0}
        />
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
                width="200px" 
                className="" 
                preselectedOption={row.column || undefined}
                onChange={(value) => updateRow(row.id, 'column', value)}
                openY="up"
              />
              <Select 
                options={getConditionsForColumn(row.column)} 
                title="Condition" 
                width="200px" 
                className="" 
                preselectedOption={row.condition || undefined}
                onChange={(value) => updateRow(row.id, 'condition', value)}
                openY="up"
                disabled={!row.column}
              />
              <Input 
                width="200px" 
                className="border border-gray-300" 
                placeholder={getPlaceholderForCondition(row.column, row.condition)} 
                value={row.value}
                onChange={(e) => updateRow(row.id, 'value', e.target.value)}
                disabled={!row.column || !row.condition}
              />
              {row.value.trim() !== '' && (
                <Select 
                  options={operatorSelectOptions} 
                  title="Operator" 
                  width="200px" 
                  className="" 
                  preselectedOption={row.operator || undefined}
                  onChange={(value) => updateRow(row.id, 'operator', value)}
                  openY="up"
                />
              )}
              <CloseButton className="min-w-[40px] h-[40px]" title="Remove condition" onClick={() => removeRow(row.id)} />
            </div>
            {row.operator && index < filterRows.length - 1 && (
              <div className="mb-4 flex">
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
        <Button onClick={handleApplyFilters}>Apply Filters</Button>
      </section>
    </div>
  )
}