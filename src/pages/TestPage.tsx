import { useRef, useState } from "react";
import Break from "../components/spacers/Break";
import Button from "../components/buttons/Button";
import CloseButton from "../components/buttons/CloseButton";
import IconButton from "../components/buttons/IconButton";
import { FaCheck } from "react-icons/fa";
import ThemeSwitch from "../components/buttons/ThemeSwitch";
import Card from "../components/cards/Card";
import Collapsible from "../components/collapsible/Collapsible";
import Container from "../components/wrappers/Container";
import Modal from "../components/dialogs/Modal";
import Dropdown, { type DropdownHandle } from "../components/dropdowns/Dropdown";
import MultiSelect from "../components/dropdowns/MultiSelect";
import Select from "../components/dropdowns/Select";
import Checkbox, { type CheckboxHandle } from "../components/inputs/Checkbox";
import Email, { type EmailHandle} from "../components/inputs/Email";
import FileUpload from "../components/inputs/FileUpload";
import Input, { type InputHandle } from "../components/inputs/Input";
import Password, { type PasswordHandle } from "../components/inputs/Password";
import Switch, { type SwitchHandle } from "../components/inputs/Switch";
import Textarea, { type TextareaHandle} from "../components/inputs/Textarea";


export default function TestPage() {
  const dropdownRef = useRef<DropdownHandle>(null);
  const [multiselectValues, setMultiselectValues] = useState<string[]>([]);
  const [selectValue, setSelectValue] = useState<string | null>(null);
  const checkboxRef = useRef<CheckboxHandle>(null);
  const emailRef = useRef<EmailHandle>(null);
  const [inputVal, setInputVal] = useState<string>('');
  const inputRef = useRef<InputHandle>(null);
  const passwordRef = useRef<PasswordHandle>(null);
  const switchRef = useRef<SwitchHandle>(null);
  const [switchOn, setSwitchOn] = useState(false);
  const textAreaRef = useRef<TextareaHandle>(null);

  return (
    <Container className="px-4 pt-24">
      {/* Text */}
      <h2 className="text-2xl">TEXT</h2>
      <p>Text like p and <span>span</span> and <small>small</small> looks like this</p>
      <Break amount={1} />
      <p>ul like this:</p>
      <ul>
        <li>item 1</li>
        <li>item 2</li>
        <li>item 3</li>
      </ul>
      <Break amount={4} />


      {/* Buttons */}
      <h2 className="text-2xl">BUTTONS</h2> 
      <Break amount={1} />
      <div className="flex gap-2 flex-wrap">
        <Button variant="dark" size="md">Dark Button</Button>
        <Button variant="dark" size="md" disabled>Dark Button</Button>
        <Button variant="outline" size="md">Outline Button</Button>
        <Button variant="outline" size="md" disabled>Outline Button</Button>
        <Button variant="red" size="md">Red Button</Button>
        <Button variant="red" size="md" disabled>Red Button</Button>
        <Button variant="transparent" size="md">Transparent Button</Button>
        <Button variant="transparent" size="md" disabled>Transparent Button</Button>
      </div>
      <Break amount={1} />
      <div className="flex gap-2 flex-wrap">
        <CloseButton ariaLabel="Close Button" />
        <CloseButton ariaLabel="Disabled Close Button" disabled />
        <IconButton ariaLabel="Settings Button" icon={<FaCheck />} />
        <IconButton ariaLabel="Disabled Settings Button" icon={<FaCheck />} disabled />
        <ThemeSwitch 
          defaultTheme="light" 
          onChange={(newTheme) => console.log("Theme changed to:", newTheme)} 
        />
      </div>
      <Break amount={4} />


      {/* Cards */}
      <h2 className="text-2xl">CARDS</h2>
      <Break amount={1} />
      <Card style={{ maxWidth: '260px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h1 className="mb-2">Card Title</h1>
        <p>card paragraph</p>
        No tag
      </Card>
      <Break amount={4} />


      {/* Collapsible */}
      <h2 className="text-2xl">COLLAPSIBLE</h2>
      <Break amount={1} />
      <Collapsible 
        title="Click to Expand" 
        trigger={<Button variant="outline">Toggle Collapsible</Button>}
      >
        <Card className="mt-2">
          <p>This is the content inside the collapsible.</p>
          <p>It can contain any elements you like.</p>
          <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, atque necessitatibus voluptatum eaque totam illum inventore, pariatur repellat esse exercitationem porro fugiat ab architecto amet nobis natus qui, magni excepturi nihil? Blanditiis, cum! Dicta nobis dolorum illo nemo iste rerum, culpa modi. Debitis qui quis consequatur amet quae fuga fugit repudiandae ea perspiciatis, aspernatur veritatis asperiores iste fugiat animi! Fugit modi, consequuntur totam, accusantium officiis officia vitae id dolorum culpa iste nesciunt autem eum harum nisi ab enim deserunt. Error necessitatibus repudiandae obcaecati soluta possimus, atque optio neque sed repellat itaque molestiae. Repudiandae deleniti illo voluptatem consequatur minima similique mollitia!</span>
        </Card>
      </Collapsible>
      <Break amount={4} />


      {/* Dialogs */}
      <h2 className="text-2xl">DIALOGS</h2>
      <Break amount={1} />
      <Modal trigger={<Button variant="dark">Open Modal</Button>}>
        <p className="mt-2">This is the content inside the modal.</p>
      </Modal>
      <Break amount={4} />

      {/* Dropdowns - (customizable Dropdown) */}
      <h2 className="text-2xl">DROPDOWNS</h2>
      <Break amount={1} />
      <div className="flex gap-2 items-center">
        <Dropdown
          ref={dropdownRef}
          trigger={<Button variant="dark">Open Dropdown</Button>} 
          options={[
            { render: <span className="p-6 bg-slate-500 text-white">Option 1</span>, value: 'opt1' },
            { render: <span className="p-4 ml-8 bg-slate-600 text-white">Option 2</span>, value: 'opt2' },
            { render: <span className="p-2 ml-16 bg-slate-700 text-white">Option 3</span>, value: 'opt3' }
          ]}
          openY="up"
          openX="left"
          onChange={(v: string | null) => console.log(v)}
          optionsClassName="bg-slate-400"
          closeOnSelect={false}
        />

        <Dropdown
          trigger={<Button variant="outline">Open Dropdown 2</Button>} 
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
        <span>This is on the same line as Dropdown</span>
      </div>
      <Break amount={1} />
      {/* Dropdowns - (Multiselect) */}
      <MultiSelect
        width="300px"
        options={[
          { value: 'val1', displayValue: 'Value 1' },
          { value: 'val2', displayValue: 'Value 2' },
          { value: 'val3', displayValue: 'Value 3' },
          { value: 'val4', displayValue: 'Value 4' },
          { value: 'val5', displayValue: 'Value 5' },
          { value: 'val6', displayValue: 'Value 6' },
          { value: 'val7', displayValue: 'Value 7' },
          { value: 'val8', displayValue: 'Value 8' },
          { value: 'val9', displayValue: 'Value 9' },
          { value: 'val10', displayValue: 'Value 10' },
          { value: 'val11', displayValue: 'Value 11' },
          { value: 'val12', displayValue: 'Value 12' },
        ]}
        onChange={(selectedOptions) => { setMultiselectValues(selectedOptions); }}
      />
      {' '}
      <span className="mt-2">Selected Values: {multiselectValues.join(', ') || 'None'}</span>
      <Break amount={1} />
      {/* Dropdowns - (Select) */}
      <Select
        width="250px"
        options={[
          { value: 's1', displayValue: 'Select 1' },
          { value: 's2', displayValue: 'Select 2' },
          { value: 's3', displayValue: 'Select 3' },
          { value: 's4', displayValue: 'Select 4' },
        ]}
        onChange={(selectedOption) => { setSelectValue(selectedOption); }}
        className="mt-6"
      />
      <span className="m-2"> Selected Value: {selectValue || 'None'}</span>
      <Break amount={4} />


      {/* Inputs */}
      <Checkbox label="This is a checkbox" /> <span>This is on the same line as the checkbox</span> <Checkbox label="This is a disabled checkbox" disabled />
      <Break amount={1} />
      <Card className="my-8">
        <Checkbox 
          label="Controlled Checkbox" 
          ref={checkboxRef}
          className="mr-4"
        />
        <Button variant="outline" onClick={() => {
          if (checkboxRef.current) {
            const checked = checkboxRef.current.getChecked();
            alert(checked ? 'Checked' : 'Not Checked');
          }
        }}>Get Checked</Button>
        <Button variant="outline" onClick={() => {
          if (checkboxRef.current) {
            const isChecked = checkboxRef.current.getChecked();
            checkboxRef.current.setChecked(!isChecked);
          }
        }}>Toggle Checked</Button>
      </Card>
      
      <div className="flex gap-2">
        <Email 
          placeholder="Enter your email" 
          ref={emailRef} validate 
        />
        <Button variant="outline" onClick={() => {
          if (emailRef.current) {
            const error = emailRef.current.validate();
            alert(error);
          }
        }}>Validate</Button>
        <Button variant="outline" onClick={() => {
          if (emailRef.current) {
            const value = emailRef.current.getValue();
            alert(value);
          }
        }}>Get Value</Button>
        <Button variant="outline" onClick={() => {
          if (emailRef.current) {
            emailRef.current.setValue('BREKEKE');
          }
        }}>Set Value to BREKEKE</Button>
        <Button variant="outline" onClick={() => {
          if (emailRef.current) {
            emailRef.current.clear();
          }
        }}>Clear</Button>
      </div>
      <Email 
        label="Email with Label" 
        className="mt-4"
      /> 
      <Break amount={2} />
      <Email label="With message" message="brekeke" />
      <Email value={"value from parent & disabled"} disabled />
      <Break amount={4} />

      <FileUpload
        max={2}
        onChange={(v) => console.log(v)}
        message="Message"
      />
      <Break amount={2} />
      <FileUpload
        label="File Upload with Label"
        required
        className="mt-4"
        errorMessage="Error message"
      />
      <Break amount={4} />

      <Input
        label="Controlled Input"
        placeholder="Controlled Input"
        className="mt-4"
        message="brekeke"
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
      />

      <Card className="my-8 
      !pb-8">
        <Input
          label="Uncontrolled Input"
          placeholder="Uncontrolled Input"
          className="mt-4"
          message="brekeke"
          ref={inputRef}
        />
        <Button variant="outline" onClick={() => {
          if (inputRef.current) {
            const value = inputRef.current.getValue();
            alert(value);
          }
        }}>Get Value</Button>
        <Button variant="outline" onClick={() => {
          if (inputRef.current) {
            inputRef.current.setValue('BREKEKE');
          }
        }}>Set Value to BREKEKE</Button>
        <Button variant="outline" onClick={() => {
          if (inputRef.current) {
            inputRef.current.clear();
          }
        }}>Clear</Button>
      </Card>

      <Break amount={1} />

      <Email 
        label="Controlled Email"
        placeholder="Controlled Email"
        className="mt-4"
        message="brekeke"
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
      />
      <Email 
        label="Uncontrolled Email"
        placeholder="Uncontrolled Email"
        className="mt-4"
        message="brekeke"
      />

      <Password 
        label="Controlled Password"
        placeholder="Controlled Password"
        className="mt-4"
        message="brekeke"
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
      />
      <Card className="my-8 !pb-8 ">
        <Password 
          label="Uncontrolled Password"
          placeholder="Uncontrolled Password"
          className="mt-4"
          canShowPassword
          requireNumber
          requireSpecialCharacter
          requireUpperCase
          minLength={8}
          ref={passwordRef}
        />
        <Button variant="outline" onClick={() => {
          if (passwordRef.current) {
            const value = passwordRef.current.getValue();
            alert(value);
          }
        }}>Get Value</Button>
        <Button variant="outline" onClick={() => {
          if (passwordRef.current) {
            passwordRef.current.setValue('BREKEKE');
          }
        }}>Set Value to BREKEKE</Button>
        <Button variant="outline" onClick={() => {
          if (passwordRef.current) {
            passwordRef.current.clear();
          }
        }}>Clear</Button> 
        <Button variant="outline" onClick={() => {
          if (passwordRef.current) {
            const error = passwordRef.current.validate();
            alert(error);
          }
        }}>Validate</Button>
      </Card>

      <Break amount={1} />

      <Switch 
        label="Controlled Switch"
        className="mt-4" 
        checked={switchOn}
        onChange={(e) => setSwitchOn(e.target.checked)}
      />

      <Switch 
        label="Uncontrolled Switch"
        className="mt-4"
        ref={switchRef}
      />

      <Card className="my-4">
        <Switch ref={switchRef}  />
        <Button variant="outline" onClick={() => {
          if (switchRef.current) {
            const isOn = switchRef.current.getChecked();
            alert(isOn ? 'On' : 'Off');
          }
        }}>Get Checked</Button> 
        <Button variant="outline" onClick={() => {
          if (switchRef.current) {
            const isOn = switchRef.current.getChecked();
            switchRef.current.setChecked(!isOn);
          }
        }}>Toggle Checked</Button>
      </Card>

      <Break amount={4} />

      <Textarea width="260px" /> <Textarea width="260px" />
      <Textarea
        label="Controled Textarea with Label"
        className="mt-4"
        required
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
        validate
      />

      <Card className="my-8 !pb-8 ">
        <Textarea
          label="Uncontrolled Textarea with Label"
          className="mt-4"
          ref={textAreaRef}
          message="brekeke"
        />
        <Break amount={2} />
        <Button variant="outline" onClick={() => {
          if (textAreaRef.current) {
            const value = textAreaRef.current.getValue();
            alert(value);
          }
        }}>Get Value</Button>
        <Button variant="outline" onClick={() => {
          if (textAreaRef.current) {
            textAreaRef.current.setValue('BREKEKE');
          }
        }}>Set Value to BREKEKE</Button>
        <Button variant="outline" onClick={() => {
          if (textAreaRef.current) {
            textAreaRef.current.clear();
          }
        }}>Clear</Button>
        <Button variant="outline" onClick={() => {
          if (textAreaRef.current) {
            const error = textAreaRef.current.validate();
            alert(error);
          }
        }}>Validate</Button>
      </Card>


      

    </Container>
  );
}