import Card from "../components/cards/Card";
import Break from "../components/spacers/Break";
import Container from "../components/wrappers/Container";
import Pill from "../components/pills/Pill";
import { Highlight, themes } from "prism-react-renderer";
import { pillBasicCode, pillInteractiveCode, pillCloseableCode, pillCustomStyleCode } from "../utils/PillsPageCode";



export default function PillsPage() {
  return (
    <Container className="px-4 pt-24">
      {/* INTRO */}
      <h1 className="mb-4 uppercase font-bold text-3xl">Pills</h1>
      <p className="text-gray-800 text-lg mb-12">
        The <code>Pill</code> component displays small, rounded badges or tags. Pills can be static, clickable, or closeable.
      </p>
      <Card className="mb-12 p-4 bg-gray-100 flex flex-col gap-4">
        <a href="#basic"><div><code>Basic Pill</code> - Simple display badge</div></a>
        <a href="#variants"><div><code>Pill Variants</code> - Different color schemes</div></a>
        <a href="#interactive"><div><code>Interactive Pill</code> - Clickable pills with onClick handler</div></a>
        <a href="#closeable"><div><code>Closeable Pill</code> - Pills with close button</div></a>
        <a href="#custom"><div><code>Custom Styling</code> - Pills with custom styles</div></a>
      </Card>
      <hr />
      <Break amount={3} />

      {/* BASIC PILL */}
      <h2 className="mb-4 text-2xl uppercase font-semibold" id="basic">Basic Pill</h2>
      <p className="text-gray-700 mb-4">
        The simplest form of a pill displays text or content in a rounded badge.
      </p>

      <Pill>Basic Pill</Pill>
      <Break amount={2} />

      <Highlight theme={themes.vsLight} code={pillBasicCode} language="tsx">
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



      {/* INTERACTIVE PILL */}
      <h2 className="mb-4 text-2xl uppercase font-semibold" id="interactive">Interactive Pill</h2>
      <p className="text-gray-700 mb-4">
        Pills become clickable and show hover effects when an <code>onClick</code> handler is provided:
      </p>

      <Pill onClick={() => alert('Pill clicked!')}>Clickable Pill</Pill>
      <Break amount={2} />

      <Highlight theme={themes.vsLight} code={pillInteractiveCode} language="tsx">
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

      {/* CLOSEABLE PILL */}
      <h2 className="mb-4 text-2xl uppercase font-semibold" id="closeable">Closeable Pill</h2>
      <p className="text-gray-700 mb-4">
        Pills can display a close button when an <code>onClose</code> handler is provided. This is useful for tags or filters:
      </p>

      <div className="flex gap-2 flex-wrap mb-8">
        <Pill onClose={() => console.log('Close Tag 1')}>Tag 1</Pill>
        <Pill onClose={() => console.log('Close Tag 2')}>Tag 2</Pill>
        <Pill onClose={() => console.log('Close Tag 3')}>Tag 3</Pill>
      </div>

      <Highlight theme={themes.vsLight} code={pillCloseableCode} language="tsx">
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

      {/* CUSTOM STYLING */}
      <h2 className="mb-4 text-2xl uppercase font-semibold" id="custom">Custom Styling</h2>
      <p className="text-gray-700 mb-4">
        Pills can be customized with inline styles or additional CSS classes:
      </p>

      <Pill 
        style={{ 
          backgroundColor: '#3b82f6', 
          color: 'white',
          padding: '0.5rem 1rem',
          fontSize: '1rem'
        }}
      >
        Custom Styled Pill
      </Pill>
      <Break amount={2} />

      <Highlight theme={themes.vsLight} code={pillCustomStyleCode} language="tsx">
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

      {/* PROPS TABLE */}
      <Card className="bg-gray-100 border border-gray-200 rounded p-4 mb-12">
        <h3 className="text-lg font-semibold mb-2">Pill Props</h3>
        <ul className="space-y-2">
          <li><code>children</code> (optional): Content to display inside the pill</li>
          <li><code>onClick</code> (optional): Click handler - makes pill interactive</li>
          <li><code>onClose</code> (optional): Close handler - displays close button</li>
          <li><code>className</code> (optional): Additional CSS classes (e.g., pill-primary, pill-success)</li>
          <li><code>style</code> (optional): Inline styles</li>
          <li><code>ariaLabel</code> (optional): Accessibility label</li>
          <li><code>role</code> (optional): ARIA role (defaults to "button" if interactive)</li>
          <li><code>id</code> (optional): HTML id attribute</li>
        </ul>
      </Card>

      <Card className="bg-blue-50 border border-blue-200 rounded p-4 mb-12">
        <h3 className="text-lg font-semibold mb-2">Accessibility</h3>
        <ul className="space-y-2 text-sm">
          <li>• Interactive pills automatically get <code>role="button"</code> and <code>tabIndex={0}</code></li>
          <li>• Keyboard navigation is supported (Enter and Space keys trigger onClick)</li>
          <li>• Close buttons are keyboard accessible with Enter and Space keys</li>
          <li>• Use <code>ariaLabel</code> prop for screen reader descriptions</li>
        </ul>
      </Card>

      <Break amount={3} />
    </Container>
  );
}
