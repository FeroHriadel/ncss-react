import Break from "../components/spacers/Break";
import VirtualizedTable, { type FilterPreset } from "../components/tables/VirtualizedTable/VirtualizedTable";
import Container from "../components/wrappers/Container";
import { Highlight, themes } from 'prism-react-renderer';
import { basicUse, columnsConfig, filterPresetsCode, virtualizedTableRealLifeExampleCode } from "../utils/VirtualizedTablePageCode";







// Function to generate 100 items
function generateData(count: number) {
  const names = ['John Doe', 'Jane Smith', 'Sam Johnson', 'Alice Brown', 'Bob White', 'Carol Davis', 'Mike Wilson', 'Sarah Lee', 'Tom Anderson', 'Lisa Garcia']
  const colors = ['blue', 'purple', 'green', 'orange', 'red', 'indigo', 'pink', 'yellow', 'cyan', 'emerald']
  const roles = ['Developer', 'Designer', 'Tech Lead', 'Full Stack', 'Manager', 'Analyst', 'Engineer', 'Architect']
  const teams = ['Frontend', 'UX', 'Backend', 'Product', 'Operations', 'Data', 'Mobile', 'DevOps']
  const levels = ['Junior', 'Mid', 'Senior', 'Principal', 'Director']
  const skills = [
    ['React', 'TypeScript', 'Frontend'],
    ['Vue', 'JavaScript'],
    ['Python', 'Django', 'Backend', 'DevOps'],
    ['Angular', 'RxJS', 'NgRx'],
    ['Node.js', 'Express', 'MongoDB'],
    ['Java', 'Spring', 'Microservices'],
    ['C#', '.NET', 'Azure'],
    ['Go', 'Docker', 'Kubernetes']
  ]

  const data = []
  
  for (let i = 1; i <= count; i++) {
    const nameIndex = (i - 1) % names.length
    const colorIndex = (i - 1) % colors.length
    const isActive = Math.random() > 0.3 // 70% chance of being active
    
    data.push({
      id: i,
      name: <span className={`font-bold text-${colors[colorIndex]}-600`}>{names[nameIndex]} #{i}</span>,
      age: 25 + (i % 40), // Ages between 25-64
      isActive: isActive 
        ? <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">Active</span>
        : <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-sm">Inactive</span>,
      description: i % 2 === 0 
        ? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        : <em>Ut enim ad minim veniam, quis nostrud exercitation.</em>,
      tags: skills[i % skills.length],
      metadata: { 
        role: roles[i % roles.length], 
        team: teams[i % teams.length], 
        level: levels[i % levels.length] 
      },
      actions: <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => alert('Cell html is interactive')}>Edit #{i}</button>
    })
  }
  
  return data
}

const data = generateData(100)

const filterPresets: FilterPreset[] = [
  {
    name: "Young Adults (25-35)",
    filters: [
      { column: 'age', condition: 'greater_than', value: '24', operator: 'and' },
      { column: 'age', condition: 'less_than', value: '36', operator: null }
    ]
  },
  {
    name: "Seniors (55+)",
    filters: [
      { column: 'age', condition: 'greater_than', value: '54', operator: null }
    ]
  },
  {
    name: "Low IDs (< 20)",
    filters: [
      { column: 'id', condition: 'less_than', value: '20', operator: null }
    ]
  }
];



export default function VirtualizedTablePage() {
  return (
    /* INTRO  */
    <Container className="px-2 pt-24">
      <h1 className="mb-4 uppercase font-bold text-3xl">Virtualized Table</h1>
      <p className="text-gray-800 text-lg mb-8">Table for rendering 1000s of rows of data efficiently using virtualization.</p>
      <p className="text-gray-700 mb-4">Features:</p>
      <ul className="text-gray-700 list-disc mb-16">
        <li className="ml-8 pb-1">Virtualized rendering for performance</li>
        <li className="ml-8 pb-1">Fleible column height (unlike most virtualized tables)</li>
        <li className="ml-8 pb-1">Column reordering (drag and drop column to reorder)</li>
        <li className="ml-8 pb-1">Column sorting (click the arrow in header cell to sort)</li>
        <li className="ml-8 pb-1">Hiding columns (click the table icon in the controls to hide/show columns)</li>
        <li className="ml-8 pb-1">Filtering (click the filter icon in the controls to filter shown data)</li>
        <li className="ml-8 pb-1">Zooming in and out (click the magnifying glass icons to zoom in/out)</li>
        <li className="ml-8 pb-1">Can render html, string, number, array, object, undefined, null in cells</li>
        <li className="ml-8 pb-1">Customizable column widths</li>
        <li className="ml-8 pb-1">Customizable table height</li>
        <li className="ml-8 pb-1">Mouse wheel & mouse drag scrolling, keyboard controlls: home, pgup, pgdn, home, end, arrow keys</li>
        <li className="ml-8 pb-1">Adjustability for developers (passing props to customize behavior & styles)</li>
        <li className="ml-8 pb-1">Copying cell text to clipboard (double-click to copy)</li>
      </ul>



      {/* TABLE EXAMPLE */}
      <VirtualizedTable
        data={data} 
        height="500px"
        horizontalSeparators={true}
        verticalSeparators={true}
        columnsConfig={[
          { column: 'id', displayValue: 'ID', width: '80px' },
          { column: 'name', displayValue: 'FULL NAME', width: '200px' },
          { column: 'age', displayValue: 'AGE', width: '80px' },
          { column: 'isActive', displayValue: 'STATUS', width: '120px' },
          { column: 'description', displayValue: 'DESCRIPTION', width: '300px' },
          { column: 'tags', displayValue: 'SKILLS (ARRAY)', width: '250px' },
          { column: 'metadata', displayValue: 'INFO (OBJECT)', width: '300px' },
          { column: 'actions', displayValue: 'Actions', width: '100px' },
        ]}
        filterPresets={filterPresets}
        className="mb-16"
        style={{}}
        controls={true}
        controlBarClassName=""
        controlBarStyle={{}}
        headerClassName=""
        headerStyle={{}}
      />



      {/* BASIC USE */}
      <h2 className="mb-4 text-2xl uppercase font-semibold">Basic use</h2>
      <p className="mb-8 text-gray-700">Just pass your data (object[]) as data prop to VirtualizedTable component:</p>

      <Highlight
        theme={themes.vsLight}
        code={basicUse}
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



      {/* COLUMNS CONFIG */}
      <h2 className="mb-4 text-2xl uppercase font-semibold">Columns Config</h2>
      <p className="text-gray-700 mb-4">If you need to configure the columns of the table, you can do so by passing a columnsConfig prop to the VirtualizedTable component.</p> 
      
      <p className="text-gray-700 mb-4">{`It is an array of {column, displayName, width} objects:`}</p>
      <ul className="text-gray-700 list-disc mb-4">
        <li className="ml-8 pb-1">column: the object key in your data array</li>
        <li className="ml-8 pb-1">displayName: renames the column header. If your data is e.g.: {`id: 1`} and you want to rename the column to "User ID", you would set displayName to "User ID".</li>
        <li className="ml-8 pb-1">width custom column width (e.g. "100px", "20%")</li>
      </ul>

      <p className="text-gray-700 mb-8">{`The order in which you define the columns will be the order in which they appear in the table. E.g. if you define the columns as [ { column: 'id', ... }, { column: 'name', ... } ], the table will show the ID column first, followed by the Name column.`}</p>

      <Highlight
        theme={themes.vsLight}
        code={columnsConfig}
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



      {/* OTHER PROPS */}
      <h2 className="mb-4 text-2xl uppercase font-semibold">Other Props</h2>

      <p className="text-gray-700 mb-4">{`In addition to the props mentioned above, the VirtualizedTable component also accepts the following props:`}</p>
      <ul className="text-gray-700 list-disc mb-4">
        <li className="ml-8 pb-1">{`className: additional class names to apply to the table`}</li>
        <li className="ml-8 pb-1">{`style: additional styles to apply to the table`}</li>
        <li className="ml-8 pb-1">{`headerClassName: additional class names to apply to the table header`}</li>
        <li className="ml-8 pb-1">{`headerStyle: additional styles to apply to the table header`}</li>
        <li className="ml-8 pb-1">{`controlBarClassName: additional class names to apply to the control bar`}</li>
        <li className="ml-8 pb-1">{`controlBarStyle: additional styles to apply to the control bar`}</li>
        <li className="ml-8 pb-1">{`height: height of the table (e.g. "500px", "50vh")`}</li>
        <li className="ml-8 pb-1">{`horizontalSeparators: boolean to show/hide horizontal row separators`}</li>
        <li className="ml-8 pb-1">{`verticalSeparators: boolean to show/hide vertical column separators`}</li>
        <li className="ml-8 pb-1">{`controls: boolean to show/hide the control bar`}</li>
      </ul>
      <Break amount={3} />



      {/* FILTER PRESETS */}
      <h2 className="mb-4 text-2xl uppercase font-semibold">Filter Presets</h2>
      <p className="text-gray-700">{`The VirtualizedTable component allows you to define filter presets that users can quickly apply to the table data.`}</p>
      <p className="text-gray-700 mb-4">{`Filter presets are defined as an array of objects, each containing a label and a filter function:`}</p>
      <Highlight
        theme={themes.vsLight}
        code={filterPresetsCode}
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



      {/* REAL LIFE EXAMPLE */}
      <h2 className="mb-4 text-2xl uppercase font-semibold">Real-Life Example</h2>
      <p className="text-gray-700 mb-4">{`A real life example of using the VirtualizedTable component would be displaying a large dataset, such as a list of users or products, where only a small subset of the data is visible at any given time. This allows for efficient rendering and smooth scrolling, even with thousands of rows. Here is a sample implementation of the VirtualizedTable component rendered on the top of the page. It also shows how to set filter presets`}</p>
      <Highlight
        theme={themes.vsLight}
        code={virtualizedTableRealLifeExampleCode}
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

    </Container>
  )
}
