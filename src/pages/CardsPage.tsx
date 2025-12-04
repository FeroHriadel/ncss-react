import Card from "../components/cards/Card";
import Break from "../components/spacers/Break";
import Container from "../components/wrappers/Container";
import { Highlight, themes } from "prism-react-renderer";
import { cardBasicCode, cardStyledCode, cardNestedCode } from "../utils/CardsPageCode";



export default function CardsPage() {
  return (
    <Container className="px-4 pt-24">
      {/* INTRO */}
      <h1 className="mb-4 uppercase font-bold text-3xl">Cards</h1>
      <p className="text-lg mb-12">
        The <code>Card</code> component provides a styled container for grouping related content.
      </p>
      <hr />
      <Break amount={3} />

      {/* BASIC CARD */}
      <h2 className="mb-4 text-2xl uppercase font-semibold" id="basic">Basic Card</h2>
      <p className="mb-4">
        A simple container with default padding and styling:
      </p>

      <Card className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Card Title</h3>
        <p>This is a basic card with some content inside.</p>
      </Card>

      <Highlight theme={themes.vsDark} code={cardBasicCode} language="tsx">
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

      {/* STYLED CARD */}
      <h2 className="mb-4 text-2xl uppercase font-semibold" id="styled">Custom Styling</h2>
      <p className="mb-4">
        Cards can be customized with <code>className</code> and <code>style</code> props:
      </p>

      <Card 
        className="mb-8 bg-blue-50 border-2 border-blue-300"
        style={{ padding: '2rem' }}
      >
        <h3 className="text-xl font-semibold mb-2">Styled Card</h3>
        <p>This card has custom background, border, and padding.</p>
      </Card>

      <Highlight theme={themes.vsDark} code={cardStyledCode} language="tsx">
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

      {/* NESTED CARDS */}
      <h2 className="mb-4 text-2xl uppercase font-semibold" id="nested">Nested Cards</h2>
      <p className="mb-4">
        Cards can contain other cards for hierarchical layouts:
      </p>

      <Card className="mb-8 bg-gray-100 p-6">
        <h3 className="text-xl font-semibold mb-4">Parent Card</h3>
        <div className="space-y-4">
          <Card className="bg-white p-4">
            <h4 className="font-semibold mb-2">Child Card 1</h4>
            <p className="text-sm">Nested content here.</p>
          </Card>
          <Card className="bg-white p-4">
            <h4 className="font-semibold mb-2">Child Card 2</h4>
            <p className="text-sm">More nested content.</p>
          </Card>
        </div>
      </Card>

      <Highlight theme={themes.vsDark} code={cardNestedCode} language="tsx">
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
        <h3 className="text-lg font-semibold mb-2">Card Props</h3>
        <ul className="space-y-2">
          <li><code>children</code> (required): Content to display inside the card</li>
          <li><code>className</code> (optional): Additional CSS classes</li>
          <li><code>style</code> (optional): Inline styles</li>
          <li><code>id</code> (optional): HTML id attribute</li>
          <li><code>role</code> (optional, default: "article"): ARIA role</li>
          <li><code>ariaLabel</code> (optional): Accessibility label</li>
          <li><code>ariaLabelledBy</code> (optional): ID of element that labels this card</li>
        </ul>
      </Card>

      <Break amount={3} />
    </Container>
  );
}
