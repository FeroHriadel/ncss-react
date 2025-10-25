import Button from "../../buttons/Button";
import Select from "../../dropdowns/Select";



export default function VirtualizedTableFilter() {
  return (
    <div className="w-full h-full">

      {/* Filter Presets */}
      <section className="flex">
        <Button width="200px" className="m-1 mt-0">Add Condition</Button>
        <Select width="200px" title="Choose a preset" options={[{ value: 'preset1', displayValue: 'Preset 1' }, { value: 'preset2', displayValue: 'Preset 2' }]} />
      </section>

      {/* Filters */}
      <section>
        <div className="w-full flex items-center mb-4">
          

        </div>
      </section>
    </div>
  )
}