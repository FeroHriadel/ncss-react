import Container from "../components/wrappers/Container";
import Select from "../components/dropdowns/Select";
import type { SelectHandle } from "../components/dropdowns/Select";
import Break from "../components/spacers/Break";
import { Highlight, themes } from "prism-react-renderer";
import { selectCode, selectWithTriggerCode, selectWithRefCode } from "../utils/DropdownsPageCode";
import { useRef } from "react";



export default function DropdownsPage() {
  const selectRef = useRef<SelectHandle>(null);

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

      {/* Working Example */}
      <div className="mb-4 p-4 border border-gray-300 rounded bg-gray-50">
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
          <button 
            onClick={() => {
              const selected = selectRef.current?.getSelectedOption();
              alert(`Selected: ${selected || 'None'}`);
            }}
            className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 text-sm"
          >
            Get Selected
          </button>
          
          <button 
            onClick={() => selectRef.current?.setSelectedOption('option2')}
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
          >
            Set to Option 2
          </button>
          
          <button 
            onClick={() => selectRef.current?.clear()}
            className="px-3 py-1 bg-orange-600 text-white rounded hover:bg-orange-700 text-sm"
          >
            Clear Selection
          </button>
          
          <button 
            onClick={() => selectRef.current?.open()}
            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
          >
            Open Dropdown
          </button>
          
          <button 
            onClick={() => selectRef.current?.close()}
            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
          >
            Close Dropdown
          </button>
        </div>
      </div>

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




    </Container>
  );
}