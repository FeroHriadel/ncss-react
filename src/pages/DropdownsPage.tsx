import Container from "../components/wrappers/Container";
import Select from "../components/dropdowns/Select";
import type { SelectHandle } from "../components/dropdowns/Select";
import MultiSelect from "../components/dropdowns/MultiSelect";
import type { MultiSelectHandle } from "../components/dropdowns/MultiSelect";
import Dropdown from "../components/dropdowns/Dropdown";
import type { DropdownHandle } from "../components/dropdowns/Dropdown";
import Break from "../components/spacers/Break";
import { Highlight, themes } from "prism-react-renderer";
import { selectCode, selectWithTriggerCode, selectWithRefCode, multiSelectCode, multiSelectWithTriggerCode, multiSelectWithRefCode, dropdownCode, dropdownWithChildrenCode, dropdownWithRefCode } from "../utils/DropdownsPageCode";
import { useRef } from "react";
import Card from "../components/cards/Card";
import Button from "../components/buttons/Button";
import IconButton from "../components/buttons/IconButton";
import { CiViewColumn } from "react-icons/ci";
import { BiDotsVerticalRounded } from "react-icons/bi";



export default function DropdownsPage() {
  const selectRef = useRef<SelectHandle>(null);
  const multiSelectRef = useRef<MultiSelectHandle>(null);
  const dropdownRef = useRef<DropdownHandle>(null);

  return (
    <Container className="px-2 pt-24">
      {/* INTRO */}
      <h1 className="mb-4 uppercase font-bold text-3xl">Dropdowns</h1>
      <p className="text-gray-800 text-lg mb-12">Dropdown components: <code>Select</code>, <code>Multiselect</code>, and <code>Dropdown</code>.</p>
      <Card className="mb-12 p-4 bg-gray-50 flex flex-col gap-4">
        <div><code>Select</code> is a more customizable html select element <br /></div>
        <div><code>MultiSelect</code> is like <code>Select</code> but allows multiple selections <br /></div>
        <div><code>Dropdown</code> is a a highly-adjustable dropdown container for custom content.</div>
      </Card>


      {/* SELECT - BASIC USE */}
      <h2 className="mb-4 text-2xl uppercase font-semibold">Select</h2>
      <p className="text-gray-700 mb-4">The <code>Select</code> component mimics the HTML <code>select</code> element but offers more customization options. Basic use would look like this (only the options prop is required) :</p>

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
        width="220px"
        disabled={false}
        // preselectedOption="option2"
        // trigger={<button>Custom Trigger</button>}
      />

      <Highlight
        theme={themes.vsLight}
        code={selectCode}
        language="tsx"
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className + " rounded-lg p-6 overflow-x-auto"} style={{ ...style, backgroundColor: '#e5e7eb' }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <Break amount={3} />

      {/* SELECT WITH TRIGGER */}
      <p className="text-gray-700 mb-4">You can change the trigger element for the <code>Select</code> component by using the <code>trigger</code> prop.</p>
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
      <Highlight
        theme={themes.vsLight}
        code={selectWithTriggerCode}
        language="tsx"
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className + " rounded-lg p-6 overflow-x-auto"} style={{ ...style, backgroundColor: '#e5e7eb' }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <Break amount={3} />

      {/* REF & IMPERATIVE HANDLING */}
      <h2 className="mb-4 text-2xl uppercase font-semibold">Using Ref (Imperative Handle)</h2>
      <p className="text-gray-700 mb-4">
        The <code>Select</code> component exposes methods through a ref that allow you to control it programmatically. 
        This is useful when you need to interact with the select component from outside, such as opening/closing it, 
        setting its value, or getting the current selection without relying on the <code>onChange</code> callback.
      </p>
      
      <p className="text-gray-700 mb-4">Available methods:</p>
      <ul className="text-gray-700 list-disc mb-8">
        <li className="ml-8 pb-1"><code>getSelectedOption()</code> - Returns the currently selected option value (or null if nothing is selected)</li>
        <li className="ml-8 pb-1"><code>setSelectedOption(value)</code> - Programmatically sets the selected option</li>
        <li className="ml-8 pb-1"><code>clear()</code> - Clears the selection</li>
        <li className="ml-8 pb-1"><code>open()</code> - Opens the dropdown menu</li>
        <li className="ml-8 pb-1"><code>close()</code> - Closes the dropdown menu</li>
      </ul>

      <Card className="mb-8 p-4 bg-gray-50">
        <Select
          ref={selectRef}
          title="Select an Option"
          options={[
            { value: 'option1', displayValue: 'Option 1' },
            { value: 'option2', displayValue: 'Option 2' },
            { value: 'option3', displayValue: 'Option 3' }
          ]}
          onChange={(selectedOption) => console.log('Selected:', selectedOption)}
          width="220px"
          className="mb-4"
        />
        
        <div className="flex gap-2 flex-wrap">
          <Button 
            onClick={() => {
              const selected = selectRef.current?.getSelectedOption();
              alert(`Selected: ${selected || 'None'}`);
            }}
            variant="dark"
            size="sm"
          >
            Get Selected
          </Button>
          
          <Button 
            onClick={() => selectRef.current?.setSelectedOption('option2')}
            variant="dark"
            size="sm"
          >
            Set to Option 2
          </Button>
          
          <Button 
            onClick={() => selectRef.current?.clear()}
            variant="dark"
            size="sm"
          >
            Clear Selection
          </Button>
          
          <Button 
            onClick={() => selectRef.current?.open()}
            variant="dark"
            size="sm"
          >
            Open Dropdown
          </Button>
          
          <Button 
            onClick={() => selectRef.current?.close()}
            variant="dark"
            size="sm"
          >
            Close Dropdown
          </Button>
        </div>
      </Card>

      <Highlight
        theme={themes.vsLight}
        code={selectWithRefCode}
        language="tsx"
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className + " rounded-lg p-6 overflow-x-auto"} style={{ ...style, backgroundColor: '#e5e7eb' }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <Break amount={3} />

      <Card className="bg-gray-50 border border-gray-200 rounded p-4 mb-12">
        <h3 className="text-lg font-semibold mb-2">Select Props</h3>
        <ul className="space-y-2">
          <li><code>options</code> (required): Array of objects with <code>value</code> and <code>displayValue</code> properties</li>
          <li><code>title</code> (optional, default: "Select Option"): Text shown in the trigger button when nothing is selected</li>
          <li><code>headerTitle</code> (optional): Custom text for the dropdown header (defaults to <code>title</code>)</li>
          <li><code>trigger</code> (optional): Custom React element to use as the dropdown trigger</li>
          <li><code>onChange</code> (optional): Callback function called when selection changes</li>
          <li><code>preselectedOption</code> (optional): Initial selected value</li>
          <li><code>disabled</code> (optional): Disables the select component</li>
          <li><code>openX</code> (optional): Direction to open horizontally ("left" | "right")</li>
          <li><code>openY</code> (optional): Direction to open vertically ("up" | "down")</li>
          <li><code>width</code> (optional): Width of the select component</li>
          <li><code>className</code> (optional): Additional CSS classes for the wrapper element</li>
          <li><code>style</code> (optional): Inline styles for the wrapper element</li>
          <li><code>optionsClassName</code> (optional): Additional CSS classes for the dropdown menu</li>
          <li><code>optionsStyle</code> (optional): Inline styles for the dropdown menu</li>
          <li><code>id</code> (optional): HTML id attribute</li>
        </ul>
      </Card>



      { /* MULTISELECT - BASIC USE */ }
      <h2 className="mb-4 text-2xl uppercase font-semibold">MultiSelect</h2>
      <p className="text-gray-700 mb-4">
        The <code>MultiSelect</code> component allows users to select multiple options from a dropdown list. 
        Like <code>Select</code>, it can render with a default button-style trigger or accept a custom trigger element. 
        The component returns an array of selected values.
      </p>

      <MultiSelect
        title="Select Options"
        headerTitle="Choose multiple:"
        options={[
          { value: 'option1', displayValue: 'Option 1' },
          { value: 'option2', displayValue: 'Option 2' },
          { value: 'option3', displayValue: 'Option 3' },
          { value: 'option4', displayValue: 'Option 4' }
        ]}
        onChange={(selectedOptions) => console.log('Selected:', selectedOptions)}
        openX="right"
        openY="down"
        className="mb-8"
        style={{ width: '220px' }}
      />

      <Highlight
        theme={themes.vsLight}
        code={multiSelectCode}
        language="tsx"
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className + " rounded-lg p-6 overflow-x-auto"} style={{ ...style, backgroundColor: '#e5e7eb' }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <Break amount={3} />

      {/* MULTISELECT WITH CUSTOM TRIGGER */}
      <p className="text-gray-700 mb-4">You can provide a custom trigger element using the <code>trigger</code> prop (typically an icon button):</p>
      
      <MultiSelect
        title="Select Options"
        headerTitle="Choose multiple:"
        options={[
          { value: 'option1', displayValue: 'Option 1' },
          { value: 'option2', displayValue: 'Option 2' },
          { value: 'option3', displayValue: 'Option 3' },
          { value: 'option4', displayValue: 'Option 4' }
        ]}
        trigger={<IconButton icon={<CiViewColumn size={24} />} title="Select options" />}
        onChange={(selectedOptions) => console.log('Selected:', selectedOptions)}
        openX="right"
        openY="down"
        className="mb-8"
      />

      <Highlight
        theme={themes.vsLight}
        code={multiSelectWithTriggerCode}
        language="tsx"
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className + " rounded-lg p-6 overflow-x-auto"} style={{ ...style, backgroundColor: '#e5e7eb' }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <Break amount={3} />

      {/* MULTISELECT IMPERATIVE HANDLE */}
      <h2 className="mb-4 text-2xl uppercase font-semibold">MultiSelect with Ref (Imperative Handle)</h2>
      <p className="text-gray-700 mb-4">
        Like <code>Select</code>, the <code>MultiSelect</code> component also exposes methods through a ref for programmatic control.
      </p>
      
      <p className="text-gray-700 mb-4">Available methods:</p>
      <ul className="text-gray-700 list-disc mb-8">
        <li className="ml-8 pb-1"><code>getSelectedOptions()</code> - Returns an array of currently selected option values</li>
        <li className="ml-8 pb-1"><code>setSelectedOptions(values[])</code> - Programmatically sets multiple selected options</li>
        <li className="ml-8 pb-1"><code>clear()</code> - Clears all selections</li>
        <li className="ml-8 pb-1"><code>open()</code> - Opens the dropdown menu</li>
        <li className="ml-8 pb-1"><code>close()</code> - Closes the dropdown menu</li>
      </ul>

      <Card className="mb-8 p-4 bg-gray-50">
        <MultiSelect
          ref={multiSelectRef}
          title="Select Options"
          options={[
            { value: 'option1', displayValue: 'Option 1' },
            { value: 'option2', displayValue: 'Option 2' },
            { value: 'option3', displayValue: 'Option 3' },
            { value: 'option4', displayValue: 'Option 4' }
          ]}
          trigger={<IconButton icon={<CiViewColumn size={24}/>} title="Select options" />}
          onChange={(selectedOptions) => console.log('Selected:', selectedOptions)}
          className="mb-4"
        />
        
        <div className="flex gap-2 flex-wrap">
          <Button 
            onClick={() => {
              const selected = multiSelectRef.current?.getSelectedOptions();
              alert(`Selected: ${selected?.join(', ') || 'None'}`);
            }}
            variant="dark"
            size="sm"
          >
            Get Selected
          </Button>
          
          <Button 
            onClick={() => multiSelectRef.current?.setSelectedOptions(['option1', 'option3'])}
            variant="dark"
            size="sm"
          >
            Set Options 1 & 3
          </Button>
          
          <Button 
            onClick={() => multiSelectRef.current?.clear()}
            variant="dark"
            size="sm"
          >
            Clear All
          </Button>
          
          <Button 
            onClick={() => multiSelectRef.current?.open()}
            variant="dark"
            size="sm"
          >
            Open Dropdown
          </Button>
          
          <Button 
            onClick={() => multiSelectRef.current?.close()}
            variant="dark"
            size="sm"
          >
            Close Dropdown
          </Button>
        </div>
      </Card>

      <Highlight
        theme={themes.vsLight}
        code={multiSelectWithRefCode}
        language="tsx"
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className + " rounded-lg p-6 overflow-x-auto"} style={{ ...style, backgroundColor: '#e5e7eb' }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <Break amount={3} />

      <Card className="bg-gray-50 border border-gray-200 rounded p-4 mb-12">
        <h3 className="text-lg font-semibold mb-2">MultiSelect Props</h3>
        <ul className="space-y-2">
          <li><code>options</code> (required): Array of objects with <code>value</code> and <code>displayValue</code> properties</li>
          <li><code>title</code> (optional, default: "Select Options"): Text shown in the trigger button when nothing is selected</li>
          <li><code>headerTitle</code> (optional): Custom text for the dropdown header (defaults to <code>title</code>)</li>
          <li><code>trigger</code> (optional): Custom React element to use as the dropdown trigger</li>
          <li><code>onChange</code> (optional): Callback function called when selection changes (receives array of selected values)</li>
          <li><code>preselectedOptions</code> (optional): Array of initially selected values</li>
          <li><code>disabled</code> (optional): Disables the multiselect component</li>
          <li><code>openX</code> (optional): Direction to open horizontally ("left" | "right")</li>
          <li><code>openY</code> (optional): Direction to open vertically ("up" | "down")</li>
          <li><code>className</code> (optional): Additional CSS classes for the wrapper element</li>
          <li><code>style</code> (optional): Inline styles for the wrapper element</li>
          <li><code>optionsClassName</code> (optional): Additional CSS classes for the dropdown menu</li>
          <li><code>optionsStyle</code> (optional): Inline styles for the dropdown menu</li>
          <li><code>id</code> (optional): HTML id attribute</li>
        </ul>
      </Card>
      <Break amount={3} />



      {/* DROPDOWN - BASIC USE */}
      <h2 className="mb-4 text-2xl uppercase font-semibold">Dropdown</h2>
      <p className="text-gray-700 mb-4">
        The <code>Dropdown</code> component is a more flexible alternative to <code>Select</code> and <code>MultiSelect</code>. 
        Unlike those components, <code>Dropdown</code> does not manage state internally - it simply renders custom content in a dropdown menu. 
        Each option's <code>render</code> prop can contain any React element, making it perfect for action menus, navigation menus, or custom UI elements.
        You can include icons, links, nested elements, or any other React components within each option.
      </p>

      <Dropdown
        trigger={<Button variant="outline">Open Menu</Button>}
        options={[
          { render: <button className="flex justify-between items-center w-full bg-gray-50 text-left px-4 py-2">Edit <CiViewColumn className="" /></button> },
          { render: <button className="flex gap-2 items-center w-full bg-gray-100 text-left px-4 py-2">Delete <a className="font-thin text-gray-100" href="#">link</a></button> },
          { render: <button className="w-full bg-gray-200 text-left px-4 py-2">
            <span className="rounded-full w-4 h-4 bg-gray-300 p-2 text-xs">OK</span>
            {' '}
            I agree
          </button> }
        ]}
        closeOnSelect={true}
        className="mb-8"
      />

      <Highlight
        theme={themes.vsLight}
        code={dropdownCode}
        language="tsx"
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className + " rounded-lg p-6 overflow-x-auto"} style={{ ...style, backgroundColor: '#e5e7eb' }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <Break amount={3} />

      {/* DROPDOWN WITH CHILDREN */}
      <p className="text-gray-700 mb-4">
        Instead of using the <code>trigger</code> prop, you can pass the trigger element as <code>children</code>. 
        This is useful when you want the trigger to be inline with your JSX:
      </p>

      <Dropdown
        options={[
          { render: <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Profile</button> },
          { render: <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Settings</button> },
          { render: <hr className="my-1" /> },
          { render: <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600">Logout</button> }
        ]}
        closeOnSelect={true}
        className="mb-8"
      >
        <IconButton icon={<BiDotsVerticalRounded size={24} />} title="More options" />
      </Dropdown>

      <Highlight
        theme={themes.vsLight}
        code={dropdownWithChildrenCode}
        language="tsx"
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className + " rounded-lg p-6 overflow-x-auto"} style={{ ...style, backgroundColor: '#e5e7eb' }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <Break amount={3} />

      {/* DROPDOWN IMPERATIVE HANDLE */}
      <h2 className="mb-4 text-2xl uppercase font-semibold">Dropdown with Ref (Imperative Handle)</h2>
      <p className="text-gray-700 mb-4">
        Like <code>Select</code> and <code>MultiSelect</code>, the <code>Dropdown</code> component exposes methods through a ref for programmatic control.
      </p>
      
      <Card className="mb-8 p-4">
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

        <div className="flex flex-wrap gap-2 mt-4">
          <Button 
            onClick={() => dropdownRef.current?.open()}
            variant="dark"
            size="sm"
          >
            Open Dropdown
          </Button>
          
          <Button 
            onClick={() => dropdownRef.current?.close()}
            variant="dark"
            size="sm"
          >
            Close Dropdown
          </Button>

          <Button 
            onClick={() => dropdownRef.current?.toggle()}
            variant="dark"
            size="sm"
          >
            Toggle Dropdown
          </Button>

          <Button 
            onClick={() => {
              const open = dropdownRef.current?.isOpen();
              alert(`Dropdown is ${open ? 'open' : 'closed'}`);
            }}
            variant="dark"
            size="sm"
          >
            Check Status
          </Button>
        </div>
      </Card>

      <Highlight
        theme={themes.vsLight}
        code={dropdownWithRefCode}
        language="tsx"
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className + " rounded-lg p-6 overflow-x-auto"} style={{ ...style, backgroundColor: '#e5e7eb' }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>

      <Card className="bg-gray-50 border border-gray-200 rounded p-4 mb-12 mt-8">
        <h3 className="text-lg font-semibold mb-2">Dropdown Props</h3>
        <ul className="space-y-2">
          <li><code>options</code> (required): Array of objects with <code>render</code> property (any React element)</li>
          <li><code>trigger</code> (optional): React element to use as the dropdown trigger</li>
          <li><code>children</code> (optional): Alternative to <code>trigger</code> prop (children takes precedence)</li>
          <li><code>closeOnSelect</code> (optional, default: true): Whether to close dropdown when an option is clicked</li>
          <li><code>disabled</code> (optional): Disables the dropdown</li>
          <li><code>className</code> (optional): Additional CSS classes for the wrapper element</li>
          <li><code>style</code> (optional): Inline styles for the wrapper element</li>
          <li><code>optionsClassName</code> (optional): Additional CSS classes for the dropdown menu</li>
          <li><code>optionsStyle</code> (optional): Inline styles for the dropdown menu</li>
          <li><code>id</code> (optional): HTML id attribute</li>
        </ul>
      </Card>




    </Container>
  );
}