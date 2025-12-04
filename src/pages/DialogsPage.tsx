import { useState } from "react";
import Card from "../components/cards/Card";
import Break from "../components/spacers/Break";
import Container from "../components/wrappers/Container";
import Modal from "../components/dialogs/Modal";
import Button from "../components/buttons/Button";
import { Highlight, themes } from "prism-react-renderer";
import { 
  modalBasicCode, 
  modalControlledCode, 
  modalTriggerCode, 
  modalCustomStyleCode,
} from "../utils/DialogsPageCode";



export default function DialogsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Container className="px-4 pt-24">
      {/* INTRO */}
      <h1 className="mb-4 uppercase font-bold text-3xl">Dialogs</h1>
      <p className="text-lg mb-12">
        Dialog components: <code>Modal</code>
      </p>
      <Card className="mb-12 p-4 bg-gray-100 flex flex-col gap-4">
        <a href="#basic"><div><code>Basic Modal</code> - Simple modal with trigger button</div></a>
        <a href="#controlled"><div><code>Controlled Modal</code> - Modal controlled by parent state</div></a>
        <a href="#trigger"><div><code>Modal with Custom Trigger</code> - Custom trigger element</div></a>
        <a href="#custom"><div><code>Custom Styling</code> - Modal with custom dimensions and styles</div></a>
        <a href="#form"><div><code>Modal with Form</code> - Interactive modal with form content</div></a>
      </Card>
      <hr />
      <Break amount={3} />

      {/* BASIC MODAL */}
      <h2 className="mb-4 text-2xl uppercase font-semibold" id="basic">Basic Modal</h2>
      <p className="mb-4">
        The <code>Modal</code> component displays content in an overlay dialog. When using the <code>trigger</code> prop,
        the modal manages its own open/close state internally.
      </p>

      <Modal trigger={<Button>Open Modal</Button>}>
        <h2 className="text-2xl font-bold mb-4">Modal Title</h2>
        <p className="mb-4">
          This is a basic modal with a trigger button. Click outside or press Esc to close.
        </p>
        <p>
          The modal automatically handles focus management and keyboard navigation.
        </p>
      </Modal>
      <Break amount={2} />

      <Highlight theme={themes.vsDark} code={modalBasicCode} language="tsx">
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

      {/* CONTROLLED MODAL */}
      <h2 className="mb-4 text-2xl uppercase font-semibold" id="controlled">Controlled Modal</h2>
      <p className="mb-4">
        For more control, use the <code>isOpen</code> and <code>onClose</code> props to manage the modal state from a parent component:
      </p>

      <Button onClick={() => setIsModalOpen(true)}>Open Controlled Modal</Button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-2xl font-bold mb-4">Controlled Modal</h2>
        <p className="mb-4">
          This modal's open/close state is controlled by the parent component.
        </p>
        <div className="flex gap-2">
          <Button onClick={() => setIsModalOpen(false)}>Close</Button>
          <Button variant="outline" onClick={() => alert('Action!')}>Action</Button>
        </div>
      </Modal>
      <Break amount={2} />

      <Highlight theme={themes.vsDark} code={modalControlledCode} language="tsx">
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

      {/* MODAL WITH CUSTOM TRIGGER */}
      <h2 className="mb-4 text-2xl uppercase font-semibold" id="trigger">Modal with Custom Trigger</h2>
      <p className="mb-4">
        The <code>trigger</code> prop can be any React element:
      </p>

      <Modal trigger={
        <span className="text-blue-600 underline cursor-pointer hover:text-blue-800">
          Click here to learn more
        </span>
      }>
        <h2 className="text-2xl font-bold mb-4">More Information</h2>
        <p className="mb-4">
          You can use any element as a trigger - buttons, links, images, etc.
        </p>
        <p>
          The modal will automatically handle the click event and open state.
        </p>
      </Modal>
      <Break amount={2} />

      <Highlight theme={themes.vsDark} code={modalTriggerCode} language="tsx">
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
      <h2 className="mb-4 text-2xl uppercase font-semibold" id="custom">Custom Styling</h2>
      <p className="mb-4">
        Customize the modal appearance with <code>className</code> and <code>style</code> props:
      </p>

      <Modal 
        trigger={<Button variant="outline">Open Custom Modal</Button>}
        style={{ maxWidth: '800px', backgroundColor: '#f3f4f6' }}
        className="custom-modal-class"
      >
        <h2 className="text-2xl font-bold mb-4 text-black">Custom Styled Modal</h2>
        <p className="mb-4 text-gray-700">
          This modal has custom width and background color applied through inline styles.
        </p>
        <p className="text-gray-700">
          You can also add custom CSS classes for more complex styling.
        </p>
      </Modal>
      <Break amount={2} />

      <Highlight theme={themes.vsDark} code={modalCustomStyleCode} language="tsx">
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
        <h3 className="text-lg font-semibold mb-2">Modal Props</h3>
        <ul className="space-y-2">
          <li><code>children</code> (required): Content to display inside the modal</li>
          <li><code>trigger</code> (optional): Element that opens the modal when clicked</li>
          <li><code>isOpen</code> (optional): Controlled open state (requires onClose)</li>
          <li><code>onClose</code> (optional): Callback when modal should close (requires isOpen)</li>
          <li><code>className</code> (optional): Additional CSS classes for modal content</li>
          <li><code>style</code> (optional): Inline styles for modal content</li>
          <li><code>id</code> (optional): HTML id attribute</li>
        </ul>
      </Card>

      <Card className="bg-blue-50 border border-blue-200 rounded p-4 mb-12">
        <h3 className="text-lg font-semibold mb-2">Features</h3>
        <ul className="space-y-2 text-sm">
          <li>• <strong>Focus Management:</strong> Automatically focuses first interactive element when opened</li>
          <li>• <strong>Keyboard Support:</strong> Esc key closes the modal</li>
          <li>• <strong>Click Outside:</strong> Clicking the overlay closes the modal</li>
          <li>• <strong>Portal Rendering:</strong> Renders at document.body level to avoid z-index issues</li>
          <li>• <strong>Accessibility:</strong> Includes proper ARIA attributes (role="dialog", aria-modal="true")</li>
          <li>• <strong>Two Modes:</strong> Uncontrolled (with trigger) or controlled (with isOpen/onClose)</li>
        </ul>
      </Card>

      <Card className="bg-yellow-50 border border-yellow-200 rounded p-4 mb-12">
        <h3 className="text-lg font-semibold mb-2">Usage Notes</h3>
        <ul className="space-y-2 text-sm">
          <li>• Use <code>trigger</code> prop for simple use cases (modal manages its own state)</li>
          <li>• Use <code>isOpen</code> + <code>onClose</code> props when you need to control the modal externally</li>
          <li>• Don't mix both approaches - either provide trigger OR (isOpen + onClose), not both</li>
          <li>• The close button is always rendered in the top-right corner</li>
        </ul>
      </Card>

      <Break amount={3} />
    </Container>
  );
}
