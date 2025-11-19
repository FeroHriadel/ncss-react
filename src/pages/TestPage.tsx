import Break from "../components/spacers/Break";
import Button from "../components/buttons/Button";
import CloseButton from "../components/buttons/CloseButton";
import IconButton from "../components/buttons/IconButton";
import { FaCheck } from "react-icons/fa";
import ThemeSwitch from "../components/buttons/ThemeSwitch";
import Card from "../components/cards/Card";
import Collapsible from "../components/collapsible/Collapsible";
import Container from "../components/wrappers/Container";


export default function TestPage() {
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
        <Card className="mt-2 border">
          <p>This is the content inside the collapsible.</p>
          <p>It can contain any elements you like.</p>
          <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, atque necessitatibus voluptatum eaque totam illum inventore, pariatur repellat esse exercitationem porro fugiat ab architecto amet nobis natus qui, magni excepturi nihil? Blanditiis, cum! Dicta nobis dolorum illo nemo iste rerum, culpa modi. Debitis qui quis consequatur amet quae fuga fugit repudiandae ea perspiciatis, aspernatur veritatis asperiores iste fugiat animi! Fugit modi, consequuntur totam, accusantium officiis officia vitae id dolorum culpa iste nesciunt autem eum harum nisi ab enim deserunt. Error necessitatibus repudiandae obcaecati soluta possimus, atque optio neque sed repellat itaque molestiae. Repudiandae deleniti illo voluptatem consequatur minima similique mollitia!</span>
        </Card>
      </Collapsible>
      <Break amount={4} />

    </Container>
  );
}