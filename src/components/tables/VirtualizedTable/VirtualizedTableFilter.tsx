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

      {/* Filter Presets */}
      <section className="flex flex-wrap mb-12">
        <Button width="200px" className="m-1 mt-0 ml-0">Add Condition</Button>
        <Select width="200px" title="Choose a preset" options={[{ value: 'preset1', displayValue: 'Preset 1' }, { value: 'preset2', displayValue: 'Preset 2' }]} />
      </section>

      {/* Filters */}
      <section>
        <h3>Selected Filters</h3>
        <div className="w-full flex items-center flex-wrap mb-12">
          <Select options={columnsSelectOptions} title="Select a column" width="200px" className="m-1 mt-0 ml-0" />
          <Select options={conditionSelectOptions} title="Select a condition" width="200px" className="m-1 mt-0 ml-0" />
          <Input width="200px" className="m-1 mt-0 ml-0 border border-black border-solid" placeholder="Enter condition value" />
          <Select options={operatorSelectOptions} title="Select an operator" width="200px" className="m-1 mt-0 ml-0" />
        </div>
      </section>

      <section className="w-full flex justify-end">
        <Button className="m-1">Cancel</Button>
        <Button className="m-1">Apply Filters</Button>
      </section>
    </div>
  )
}