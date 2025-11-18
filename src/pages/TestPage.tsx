import Button from "../components/buttons/Button";
import CloseButton from "../components/buttons/CloseButton";
import IconButton from "../components/buttons/IconButton";
import ThemeSwitch from "../components/buttons/ThemeSwitch";
import Break from "../components/spacers/Break";
import Container from "../components/wrappers/Container";


export default function TestPage() {
  return (
    <Container className="px-4 pt-24">
      <h1 className="text-2xl">BUTTONS</h1> 
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
        <IconButton ariaLabel="Settings Button" icon="⚙️" />
        <IconButton ariaLabel="Disabled Settings Button" icon="⚙️" disabled />
        <ThemeSwitch 
          defaultTheme="light" 
          onChange={(newTheme) => console.log("Theme changed to:", newTheme)} 
        />
      </div>
    </Container>
  );
}