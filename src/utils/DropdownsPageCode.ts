export const selectCode = `
  import Select from "../components/dropdowns/Select";

  <Select
    title="Select an Option"
    headerTitle="Please choose one:"
    options={[
      { value: 'option1', displayValue: 'Option 1' },
      { value: 'option2', displayValue: 'Option 2' },
      { value: 'option3', displayValue: 'Option 3' }
    ]}
    className="mb-8"
    style={{}}
    onChange={(selectedOption) => console.log(selectedOption)}
    openX="right"
    openY="down"
    width="250px"
    disabled={false}
    // preselectedOption="option2"
    // trigger={<button>Custom Trigger</button>}
  />
`;

export const selectWithTriggerCode = `
  <Select
    title="Select an Option"
    headerTitle="Please choose one:"
    options={[
      { value: 'option1', displayValue: 'Option 1' },
      { value: 'option2', displayValue: 'Option 2' },
      { value: 'option3', displayValue: 'Option 3' }
    ]}
    className="mb-8"
    style={{}}
    onChange={(selectedOption) => console.log(selectedOption)}
    disabled={false}
    trigger={<button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Custom Trigger</button>}
  />
`;

export const selectWithRefCode = `
  import Select from "../components/dropdowns/Select";
  import type { SelectHandle } from "../components/dropdowns/Select";
  import { useRef } from "react";

  export default function MyComponent() {
    const selectRef = useRef<SelectHandle>(null);

    const handleGetSelected = () => {
      const selected = selectRef.current?.getSelectedOption();
      alert(\`Selected: \${selected}\`);
    };

    const handleSetOption = () => {
      selectRef.current?.setSelectedOption('option2');
    };

    const handleClear = () => {
      selectRef.current?.clear();
    };

    const handleOpen = () => {
      selectRef.current?.open();
    };

    const handleClose = () => {
      selectRef.current?.close();
    };

    return (
      <>
        <Select
          ref={selectRef}
          title="Select an Option"
          options={[
            { value: 'option1', displayValue: 'Option 1' },
            { value: 'option2', displayValue: 'Option 2' },
            { value: 'option3', displayValue: 'Option 3' }
          ]}
          onChange={(selectedOption) => console.log(selectedOption)}
        />
        
        <button onClick={handleGetSelected}>Get Selected</button>
        <button onClick={handleSetOption}>Set to Option 2</button>
        <button onClick={handleClear}>Clear Selection</button>
        <button onClick={handleOpen}>Open Dropdown</button>
        <button onClick={handleClose}>Close Dropdown</button>
      </>
    );
  }
`;

export const multiSelectCode = `
  import MultiSelect from "../components/dropdowns/MultiSelect";

  <MultiSelect
    title="Select Options"
    headerTitle="Choose multiple:"
    options={[
      { value: 'option1', displayValue: 'Option 1' },
      { value: 'option2', displayValue: 'Option 2' },
      { value: 'option3', displayValue: 'Option 3' },
      { value: 'option4', displayValue: 'Option 4' }
    ]}
    onChange={(selectedOptions) => console.log(selectedOptions)}
    openX="right"
    openY="down"
    className="mb-8"
    style={{ width: '220px' }}
    // preselectedOptions={['option1', 'option2']}
    // trigger={<IconButton icon={<CiViewColumn />} title="Select options" />}
  />
`;

export const multiSelectWithTriggerCode = `
  import MultiSelect from "../components/dropdowns/MultiSelect";
  import IconButton from "../components/buttons/IconButton";
  import { CiViewColumn } from "react-icons/ci";

  <MultiSelect
    title="Select Options"
    headerTitle="Choose multiple:"
    options={[
      { value: 'option1', displayValue: 'Option 1' },
      { value: 'option2', displayValue: 'Option 2' },
      { value: 'option3', displayValue: 'Option 3' },
      { value: 'option4', displayValue: 'Option 4' }
    ]}
    trigger={<IconButton icon={<CiViewColumn />} title="Select options" />}
    onChange={(selectedOptions) => console.log(selectedOptions)}
    openX="right"
    openY="down"
  />
`;

export const multiSelectWithRefCode = `
  import MultiSelect from "../components/dropdowns/MultiSelect";
  import type { MultiSelectHandle } from "../components/dropdowns/MultiSelect";
  import IconButton from "../components/buttons/IconButton";
  import { CiViewColumn } from "react-icons/ci";
  import { useRef } from "react";

  export default function MyComponent() {
    const multiSelectRef = useRef<MultiSelectHandle>(null);

    const handleGetSelected = () => {
      const selected = multiSelectRef.current?.getSelectedOptions();
      alert(\`Selected: \${selected?.join(', ') || 'None'}\`);
    };

    const handleSetOptions = () => {
      multiSelectRef.current?.setSelectedOptions(['option1', 'option3']);
    };

    const handleClear = () => {
      multiSelectRef.current?.clear();
    };

    const handleOpen = () => {
      multiSelectRef.current?.open();
    };

    const handleClose = () => {
      multiSelectRef.current?.close();
    };

    return (
      <>
        <MultiSelect
          ref={multiSelectRef}
          title="Select Options"
          options={[
            { value: 'option1', displayValue: 'Option 1' },
            { value: 'option2', displayValue: 'Option 2' },
            { value: 'option3', displayValue: 'Option 3' },
            { value: 'option4', displayValue: 'Option 4' }
          ]}
          trigger={<IconButton icon={<CiViewColumn />} title="Select options" />}
          onChange={(selectedOptions) => console.log(selectedOptions)}
        />
        
        <button onClick={handleGetSelected}>Get Selected</button>
        <button onClick={handleSetOptions}>Set Options 1 & 3</button>
        <button onClick={handleClear}>Clear All</button>
        <button onClick={handleOpen}>Open Dropdown</button>
        <button onClick={handleClose}>Close Dropdown</button>
      </>
    );
  }
`;