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
        <button onClick={handleSetOptions}>Set Options 1 & 3</button>
        <button onClick={handleClear}>Clear All</button>
        <button onClick={handleOpen}>Open Dropdown</button>
        <button onClick={handleClose}>Close Dropdown</button>
      </>
    );
  }
`;

export const popoverCode = `
  import Popover from "../components/dropdowns/Popover";

  <Popover
    trigger={<Button>Click Me</Button>}
    className="mb-8"
  >
    <div className="p-4">
      <h3 className="font-bold mb-2">Popover Content</h3>
      <p>This is the content inside the popover.</p>
      <p>You can put anything here!</p>
    </div>
  </Popover>
`;

export const popoverWithRefCode = `
  import Popover from "../components/dropdowns/Popover";
  import type { PopoverHandle } from "../components/dropdowns/Popover";
  import { useRef } from "react";

  export default function MyComponent() {
    const popoverRef = useRef<PopoverHandle>(null);

    return (
      <>
        <Popover
          ref={popoverRef}
          trigger={<IconButton icon={<BiDotsVerticalRounded />} title="More options" />}
        >
          <div className="p-4 min-w-[200px]">
            <h3 className="font-bold mb-2">Options Menu</h3>
            <button className="block w-full text-left px-2 py-1 hover:bg-gray-100 rounded">Edit</button>
            <button className="block w-full text-left px-2 py-1 hover:bg-gray-100 rounded">Delete</button>
            <button className="block w-full text-left px-2 py-1 hover:bg-gray-100 rounded">Share</button>
          </div>
        </Popover>
        
        <Button onClick={() => popoverRef.current?.open()}>Open Popover</Button>
        <Button onClick={() => popoverRef.current?.close()} variant="red">Close Popover</Button>
        <Button onClick={() => popoverRef.current?.toggle()} variant="outline">Toggle Popover</Button>
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
      { render: <button className="flex justify-between items-center w-full bg-gray-100 text-left px-4 py-2 text-black">Edit <CiViewColumn className="" /></button> },
      { render: <button className="flex gap-2 items-center w-full bg-gray-200 text-left px-4 py-2 text-black">Delete <a className="font-thin text-gray-100" href="#">link</a></button> },
      { render: <button className="w-full bg-gray-300 text-left px-4 py-2 text-black">
        Customizable content
        {' '}
        ===
        {' '}
        <span className="rounded-full w-4 h-4 bg-gray-300 p-2 text-xs">OK</span>
      </button> }
    ]}
    closeOnSelect={true}
    className="mb-8"
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

export const dropdownWithManyOptionsCode = `
  import Dropdown from "../components/dropdowns/Dropdown";
  import Button from "../components/buttons/Button";

  <Dropdown
    trigger={<Button variant="outline">Select Letter</Button>} 
    options={[
      { render: <span>Option A</span>, value: 'optA' },
      { render: <span>Option B</span>, value: 'optB' },
      { render: <span>Option C</span>, value: 'optC' },
      { render: <span>Option D</span>, value: 'optD' },
      { render: <span>Option E</span>, value: 'optE' },
      { render: <span>Option F</span>, value: 'optF' },
      { render: <span>Option G</span>, value: 'optG' },
      { render: <span>Option H</span>, value: 'optH' },
      { render: <span>Option I</span>, value: 'optI' },
      { render: <span>Option J</span>, value: 'optJ' },
      { render: <span>Option K</span>, value: 'optK' },
      { render: <span>Option L</span>, value: 'optL' },
      { render: <span>Option M</span>, value: 'optM' },
      { render: <span>Option N</span>, value: 'optN' },
      { render: <span>Option O</span>, value: 'optO' },
      { render: <span>Option P</span>, value: 'optP' },
      { render: <span>Option Q</span>, value: 'optQ' },
      { render: <span>Option R</span>, value: 'optR' },
      { render: <span>Option S</span>, value: 'optS' },
      { render: <span>Option T</span>, value: 'optT' },
      { render: <span>Option U</span>, value: 'optU' },
      { render: <span>Option V</span>, value: 'optV' },
      { render: <span>Option W</span>, value: 'optW' },
      { render: <span>Option X</span>, value: 'optX' },
      { render: <span>Option Y</span>, value: 'optY' },
      { render: <span>Option Z</span>, value: 'optZ' },
    ]}
    onChange={(v: string | null) => console.log(v)}
  />
`;

export const dropdownWithCustomStyledOptionsCode = `
  import Dropdown from "../components/dropdowns/Dropdown";
  import Button from "../components/buttons/Button";

  <Dropdown
    trigger={<Button variant="dark">Open Dropdown</Button>} 
    options={[
      { render: <span className="p-6 bg-slate-500 text-white">Option 1</span>, value: 'opt1' },
      { render: <span className="p-4 ml-8 bg-slate-600 text-white">Option 2</span>, value: 'opt2' },
      { render: <span className="p-2 ml-16 bg-slate-700 text-white">Option 3</span>, value: 'opt3' }
    ]}
    openY="up"
    openX="left"
    onChange={(value: string | null) => console.log('Selected value:', value)}
    optionsClassName="bg-slate-400"
    closeOnSelect={false}
  />
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

export const nativeSelectCode = `
  import NativeSelect from "../components/dropdowns/NativeSelect";

  <NativeSelect className="mb-8">
    <option value="">Select an option...</option>
    <option value="option1">Option 1</option>
    <option value="option2">Option 2</option>
    <option value="option3">Option 3</option>
  </NativeSelect>
`;

export const nativeSelectWithRefCode = `
  import NativeSelect from "../components/dropdowns/NativeSelect";
  import { useRef } from "react";

  export default function MyComponent() {
    const selectRef = useRef<HTMLSelectElement>(null);

    const handleGetValue = () => {
      console.log(selectRef.current?.value);
    };

    return (
      <>
        <NativeSelect 
          ref={selectRef}
          name="mySelect"
          onChange={(e) => console.log(e.target.value)}
          disabled={false}
          required
        >
          <option value="">Choose...</option>
          <option value="red">Red</option>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
        </NativeSelect>

        <button onClick={handleGetValue}>Get Value</button>
      </>
    );
  }
`;