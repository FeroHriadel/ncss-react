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

export const dropdownCode = `
  import Dropdown from "../components/dropdowns/Dropdown";
  import Button from "../components/buttons/Button";
  import { CiViewColumn } from "react-icons/ci";

  <Dropdown
    trigger={<Button variant="outline">Open Menu</Button>}
    options={[
      { render: <button className="flex justify-between items-center w-full bg-gray-200 text-left px-4 py-2">Edit <CiViewColumn className="" /></button> },
      { render: <button className="flex gap-2 items-center w-full bg-gray-300 text-left px-4 py-2">Delete <a className="font-thin text-gray-500" href="#">link</a></button> },
      { render: <button className="w-full bg-gray-400 text-left px-4 py-2">
        <span className="rounded-full w-4 h-4 bg-gray-100 p-1 text-xs">OK</span>
      </button> }
    ]}
    closeOnSelect={true}
  />
`;

export const dropdownWithChildrenCode = `
  import Dropdown from "../components/dropdowns/Dropdown";
  import IconButton from "../components/buttons/IconButton";
  import { BiDotsVerticalRounded } from "react-icons/bi";

  <Dropdown
    options={[
      { render: <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Profile</button> },
      { render: <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Settings</button> },
      { render: <hr className="my-1" /> },
      { render: <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600">Logout</button> }
    ]}
    closeOnSelect={true}
  >
    <IconButton icon={<BiDotsVerticalRounded />} title="More options" />
  </Dropdown>
`;

export const dropdownWithRefCode = `
  import Dropdown from "../components/dropdowns/Dropdown";
  import type { DropdownHandle } from "../components/dropdowns/Dropdown";
  import Button from "../components/buttons/Button";
  import { useRef } from "react";

  export default function MyComponent() {
    const dropdownRef = useRef<DropdownHandle>(null);

    const handleOpen = () => {
      dropdownRef.current?.open();
    };

    const handleClose = () => {
      dropdownRef.current?.close();
    };

    const handleToggle = () => {
      dropdownRef.current?.toggle();
    };

    const handleCheckStatus = () => {
      const open = dropdownRef.current?.isOpen();
      alert(\`Dropdown is \${open ? 'open' : 'closed'}\`);
    };

    return (
      <>
        <Dropdown
          ref={dropdownRef}
          trigger={<Button variant="outline">Open Menu</Button>}
          options={[
            { render: <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Edit</button> },
            { render: <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Delete</button> },
            { render: <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Share</button> }
          ]}
          closeOnSelect={true}
        />
        
        <button onClick={handleOpen}>Open Dropdown</button>
        <button onClick={handleClose}>Close Dropdown</button>
        <button onClick={handleToggle}>Toggle Dropdown</button>
        <button onClick={handleCheckStatus}>Check Status</button>
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