export const collapsibleBasicCode = `import Collapsible from "../components/collapsible/Collapsible";
import Button from "../components/buttons/Button";

<Collapsible trigger={<Button>Click to Expand</Button>}>
  <div className="mt-2 p-4 bg-gray-50 rounded">
    <p className="text-gray-700">
      This is the collapsible content.
    </p>
  </div>
</Collapsible>`;

export const collapsibleDefaultOpenCode = `<Collapsible 
  trigger={<Button>Already Expanded</Button>}
  defaultOpen={true}
>
  <div className="mt-2 p-4 bg-gray-50 rounded">
    <p className="text-gray-700">
      This collapsible starts in the open state by default.
    </p>
  </div>
</Collapsible>`;

export const collapsibleCustomTriggerCode = `import { FaChevronDown } from "react-icons/fa";

<Collapsible 
  trigger={
    <div className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600">
      <span>View Details</span>
      <FaChevronDown />
    </div>
  }
>
  <div className="mt-2 p-4 bg-gray-50 rounded">
    <h3 className="font-semibold mb-2">Product Details</h3>
    <p className="text-gray-700">Price: $99.99</p>
  </div>
</Collapsible>`;

export const collapsibleNestedCode = `<Collapsible trigger={<Button>Main Section</Button>}>
  <div className="mt-2 p-4 bg-gray-50 rounded">
    <p className="text-gray-700 mb-4">This is the main section content.</p>
    
    <Collapsible trigger={<Button size="sm">Subsection 1</Button>}>
      <div className="mt-2 p-3 bg-white rounded">
        <p className="text-gray-700 text-sm">Content of subsection 1</p>
      </div>
    </Collapsible>
    
    <Collapsible trigger={<Button size="sm">Subsection 2</Button>}>
      <div className="mt-2 p-3 bg-white rounded">
        <p className="text-gray-700 text-sm">Content of subsection 2</p>
      </div>
    </Collapsible>
  </div>
</Collapsible>`;

export const collapsibleStyledCode = `<Collapsible 
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
  <h3 className="font-semibold text-blue-900 mb-2">Custom Styled Content</h3>
  <p className="text-blue-800">
    This collapsible body has custom background, border, and padding.
  </p>
</Collapsible>`;

export const collapsibleOnToggleCode = `import { useState } from "react";

function MyComponent() {
  const [status, setStatus] = useState("Closed");

  function handleToggle(isOpen: boolean) {
    setStatus(isOpen ? "Open" : "Closed");
    console.log("Collapsible is now:", isOpen ? "open" : "closed");
  }

  return (
    <div>
      <p>Status: {status}</p>
      <Collapsible 
        trigger={<Button>Toggle Me</Button>}
        onToggle={handleToggle}
      >
        <div className="mt-2 p-4 bg-gray-50 rounded">
          <p>Content here</p>
        </div>
      </Collapsible>
    </div>
  );
}`;
