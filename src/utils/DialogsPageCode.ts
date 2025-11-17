export const modalBasicCode = `import Modal from "../components/dialogs/Modal";
import Button from "../components/buttons/Button";

<Modal trigger={<Button>Open Modal</Button>}>
  <h2 className="text-2xl font-bold mb-4">Modal Title</h2>
  <p className="text-gray-700 mb-4">
    This is a basic modal with a trigger button.
  </p>
</Modal>`;

export const modalControlledCode = `import { useState } from "react";
import Modal from "../components/dialogs/Modal";
import Button from "../components/buttons/Button";

const [isModalOpen, setIsModalOpen] = useState(false);

<>
  <Button onClick={() => setIsModalOpen(true)}>
    Open Controlled Modal
  </Button>
  
  <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
    <h2 className="text-2xl font-bold mb-4">Controlled Modal</h2>
    <p className="text-gray-700 mb-4">
      This modal's state is controlled by the parent.
    </p>
    <Button onClick={() => setIsModalOpen(false)}>Close</Button>
  </Modal>
</>`;

export const modalTriggerCode = `<Modal trigger={
  <span className="text-blue-600 underline cursor-pointer">
    Click here to learn more
  </span>
}>
  <h2 className="text-2xl font-bold mb-4">More Information</h2>
  <p className="text-gray-700">
    You can use any element as a trigger.
  </p>
</Modal>`;

export const modalCustomStyleCode = `<Modal 
  trigger={<Button variant="outline">Open Custom Modal</Button>}
  style={{ maxWidth: '800px', backgroundColor: '#f3f4f6' }}
  className="custom-modal-class"
>
  <h2 className="text-2xl font-bold mb-4">Custom Styled Modal</h2>
  <p className="text-gray-700">
    Custom width and background color applied.
  </p>
</Modal>`;

export const modalFormCode = `import { useState } from "react";

const [isFormModalOpen, setIsFormModalOpen] = useState(false);

<Modal isOpen={isFormModalOpen} onClose={() => setIsFormModalOpen(false)}>
  <h2 className="text-2xl font-bold mb-4">Contact Form</h2>
  <form onSubmit={(e) => {
    e.preventDefault();
    alert('Form submitted!');
    setIsFormModalOpen(false);
  }}>
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Name
      </label>
      <input 
        type="text" 
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
        placeholder="Your name"
      />
    </div>
    <div className="flex gap-2 justify-end">
      <Button 
        type="button" 
        variant="outline" 
        onClick={() => setIsFormModalOpen(false)}
      >
        Cancel
      </Button>
      <Button type="submit">Submit</Button>
    </div>
  </form>
</Modal>`;
