import { useState } from 'react';
import Card from "../components/cards/Card";
import Break from "../components/spacers/Break";
import Container from "../components/wrappers/Container";
import TopNav from "../components/navs/TopNav";
import LeftNav from "../components/navs/LeftNav";
import { Highlight, themes } from "prism-react-renderer";

// Code examples
const topNavBasicCode = `import TopNav from './components/navs/TopNav';

const links = [
  { linkName: 'Home', linkUrl: '/' },
  { linkName: 'About', linkUrl: '/about' },
  { linkName: 'Contact', linkUrl: '/contact' }
];

<TopNav
  logo={<span className="font-bold text-xl">MyApp</span>}
  logoUrl="/"
  links={links}
/>`;

const topNavWithDropdownCode = `const links = [
  { linkName: 'Home', linkUrl: '/' },
  { 
    linkName: 'Products', 
    options: [
      { optionName: 'Product A', optionUrl: '/products/a' },
      { optionName: 'Product B', optionUrl: '/products/b' }
    ]
  },
  { linkName: 'Contact', linkUrl: '/contact' }
];

<TopNav
  logo={<span className="font-bold text-xl">MyApp</span>}
  logoUrl="/"
  links={links}
  height="80px"
  className="bg-gray-100 shadow-md"
/>`;

const topNavCustomContentCode = `<TopNav
  logo={<span className="font-bold text-xl">MyApp</span>}
  logoUrl="/"
  links={links}
  customContent={
    <div className="flex gap-2">
      <button className="px-4 py-2 bg-blue-500 text-white rounded">
        Login
      </button>
    </div>
  }
/>`;

const leftNavBasicCode = `import LeftNav from './components/navs/LeftNav';

const links = [
  { linkName: 'Dashboard', linkUrl: '/' },
  { linkName: 'Settings', linkUrl: '/settings' },
  { linkName: 'Profile', linkUrl: '/profile' }
];

<LeftNav
  links={links}
  width="250px"
  top="0px"
/>`;

const leftNavWithCollapsibleCode = `const links = [
  { linkName: 'Home', linkUrl: '/' },
  { 
    linkName: 'Components', 
    options: [
      { optionName: 'Buttons', optionUrl: '/buttons' },
      { optionName: 'Inputs', optionUrl: '/inputs' },
      { optionName: 'Tables', optionUrl: '/tables' }
    ]
  },
  { linkName: 'Settings', linkUrl: '/settings' }
];

<LeftNav
  links={links}
  width="280px"
  top="96px"
  className="bg-gray-100 shadow-md"
/>`;

const combinedNavsCode = `// In your main App component
function App() {
  const links = [
    { linkName: 'Home', linkUrl: '/' },
    { linkName: 'Buttons', linkUrl: '/buttons' },
    { 
      linkName: 'Tables', 
      options: [ 
        { optionName: 'Basic', optionUrl: '/tables/basic' }, 
        { optionName: 'Advanced', optionUrl: '/tables/advanced' } 
      ] 
    },
  ];

  return (
    <Router>
      <TopNav
        logo={<span className="font-bold text-2xl">NCSS</span>}
        logoUrl="/"
        links={links}
        height="96px"
        className="shadow-md bg-gray-200"
      />
      <LeftNav 
        links={links}
        width="200px" 
        top="96px" 
        className="shadow-md bg-gray-200"
      />
      <Routes>
        {/* Your routes */}
      </Routes>
    </Router>
  );
}`;

const leftNavPageCode = `import { LeftNavPage } from './components/navs/LeftNav';

// Wrap your page content in LeftNavPage
// It automatically adjusts margins when LeftNav is shown/hidden
function App() {
  return (
    <>
      <TopNav {...topNavProps} />
      <LeftNav {...leftNavProps} />
      
      <LeftNavPage top="96px" left="200px">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </LeftNavPage>
    </>
  );
}`;

const leftNavPagePropsCode = `<LeftNavPage 
  top="96px"        // Should match TopNav height
  left="200px"      // Should match LeftNav width
  className="bg-gray-50"
>
  {/* Your page content */}
</LeftNavPage>`;

export default function NavsPage() {
  const [showTopNav, setShowTopNav] = useState(false);
  const [showLeftNav, setShowLeftNav] = useState(false);

  const demoLinks = [
    { linkName: 'Home', linkUrl: '/' },
    { linkName: 'About', linkUrl: '/about' },
    { 
      linkName: 'Products', 
      options: [
        { optionName: 'Product A', optionUrl: '/products/a' },
        { optionName: 'Product B', optionUrl: '/products/b' }
      ]
    },
  ];

  return (
    <Container className="px-4 pt-24">
      {/* INTRO */}
      <h1 className="mb-4 uppercase font-bold text-3xl">Navigation Components</h1>
      <p className="text-gray-800 text-lg mb-12">Navigation components: <code>TopNav</code>, <code>LeftNav</code>, <code>LeftNavPage</code></p>
      <Card className="mb-12 p-4 bg-gray-100 flex flex-col gap-4">
        <a href="#topnav"><div><code>TopNav</code> is a fixed top navigation bar with logo, links, dropdowns, and custom content support</div></a>
        <a href="#leftnav"><div><code>LeftNav</code> is a fixed left sidebar navigation with links and collapsible sections</div></a>
        <a href="#leftnavpage"><div><code>LeftNavPage</code> wraps page content and automatically adjusts margins when LeftNav is shown/hidden</div></a>
        <a href="#combined"><div><code>TopNav + LeftNav + LeftNavPage</code> can be used together for a complete navigation layout</div></a>
      </Card>
      <hr />
      <Break amount={3} />

      {/* TOPNAV */}
      <h2 className="mb-4 text-2xl uppercase font-semibold" id="topnav">TopNav</h2>
      <p className="text-gray-700 mb-4">
        The <code>TopNav</code> component provides a fixed top navigation bar with logo, links, dropdown menus, and custom content.
        It automatically switches to a hamburger menu on smaller screens.
      </p>

      <div className="mb-8">
        <button 
          onClick={() => setShowTopNav(!showTopNav)}
          className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-950 mb-4"
        >
          {showTopNav ? 'Hide' : 'Show'} TopNav Demo
        </button>
        
        {showTopNav && (
          <div className="relative border-2 border-gray-300 rounded-lg" style={{ height: '200px', overflow: 'hidden' }}>
            <TopNav
              logo={<span className="font-bold text-xl text-gray-700">MyApp</span>}
              logoUrl="/"
              links={demoLinks}
              height="60px"
              fixed={false}
              className="bg-gray-100 border-b-2 border-gray-300"
            />
            <div className="p-4 pt-20">
              <p className="text-gray-600">Page content goes here...</p>
            </div>
          </div>
        )}
      </div>

      <Highlight theme={themes.vsLight} code={topNavBasicCode} language="tsx">
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

      {/* TOPNAV WITH DROPDOWN */}
      <h3 className="mb-4 text-xl font-semibold">TopNav with Dropdown Menus</h3>
      <p className="text-gray-700 mb-4">
        Links can have <code>options</code> to create dropdown menus. The dropdown automatically positions itself to stay on screen.
      </p>

      <Highlight theme={themes.vsLight} code={topNavWithDropdownCode} language="tsx">
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

      {/* TOPNAV WITH CUSTOM CONTENT */}
      <h3 className="mb-4 text-xl font-semibold">TopNav with Custom Content</h3>
      <p className="text-gray-700 mb-4">
        Add buttons, user avatars, or any custom content to the right side of the navigation:
      </p>

      <Highlight theme={themes.vsLight} code={topNavCustomContentCode} language="tsx">
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

      {/* TOPNAV PROPS */}
      <h3 className="mb-4 text-xl font-semibold">TopNav Props</h3>
      <Card className="mb-8 p-4">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="pb-2 pr-4">Prop</th>
              <th className="pb-2 pr-4">Type</th>
              <th className="pb-2 pr-4">Default</th>
              <th className="pb-2">Description</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            <tr className="border-b">
              <td className="py-2 pr-4"><code>logo</code></td>
              <td className="py-2 pr-4">React.ReactNode</td>
              <td className="py-2 pr-4">-</td>
              <td className="py-2">Logo content (text, image, component)</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 pr-4"><code>logoUrl</code></td>
              <td className="py-2 pr-4">string</td>
              <td className="py-2 pr-4">-</td>
              <td className="py-2">URL to navigate when logo is clicked</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 pr-4"><code>links</code></td>
              <td className="py-2 pr-4">TopNavLink[]</td>
              <td className="py-2 pr-4">[]</td>
              <td className="py-2">Array of navigation links (with optional dropdown options)</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 pr-4"><code>customContent</code></td>
              <td className="py-2 pr-4">React.ReactNode</td>
              <td className="py-2 pr-4">-</td>
              <td className="py-2">Custom content to display on the right side</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 pr-4"><code>height</code></td>
              <td className="py-2 pr-4">string</td>
              <td className="py-2 pr-4">'96px'</td>
              <td className="py-2">Height of the navigation bar</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 pr-4"><code>fixed</code></td>
              <td className="py-2 pr-4">boolean</td>
              <td className="py-2 pr-4">true</td>
              <td className="py-2">Whether the nav is fixed to the top</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 pr-4"><code>className</code></td>
              <td className="py-2 pr-4">string</td>
              <td className="py-2 pr-4">-</td>
              <td className="py-2">Additional CSS classes</td>
            </tr>
            <tr>
              <td className="py-2 pr-4"><code>keepCustomContentOnSmallScreens</code></td>
              <td className="py-2 pr-4">boolean</td>
              <td className="py-2 pr-4">true</td>
              <td className="py-2">Show custom content on small screens</td>
            </tr>
          </tbody>
        </table>
      </Card>
      <hr />
      <Break amount={3} />

      {/* LEFTNAV */}
      <h2 className="mb-4 text-2xl uppercase font-semibold" id="leftnav">LeftNav</h2>
      <p className="text-gray-700 mb-4">
        The <code>LeftNav</code> component provides a fixed left sidebar navigation with links and collapsible sections.
        It can be toggled open/close on smaller screens.
      </p>

      <div className="mb-8">
        <button 
          onClick={() => setShowLeftNav(!showLeftNav)}
          className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-950 mb-4"
        >
          {showLeftNav ? 'Hide' : 'Show'} LeftNav Demo
        </button>
        
        {showLeftNav && (
          <div className="relative border-2 border-gray-300 rounded-lg overflow-hidden" style={{ height: '400px' }}>
            <div className="flex h-full">
              <div className="relative" style={{ width: '200px', flexShrink: 0 }}>
                <LeftNav
                  links={demoLinks}
                  width="200px"
                  top="0px"
                  fixed={false}
                  className="bg-gray-100 border-r-2 border-gray-300"
                  style={{ height: '100%', zIndex: 0 }}
                />
              </div>
              <div className="flex-1 p-4 overflow-auto">
                <p className="text-gray-600">Page content goes here...</p>
                <p className="text-gray-600 mt-2">The left navigation is fixed and scrollable.</p>
                <p className="text-gray-600 mt-2">Click on "Products" to see the collapsible section expand.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <Highlight theme={themes.vsLight} code={leftNavBasicCode} language="tsx">
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

      {/* LEFTNAV WITH COLLAPSIBLE */}
      <h3 className="mb-4 text-xl font-semibold">LeftNav with Collapsible Sections</h3>
      <p className="text-gray-700 mb-4">
        Links with <code>options</code> render as collapsible sections that expand/collapse on click:
      </p>

      <Highlight theme={themes.vsLight} code={leftNavWithCollapsibleCode} language="tsx">
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

      {/* LEFTNAV PROPS */}
      <h3 className="mb-4 text-xl font-semibold">LeftNav Props</h3>
      <Card className="mb-8 p-4">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="pb-2 pr-4">Prop</th>
              <th className="pb-2 pr-4">Type</th>
              <th className="pb-2 pr-4">Default</th>
              <th className="pb-2">Description</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            <tr className="border-b">
              <td className="py-2 pr-4"><code>links</code></td>
              <td className="py-2 pr-4">LeftNavLink[]</td>
              <td className="py-2 pr-4">[]</td>
              <td className="py-2">Array of navigation links (with optional collapsible options)</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 pr-4"><code>width</code></td>
              <td className="py-2 pr-4">string</td>
              <td className="py-2 pr-4">'280px'</td>
              <td className="py-2">Width of the sidebar</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 pr-4"><code>top</code></td>
              <td className="py-2 pr-4">string</td>
              <td className="py-2 pr-4">'0px'</td>
              <td className="py-2">Top position (use TopNav height if combined)</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 pr-4"><code>className</code></td>
              <td className="py-2 pr-4">string</td>
              <td className="py-2 pr-4">-</td>
              <td className="py-2">Additional CSS classes</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 pr-4"><code>fixed</code></td>
              <td className="py-2 pr-4">boolean</td>
              <td className="py-2 pr-4">true</td>
              <td className="py-2">Whether the nav is fixed to the left side</td>
            </tr>
            <tr>
              <td className="py-2 pr-4"><code>children</code></td>
              <td className="py-2 pr-4">React.ReactNode</td>
              <td className="py-2 pr-4">-</td>
              <td className="py-2">Additional content at the bottom of the sidebar</td>
            </tr>
          </tbody>
        </table>
      </Card>
      <hr />
      <Break amount={3} />

      {/* LEFTNAVPAGE */}
      <h2 className="mb-4 text-2xl uppercase font-semibold" id="leftnavpage">LeftNavPage</h2>
      <p className="text-gray-700 mb-4">
        The <code>LeftNavPage</code> component is a wrapper for your page content that automatically handles margin adjustments 
        when <code>LeftNav</code> is shown or hidden on different screen sizes. On screens wider than 1000px, it adds a left margin 
        to make room for the sidebar. On smaller screens, the margin is removed and the LeftNav slides in/out.
      </p>

      <div className="mb-8">
        <Card className="p-4 bg-blue-50 border-blue-200">
          <p className="text-sm text-gray-700">
            <strong>💡 Tip:</strong> Always use <code>LeftNavPage</code> when using <code>LeftNav</code> to avoid manually managing 
            responsive margins and ensure your content doesn't overlap with the sidebar.
          </p>
        </Card>
      </div>

      <Highlight theme={themes.vsLight} code={leftNavPageCode} language="tsx">
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

      {/* LEFTNAVPAGE USAGE */}
      <h3 className="mb-4 text-xl font-semibold">Usage Guidelines</h3>
      <p className="text-gray-700 mb-4">
        Match the <code>top</code> prop to your <code>TopNav</code> height and the <code>left</code> prop to your <code>LeftNav</code> width:
      </p>

      <Highlight theme={themes.vsLight} code={leftNavPagePropsCode} language="tsx">
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

      {/* LEFTNAVPAGE PROPS */}
      <h3 className="mb-4 text-xl font-semibold">LeftNavPage Props</h3>
      <Card className="mb-8 p-4">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="pb-2 pr-4">Prop</th>
              <th className="pb-2 pr-4">Type</th>
              <th className="pb-2 pr-4">Default</th>
              <th className="pb-2">Description</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            <tr className="border-b">
              <td className="py-2 pr-4"><code>top</code></td>
              <td className="py-2 pr-4">string</td>
              <td className="py-2 pr-4">'96px'</td>
              <td className="py-2">Top padding (should match TopNav height)</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 pr-4"><code>left</code></td>
              <td className="py-2 pr-4">string</td>
              <td className="py-2 pr-4">'200px'</td>
              <td className="py-2">Left margin on screens &gt; 1000px (should match LeftNav width)</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 pr-4"><code>children</code></td>
              <td className="py-2 pr-4">React.ReactNode</td>
              <td className="py-2 pr-4">-</td>
              <td className="py-2">Page content to wrap</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 pr-4"><code>className</code></td>
              <td className="py-2 pr-4">string</td>
              <td className="py-2 pr-4">-</td>
              <td className="py-2">Additional CSS classes</td>
            </tr>
            <tr>
              <td className="py-2 pr-4"><code>style</code></td>
              <td className="py-2 pr-4">React.CSSProperties</td>
              <td className="py-2 pr-4">-</td>
              <td className="py-2">Inline styles</td>
            </tr>
          </tbody>
        </table>
      </Card>
      <hr />
      <Break amount={3} />

      {/* COMBINED NAVS */}
      <h2 className="mb-4 text-2xl uppercase font-semibold" id="combined">Combined Navigation</h2>
      <p className="text-gray-700 mb-4">
        Use <code>TopNav</code>, <code>LeftNav</code>, and <code>LeftNavPage</code> together for a complete navigation layout. 
        The <code>LeftNavPage</code> automatically handles responsive margin adjustments.
      </p>

      <Highlight theme={themes.vsLight} code={combinedNavsCode} language="tsx">
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

      {/* LINK STRUCTURE */}
      <h3 className="mb-4 text-xl font-semibold">Link Structure</h3>
      <p className="text-gray-700 mb-4">
        Both <code>TopNav</code> and <code>LeftNav</code> use the same link structure:
      </p>
      <Card className="mb-8 p-4 bg-gray-50">
        <pre className="text-sm overflow-x-auto">
{`// Simple link
{ 
  linkName: 'Home', 
  linkUrl: '/' 
}

// Link with dropdown/collapsible options
{ 
  linkName: 'Products', 
  options: [
    { optionName: 'Product A', optionUrl: '/products/a' },
    { optionName: 'Product B', optionUrl: '/products/b' }
  ]
}`}
        </pre>
      </Card>

      <Break amount={6} />
    </Container>
  )
}
