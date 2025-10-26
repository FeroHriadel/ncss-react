import Button from "../../buttons/Button";
import type { DropdownOption } from "../../dropdowns/MultiSelect";
import Select from "../../dropdowns/Select";
import Input from "../../inputs/Input";



export default function VirtualizedTableFilter() {
  const columnsSelectOptions: DropdownOption[]= [];
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

  return (
    <div className="w-full h-full">
      <h2 className="text-2xl font-bold mb-6">DATA FILTER</h2>
      <h3 className="text-lg font-semibold">Filter Options</h3>
      <p className="text-sm text-gray-700 mb-4">Add filter conditions to refine your data.</p>

      {/* Filter Presets */}
      <section className="flex flex-wrap mb-12">
        <Button width="160px" className="m-1 mt-0 ml-0">Add Condition</Button>
        <Button width="160px" className="m-1 mt-0 ml-0">Clear Filters</Button>
        <Select width="160px" title="Filter Presets" options={[{ value: 'preset1', displayValue: 'Preset 1' }, { value: 'preset2', displayValue: 'Preset 2' }]} />
      </section>

      <h3 className="text-lg font-semibold">Filters to Apply</h3>
      <p className="text-sm text-gray-700 mb-4">Review and adjust your active filters. Click 'Apply Filters' to save changes.</p>
      {/* Filters */}
      <section>
        <div className="w-full flex gap-1 items-center flex-wrap mb-16">
          <Select options={columnsSelectOptions} title="Column" width="160px" className="" />
          <Select options={conditionSelectOptions} title="Condition" width="160px" className="" />
          <Input width="160px" className="border border-gray-300" placeholder="Condition value" />
          <Select options={operatorSelectOptions} title="Operator" width="160px" className="" />
        </div>
      </section>

      <section className="w-full flex gap-1 justify-end">
        <Button variant="red">Cancel</Button>
        <Button>Apply Filters</Button>
      </section>
    </div>
  )
}