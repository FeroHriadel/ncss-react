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


export default function TestPage() {
  const dropdownRef = useRef<DropdownHandle>(null);
  const [multiselectValues, setMultiselectValues] = useState<string[]>([]);
  const [selectValue, setSelectValue] = useState<string | null>(null);

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
      <Break amount={20} />

    </Container>
  );
}