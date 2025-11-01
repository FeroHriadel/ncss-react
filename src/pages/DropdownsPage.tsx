import Container from "../components/wrappers/Container";
import Select from "../components/dropdowns/Select";
import type { SelectHandle } from "../components/dropdowns/Select";
import MultiSelect from "../components/dropdowns/MultiSelect";
import type { MultiSelectHandle } from "../components/dropdowns/MultiSelect";
import Break from "../components/spacers/Break";
import { Highlight, themes } from "prism-react-renderer";
import { selectCode, selectWithTriggerCode, selectWithRefCode, multiSelectCode, multiSelectWithTriggerCode, multiSelectWithRefCode } from "../utils/DropdownsPageCode";
import { useRef } from "react";
import Card from "../components/cards/Card";
import Button from "../components/buttons/Button";
import IconButton from "../components/buttons/IconButton";
import { CiViewColumn } from "react-icons/ci";



export default function DropdownsPage() {
  const selectRef = useRef<SelectHandle>(null);
  const multiSelectRef = useRef<MultiSelectHandle>(null);

  return (
    <Container className="px-2 pt-24">
      {/* INTRO */}
      <h1 className="mb-4 uppercase font-bold text-3xl">Dropdowns</h1>
      <p className="text-gray-800 text-lg mb-12">Dropdown components: <code>Select</code>, <code>Multiselect</code>, and <code>Dropdown</code>.</p>


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
        trigger={<IconButton icon={<CiViewColumn />} title="Select options" />}
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
          trigger={<IconButton icon={<CiViewColumn />} title="Select options" />}
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




    </Container>
  );
}