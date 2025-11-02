export const buttonCode = `
  import Button from "../components/buttons/Button";

  <Button
    variant="dark"
    size="md"
    onClick={() => console.log('Button clicked')}
  >
    Click Me
  </Button>
`;

export const buttonVariantsCode = `
  <div className="flex gap-2">
    <Button variant="dark">Dark</Button>
    <Button variant="outline">Outline</Button>
    <Button variant="transparent">Transparent</Button>
    <Button variant="red">Red</Button>
  </div>
`;

export const buttonSizesCode = `
  <div className="flex gap-2 items-center">
    <Button size="sm">Small</Button>
    <Button size="md">Medium</Button>
    <Button size="lg">Large</Button>
  </div>
`;

export const buttonDisabledCode = `
  <Button disabled>Disabled Button</Button>
`;

export const iconButtonCode = `
  import IconButton from "../components/buttons/IconButton";
  import { FaUser } from "react-icons/fa";

  <IconButton
    icon={<FaUser />}
    title="User profile"
    onClick={() => console.log('Icon clicked')}
  />
`;

export const iconButtonSizesCode = `
  import { FaHeart } from "react-icons/fa";

  <div className="flex gap-2 items-center">
    <IconButton icon={<FaHeart size={16} />} size="30px" title="Small" />
    <IconButton icon={<FaHeart size={20} />} size="40px" title="Medium" />
    <IconButton icon={<FaHeart size={24} />} size="50px" title="Large" />
  </div>
`;

export const closeButtonCode = `
  import CloseButton from "../components/buttons/CloseButton";

  <CloseButton
    onClick={() => console.log('Close clicked')}
    title="Close"
  />
`;

export const closeButtonCustomIconCode = `
  import { IoMdClose } from "react-icons/io";

  <CloseButton
    icon={<IoMdClose size={20} />}
    onClick={() => console.log('Custom close icon')}
  />
`;
