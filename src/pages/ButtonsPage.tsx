import Card from "../components/cards/Card";
import Break from "../components/spacers/Break";
import Container from "../components/wrappers/Container";
import Button from "../components/buttons/Button";
import IconButton from "../components/buttons/IconButton";
import CloseButton from "../components/buttons/CloseButton";
import { Highlight, themes } from "prism-react-renderer";
import { buttonCode, buttonVariantsCode, buttonSizesCode, buttonDisabledCode, iconButtonCode, iconButtonSizesCode, closeButtonCode, closeButtonCustomIconCode } from "../utils/ButtonsPageCode";
import { FaUser, FaHeart, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";





export default function ButtonsPage() {
  return (
    <Container className="px-4 pt-24">
      {/* INTRO */}
      <h1 className="mb-4 uppercase font-bold text-3xl">Buttons</h1>
      <p className="text-gray-800 text-lg mb-12">Button components: <code>Button</code>, <code>IconButton</code> <code>CloseButton</code></p>
      <Card className="mb-12 p-4 bg-gray-100 flex flex-col gap-4">
        <a href="#button"><div><code>Button</code> is not like html button but offers a few more customization options <br /></div></a>
        <a href="#icon-button"><div><code>IconButton</code> is intended to save time when you just need a clickable icon but don't want to waste time wrapping the icon in button and make it aria compliant <br /></div></a>
        <a href="#close-button"><div><code>CloseButton</code> is a styled button intended for closing actions. I noticed I use close buttons frequently in my applications, so having a dedicated component helps maintain consistency and saves time. <br /></div></a>
      </Card>
      <hr />
      <Break amount={3} />



      {/* BUTTON */}
      <h2 className="mb-4 text-2xl uppercase font-semibold" id="button">Button</h2>
      <p className="text-gray-700 mb-4">
        The <code>Button</code> component provides a styled button with multiple variants, sizes, and customization options. 
        It's more flexible than the standard HTML button element while maintaining accessibility.
      </p>

      <Button
        variant="dark"
        size="md"
        onClick={() => console.log('Button clicked')}
        className="mb-8"
      >
        Click Me
      </Button>

      <Highlight
        theme={themes.vsLight}
        code={buttonCode}
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

      {/* BUTTON VARIANTS */}
      <h3 className="mb-4 text-xl font-semibold">Button Variants</h3>
      <p className="text-gray-700 mb-4">The <code>Button</code> component supports four variants:</p>

      <div className="flex gap-2 mb-8 flex-wrap">
        <Button variant="dark">Dark</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="transparent">Transparent</Button>
        <Button variant="red">Red</Button>
      </div>

      <Highlight
        theme={themes.vsLight}
        code={buttonVariantsCode}
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

      {/* BUTTON SIZES */}
      <h3 className="mb-4 text-xl font-semibold">Button Sizes</h3>
      <p className="text-gray-700 mb-4">Buttons come in three sizes: small, medium (default), and large:</p>

      <div className="flex gap-2 items-center mb-8">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>

      <Highlight
        theme={themes.vsLight}
        code={buttonSizesCode}
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

      {/* BUTTON DISABLED */}
      <h3 className="mb-4 text-xl font-semibold">Disabled State</h3>
      <p className="text-gray-700 mb-4">Buttons can be disabled to prevent user interaction:</p>

      <Button disabled className="mb-8">Disabled Button</Button>

      <Highlight
        theme={themes.vsLight}
        code={buttonDisabledCode}
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

      <Card className="bg-gray-100 border border-gray-200 rounded p-4 mb-12">
        <h3 className="text-lg font-semibold mb-2">Button Props</h3>
        <ul className="space-y-2">
          <li><code>children</code> (required): The content to display inside the button</li>
          <li><code>variant</code> (optional, default: "dark"): Button style variant ("dark" | "outline" | "transparent" | "red")</li>
          <li><code>size</code> (optional, default: "md"): Button size ("sm" | "md" | "lg")</li>
          <li><code>onClick</code> (optional): Click handler function</li>
          <li><code>disabled</code> (optional): Disables the button</li>
          <li><code>type</code> (optional, default: "button"): Button type ("button" | "submit" | "reset")</li>
          <li><code>title</code> (optional): Tooltip text</li>
          <li><code>width</code> (optional): Custom width for the button</li>
          <li><code>className</code> (optional): Additional CSS classes</li>
          <li><code>style</code> (optional): Inline styles</li>
          <li><code>ariaLabel</code> (optional): Accessibility label</li>
          <li><code>ariaPressed</code> (optional): ARIA pressed state</li>
          <li><code>ariaExpanded</code> (optional): ARIA expanded state</li>
          <li><code>ariaHaspopup</code> (optional): ARIA has popup attribute</li>
          <li><code>id</code> (optional): HTML id attribute</li>
        </ul>
      </Card>
      <hr />
      <Break amount={3} />

      {/* ICON BUTTON */}
      <h2 className="mb-4 text-2xl uppercase font-semibold" id="icon-button">IconButton</h2>
      <p className="text-gray-700 mb-4">
        The <code>IconButton</code> component is designed for icon-only buttons. 
        It automatically handles accessibility attributes and provides a clean, consistent appearance for icon actions.
      </p>

      <div className="flex gap-2 mb-8">
        <IconButton icon={<FaUser />} title="User profile" onClick={() => console.log('User clicked')} />
        <IconButton icon={<FaPlus />} title="Add new" onClick={() => console.log('Add clicked')} />
        <IconButton icon={<FaEdit />} title="Edit" onClick={() => console.log('Edit clicked')} />
        <IconButton icon={<FaTrash />} title="Delete" onClick={() => console.log('Delete clicked')} />
      </div>

      <Highlight
        theme={themes.vsLight}
        code={iconButtonCode}
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

      {/* ICON BUTTON SIZES */}
      <h3 className="mb-4 text-xl font-semibold">IconButton Sizes</h3>
      <p className="text-gray-700 mb-4">You can customize the size of icon buttons:</p>

      <div className="flex gap-2 items-center mb-8">
        <IconButton icon={<FaHeart size={16} />} size="30px" title="Small heart" />
        <IconButton icon={<FaHeart size={20} />} size="40px" title="Medium heart" />
        <IconButton icon={<FaHeart size={24} />} size="50px" title="Large heart" />
      </div>

      <Highlight
        theme={themes.vsLight}
        code={iconButtonSizesCode}
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

      <Card className="bg-gray-100 border border-gray-200 rounded p-4 mb-12">
        <h3 className="text-lg font-semibold mb-2">IconButton Props</h3>
        <ul className="space-y-2">
          <li><code>icon</code> (required): The icon element to display</li>
          <li><code>title</code> (optional): Tooltip text and fallback aria-label</li>
          <li><code>size</code> (optional, default: "35px"): Button dimensions (width and height)</li>
          <li><code>onClick</code> (optional): Click handler function</li>
          <li><code>disabled</code> (optional): Disables the button</li>
          <li><code>className</code> (optional): Additional CSS classes</li>
          <li><code>style</code> (optional): Inline styles</li>
          <li><code>ariaLabel</code> (optional): Accessibility label (defaults to title)</li>
          <li><code>ariaPressed</code> (optional): ARIA pressed state</li>
          <li><code>ariaExpanded</code> (optional): ARIA expanded state</li>
          <li><code>ariaHaspopup</code> (optional): ARIA has popup attribute</li>
          <li><code>id</code> (optional): HTML id attribute</li>
        </ul>
      </Card>
      <hr />
      <Break amount={3} />

      {/* CLOSE BUTTON */}
      <h2 className="mb-4 text-2xl uppercase font-semibold" id="close-button">CloseButton</h2>
      <p className="text-gray-700 mb-4">
        The <code>CloseButton</code> component is a specialized button for closing actions. 
        It uses a red-styled close icon by default but can be customized with any icon. 
        This component is built on top of <code>IconButton</code> for consistency.
      </p>

      <div className="flex gap-2 mb-8">
        <CloseButton onClick={() => console.log('Close clicked')} />
        <CloseButton onClick={() => console.log('Close modal')} title="Close modal" />
      </div>

      <Highlight
        theme={themes.vsLight}
        code={closeButtonCode}
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

      {/* CLOSE BUTTON CUSTOM ICON */}
      <h3 className="mb-4 text-xl font-semibold">Custom Close Icon</h3>
      <p className="text-gray-700 mb-4">You can override the default close icon:</p>

      <CloseButton icon={<IoMdClose size={20} />} onClick={() => console.log('Custom close')} className="mb-8" />

      <Highlight
        theme={themes.vsLight}
        code={closeButtonCustomIconCode}
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

      <Card className="bg-gray-100 border border-gray-200 rounded p-4 mb-12">
        <h3 className="text-lg font-semibold mb-2">CloseButton Props</h3>
        <ul className="space-y-2">
          <li><code>onClick</code> (optional): Click handler function</li>
          <li><code>icon</code> (optional, default: FaTimes): Custom close icon</li>
          <li><code>title</code> (optional, default: "Close"): Tooltip text</li>
          <li><code>disabled</code> (optional): Disables the button</li>
          <li><code>className</code> (optional): Additional CSS classes</li>
          <li><code>style</code> (optional): Inline styles</li>
          <li><code>ariaLabel</code> (optional): Accessibility label (defaults to title)</li>
          <li><code>id</code> (optional): HTML id attribute</li>
        </ul>
      </Card>
      <Break amount={3} />




    </Container>
  );
}