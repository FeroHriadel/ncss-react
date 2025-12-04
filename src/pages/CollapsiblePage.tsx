import Card from "../components/cards/Card";
import Break from "../components/spacers/Break";
import Container from "../components/wrappers/Container";
import Collapsible from "../components/collapsible/Collapsible";
import Button from "../components/buttons/Button";
import { Highlight, themes } from "prism-react-renderer";
import { 
  collapsibleBasicCode, 
  collapsibleDefaultOpenCode, 
  collapsibleCustomTriggerCode,
  collapsibleNestedCode,
  collapsibleStyledCode,
  collapsibleOnToggleCode
} from "../utils/CollapsiblePageCode";
import { FaChevronDown } from "react-icons/fa";
import { useState } from "react";



export default function CollapsiblePage() {
  const [status, setStatus] = useState("Closed");

  function handleToggle(isOpen: boolean) {
    setStatus(isOpen ? "Open" : "Closed");
  }

  return (
    <Container className="px-4 pt-24">
      {/* INTRO */}
      <h1 className="mb-4 uppercase font-bold text-3xl">Collapsible</h1>
      <p className="text-lg mb-12">
        The <code>Collapsible</code> component creates expandable/collapsible content sections with custom triggers.
      </p>
      <Card className="mb-12 p-4 bg-gray-100 flex flex-col gap-4">
        <a href="#basic"><div><code>Basic Collapsible</code> - Simple expandable section</div></a>
        <a href="#default-open"><div><code>Default Open</code> - Start in expanded state</div></a>
        <a href="#custom-trigger"><div><code>Custom Trigger</code> - Custom trigger elements with icons</div></a>
        <a href="#on-toggle"><div><code>onToggle Callback</code> - React to open/close events</div></a>
        <a href="#nested"><div><code>Nested Collapsibles</code> - Collapsibles inside collapsibles</div></a>
        <a href="#styled"><div><code>Custom Styling</code> - Styled collapsible content</div></a>
      </Card>
      <hr />
      <Break amount={3} />

      {/* BASIC COLLAPSIBLE */}
      <h2 className="mb-4 text-2xl uppercase font-semibold" id="basic">Basic Collapsible</h2>
      <p className="mb-4">
        The simplest form uses a button or text as the trigger element:
      </p>

      <Collapsible trigger={<Button>Click to Expand</Button>}>
        <Card className="mt-2 p-4 bg-gray-50">
          <p>
            This is the collapsible content. It can contain any React elements.
          </p>
        </Card>
      </Collapsible>
      <Break amount={2} />

      <Highlight theme={themes.vsDark} code={collapsibleBasicCode} language="tsx">
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className + " rounded-lg p-6 overflow-x-auto"} style={{ ...style, backgroundColor: 'var(--nc-black-700)' }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <Break amount={3} />

      {/* DEFAULT OPEN */}
      <h2 className="mb-4 text-2xl uppercase font-semibold" id="default-open">Default Open</h2>
      <p className="mb-4">
        Use the <code>defaultOpen</code> prop to start with the content expanded:
      </p>

      <Collapsible 
        trigger={<Button>Already Expanded</Button>}
        defaultOpen={true}
      >
        <Card className="mt-2 p-4 bg-gray-50">
          <p>
            This collapsible starts in the open state by default.
          </p>
        </Card>
      </Collapsible>
      <Break amount={2} />

      <Highlight theme={themes.vsDark} code={collapsibleDefaultOpenCode} language="tsx">
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className + " rounded-lg p-6 overflow-x-auto"} style={{ ...style, backgroundColor: 'var(--nc-black-700)' }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <Break amount={3} />

      {/* CUSTOM TRIGGER */}
      <h2 className="mb-4 text-2xl uppercase font-semibold" id="custom-trigger">Custom Trigger</h2>
      <p className="mb-4">
        The <code>trigger</code> prop accepts any React element. Here's an example with icons that change based on state:
      </p>

      <Collapsible 
        trigger={
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600">
            <span>View Details</span>
            <FaChevronDown />
          </div>
        }
      >
        <Card className="mt-2 p-4 bg-gray-50">
          <h3 className="font-semibold mb-2">Product Details</h3>
          <p className="mb-2">Price: $99.99</p>
          <p className="mb-2">Stock: Available</p>
          <p>Shipping: Free</p>
        </Card>
      </Collapsible>
      <Break amount={2} />

      <Highlight theme={themes.vsDark} code={collapsibleCustomTriggerCode} language="tsx">
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className + " rounded-lg p-6 overflow-x-auto"} style={{ ...style, backgroundColor: 'var(--nc-black-700)' }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <Break amount={3} />

      {/* ON TOGGLE CALLBACK */}
      <h2 className="mb-4 text-2xl uppercase font-semibold" id="on-toggle">onToggle Callback</h2>
      <p className="mb-4">
        Use the <code>onToggle</code> callback to react to open/close events. The callback receives a boolean indicating the new state:
      </p>

      <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded">
        <p className="font-semibold">Current Status: {status}</p>
      </div>

      <Collapsible 
        trigger={<Button>Toggle and Check Status</Button>}
        onToggle={handleToggle}
      >
        <Card className="mt-2 p-4 bg-gray-50">
          <p>
            Watch the status above change when you open or close this collapsible!
          </p>
        </Card>
      </Collapsible>
      <Break amount={2} />

      <Highlight theme={themes.vsDark} code={collapsibleOnToggleCode} language="tsx">
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className + " rounded-lg p-6 overflow-x-auto"} style={{ ...style, backgroundColor: 'var(--nc-black-700)' }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <Break amount={3} />

      {/* NESTED COLLAPSIBLES */}
      <h2 className="mb-4 text-2xl uppercase font-semibold" id="nested">Nested Collapsibles</h2>
      <p className="mb-4">
        Collapsibles can be nested to create hierarchical expandable sections:
      </p>

      <Collapsible trigger={<Button>Main Section</Button>}>
        <Card className="mt-2 p-4 bg-gray-50">
          <p className="mb-4">This is the main section content.</p>
          
          <Collapsible trigger={<Button size="sm">Subsection 1</Button>}>
            <Card className="mt-2 p-3 bg-white">
              <p className="text-sm">Content of subsection 1</p>
            </Card>
          </Collapsible>
          
          <Break amount={1} />
          
          <Collapsible trigger={<Button size="sm">Subsection 2</Button>}>
            <Card className="mt-2 p-3 bg-white">
              <p className="text-sm">Content of subsection 2</p>
            </Card>
          </Collapsible>
        </Card>
      </Collapsible>
      <Break amount={2} />

      <Highlight theme={themes.vsDark} code={collapsibleNestedCode} language="tsx">
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className + " rounded-lg p-6 overflow-x-auto"} style={{ ...style, backgroundColor: 'var(--nc-black-700)' }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <Break amount={3} />

      {/* CUSTOM STYLING */}
      <h2 className="mb-4 text-2xl uppercase font-semibold" id="styled">Custom Styling</h2>
      <p className="mb-4">
        Use <code>className</code> and <code>style</code> props to customize the collapsible body:
      </p>

      <Collapsible 
        trigger={<Button variant="outline">Custom Styled Section</Button>}
        className="custom-collapsible"
        style={{ 
          backgroundColor: '#dbeafe', 
          border: '2px solid #3b82f6',
          borderRadius: '0.5rem',
          padding: '1rem',
          marginTop: '0.5rem'
        }}
      >
        <h3 className="font-semibold mb-2">Custom Styled Content</h3>
        <p>
          This collapsible body has custom background, border, and padding styles applied.
        </p>
      </Collapsible>
      <Break amount={2} />

      <Highlight theme={themes.vsDark} code={collapsibleStyledCode} language="tsx">
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className + " rounded-lg p-6 overflow-x-auto"} style={{ ...style, backgroundColor: 'var(--nc-black-700)' }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <Break amount={3} />

      {/* PROPS TABLE */}
      <Card className="bg-gray-100 border border-gray-200 rounded p-4 mb-12">
        <h3 className="text-lg font-semibold mb-2">Collapsible Props</h3>
        <ul className="space-y-2">
          <li><code>children</code> (required): Content to display when expanded</li>
          <li><code>trigger</code> (required): Element that toggles the collapsible (clicked to open/close)</li>
          <li><code>defaultOpen</code> (optional, default: false): Whether to start in expanded state</li>
          <li><code>onToggle</code> (optional): Callback function called when toggled, receives boolean (isOpen)</li>
          <li><code>className</code> (optional): Additional CSS classes for the collapsible body</li>
          <li><code>style</code> (optional): Inline styles for the collapsible body</li>
          <li><code>id</code> (optional): HTML id attribute for the collapsible body</li>
        </ul>
      </Card>

      <Card className="bg-blue-50 border border-blue-200 rounded p-4 mb-12">
        <h3 className="text-lg font-semibold mb-2">Usage Notes</h3>
        <ul className="space-y-2 text-sm">
          <li>• The trigger element is automatically made clickable</li>
          <li>• Content is conditionally rendered (removed from DOM when collapsed)</li>
          <li>• State is managed internally - the component is uncontrolled</li>
          <li>• Perfect for FAQs, accordion menus, or hiding less important content</li>
          <li>• Can be used with any trigger element (buttons, divs, text, icons, etc.)</li>
        </ul>
      </Card>

      <Break amount={3} />
    </Container>
  );
}
