import Break from "../components/spacers/Break";
import Table from "../components/tables/Table/Table";
import Container from "../components/wrappers/Container";
import { Highlight, themes } from 'prism-react-renderer';
import { basicUse, columnsConfig, tableRealLifeExampleCode } from "../utils/TablePageCode";

const data = [
  { id: 1, name: "John Doe", age: 30, job: "Engineer", interested: true },
  { id: 2, name: "Jane Smith", age: 25, job: "Designer", interested: false },
  { id: 3, name: "Mike Johnson", age: 35, job: "Manager", interested: true },
  { id: 4, name: "Emily Davis", age: 28, job: "Developer", interested: false },
  { id: 5, name: "Sarah Wilson", age: 32, job: "Analyst", interested: true },
  { id: 6, name: "David Brown", age: 29, job: "Consultant", interested: false },
  { id: 7, name: "Linda Garcia", age: 31, job: "Architect", interested: true },
  { id: 8, name: "James Martinez", age: 27, job: "Technician", interested: false },
  { id: 9, name: "Chris Lee", age: 33, job: "Scientist", interested: true },
  { id: 10, name: "Anna Kim", age: 26, job: "Artist", interested: false },
  { id: 11, name: "Tom Clark", age: 34, job: "Writer", interested: true },
  { id: 12, name: "Olivia Harris", age: 29, job: "Photographer", interested: false },
  { id: 13, name: "Ethan Walker", age: 30, job: "Developer", interested: true },
  { id: 14, name: "Sophia Hall", age: 28, job: "Designer", interested: false },
  { id: 15, name: "Mason Allen", age: 31, job: "Engineer", interested: true },
  { id: 16, name: "Isabella Young", age: 27, job: "Manager", interested: false },
  { id: 17, name: "Logan King", age: 32, job: "Analyst", interested: true },
  { id: 18, name: "Mia Wright", age: 26, job: "Consultant", interested: false },
  { id: 19, name: "Lucas Scott", age: 33, job: "Architect", interested: true },
  { id: 20, name: "Amelia Green", age: 29, job: "Technician", interested: false },
  { id: 21, name: "Alexander Adams", age: 34, job: "Scientist", interested: true },
  { id: 22, name: "Charlotte Baker", age: 30, job: "Artist", interested: false },
  { id: 23, name: "Daniel Gonzalez", age: 28, job: "Writer", interested: true },
  { id: 24, name: "Harper Nelson", age: 31, job: "Photographer", interested: false },
  { id: 25, name: "Matthew Carter", age: 27, job: "Developer", interested: true },
  { id: 26, name: "Evelyn Mitchell", age: 32, job: "Designer", interested: false },
  { id: 27, name: "Aiden Perez", age: 29, job: "Engineer", interested: true },
  { id: 28, name: "Abigail Roberts", age: 33, job: "Manager", interested: false },
  { id: 29, name: "Henry Turner", age: 26, job: "Analyst", interested: true },
  { id: 30, name: "Ella Phillips", age: 34, job: "Consultant", interested: false },
  { id: 31, name: "Joseph Campbell", age: 30, job: "Architect", interested: true },
];

export default function TablePage() {
  return (
    /* INTRO  */
    <Container className="px-4 pt-24">
      <h1 className="mb-4 uppercase font-bold text-3xl">Table</h1>
      <p className="text-lg mb-8">A standard table component for displaying data without virtualization. Best for smaller datasets where all rows should be visible at once.</p>
      <p className="mb-4">Features:</p>
      <ul className="list-disc mb-16">
        <li className="ml-8 pb-1">Displays all rows without virtualization</li>
        <li className="ml-8 pb-1">Auto-sizes to content height</li>
        <li className="ml-8 pb-1">Horizontal scrolling when content is wider than container</li>
        <li className="ml-8 pb-1">Drag-to-scroll horizontally (when rows are wider than table width)</li>
        <li className="ml-8 pb-1">Column reordering (drag and drop column to reorder)</li>
        <li className="ml-8 pb-1">Column sorting (click the arrow in header cell to sort)</li>
        <li className="ml-8 pb-1">Hiding columns (click the table icon in the controls to hide/show columns)</li>
        <li className="ml-8 pb-1">Filtering (click the filter icon in the controls to filter shown data)</li>
        <li className="ml-8 pb-1">Zooming in and out (click the magnifying glass icons to zoom in/out)</li>
        <li className="ml-8 pb-1">Can render html, string, number, array, object, undefined, null in cells</li>
        <li className="ml-8 pb-1">Customizable column widths</li>
        <li className="ml-8 pb-1">Mouse wheel scrolling, keyboard controls: arrow keys</li>
        <li className="ml-8 pb-1">Striped rows and hover effects</li>
        <li className="ml-8 pb-1">Horizontal and vertical separators</li>
        <li className="ml-8 pb-1">Copying cell text to clipboard (double-click to copy)</li>
      </ul>



      {/* TABLE EXAMPLE */}
      <Table 
        data={data} 
        striped={true}
        columnsConfig={[
          { column: 'id', displayValue: 'ID', width: '50px' },
          { column: 'name', displayValue: 'Name', width: '500px' },
          { column: 'age', displayValue: 'Age', width: '75px' },
          { column: 'job', displayValue: 'Job', width: '200px' },
          { column: 'interested', displayValue: 'Interested', width: '400px' },
        ]}
        horizontalSeparators={false}
        verticalSeparators={false}
        hover={true}
        controls={true}
        className="mb-16"
      />



      {/* BASIC USE */}
      <h2 className="mb-4 text-2xl uppercase font-semibold">Basic use</h2>
      <p className="mb-8">Just pass your data (object[]) as data prop to Table component:</p>

      <Highlight
        theme={themes.vsDark}
        code={basicUse}
        language="tsx"
      >
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



      {/* COLUMNS CONFIG */}
      <h2 className="mb-4 text-2xl uppercase font-semibold">Columns Config</h2>
      <p className="mb-4">If you need to configure the columns of the table, you can do so by passing a columnsConfig prop to the Table component.</p> 
      
      <p className="mb-4">{`It is an array of {column, displayName, width} objects:`}</p>
      <ul className="list-disc mb-4">
        <li className="ml-8 pb-1">column: the object key in your data array</li>
        <li className="ml-8 pb-1">displayName: renames the column header. If your data is e.g.: {`id: 1`} and you want to rename the column to "User ID", you would set displayName to "User ID".</li>
        <li className="ml-8 pb-1">width: custom column width (e.g. "100px", "20%")</li>
      </ul>

      <p className="mb-8">{`The order in which you define the columns will be the order in which they appear in the table. E.g. if you define the columns as [ { column: 'id', ... }, { column: 'name', ... } ], the table will show the ID column first, followed by the Name column.`}</p>

      <Highlight
        theme={themes.vsDark}
        code={columnsConfig}
        language="tsx"
      >
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



      {/* OTHER PROPS */}
      <h2 className="mb-4 text-2xl uppercase font-semibold">Other Props</h2>

      <p className="mb-4">{`In addition to the props mentioned above, the Table component also accepts the following props:`}</p>
      <ul className="list-disc mb-4">
        <li className="ml-8 pb-1">{`className: additional class names to apply to the table`}</li>
        <li className="ml-8 pb-1">{`style: additional styles to apply to the table`}</li>
        <li className="ml-8 pb-1">{`headerClassName: additional class names to apply to the table header`}</li>
        <li className="ml-8 pb-1">{`headerStyle: additional styles to apply to the table header`}</li>
        <li className="ml-8 pb-1">{`controlBarClassName: additional class names to apply to the control bar`}</li>
        <li className="ml-8 pb-1">{`controlBarStyle: additional styles to apply to the control bar`}</li>
        <li className="ml-8 pb-1">{`striped: boolean or object to enable/disable striped rows`}</li>
        <li className="ml-8 pb-1">{`horizontalSeparators: boolean to show/hide horizontal row separators`}</li>
        <li className="ml-8 pb-1">{`verticalSeparators: boolean to show/hide vertical column separators`}</li>
        <li className="ml-8 pb-1">{`hover: boolean or object to enable/disable row hover effects`}</li>
        <li className="ml-8 pb-1">{`controls: boolean to show/hide the control bar (for filtering, sorting, column visibility, zoom)`}</li>
      </ul>
      <Break amount={3} />



      {/* WHEN TO USE */}
      <h2 className="mb-4 text-2xl uppercase font-semibold">When to Use Table vs VirtualizedTable</h2>
      <p className="mb-4">Use the <strong>Table</strong> component when:</p>
      <ul className="list-disc mb-4">
        <li className="ml-8 pb-1">Your dataset is relatively small (fewer than ~100 rows)</li>
        <li className="ml-8 pb-1">You want all rows visible at once without scrolling</li>
        <li className="ml-8 pb-1">You need simpler implementation with less overhead</li>
        <li className="ml-8 pb-1">You want the table to auto-size to its content</li>
      </ul>

      <p className="mb-4">Use the <strong>VirtualizedTable</strong> component when:</p>
      <ul className="list-disc mb-8">
        <li className="ml-8 pb-1">Your dataset is large (100+ rows, or thousands)</li>
        <li className="ml-8 pb-1">You need optimal performance with large datasets</li>
        <li className="ml-8 pb-1">You want to control the table height and enable vertical scrolling</li>
        <li className="ml-8 pb-1">You need support for variable row heights with efficient rendering</li>
      </ul>
      <Break amount={3} />



      {/* REAL LIFE EXAMPLE */}
      <h2 className="mb-4 text-2xl uppercase font-semibold">Real-Life Example</h2>
      <p className="mb-4">{`A real-life example of using the Table component would be displaying a list of team members, product catalog with limited items, or form submissions where you want to see all entries at once. Here is the sample implementation of the Table component shown at the top of this page:`}</p>
      <Highlight
        theme={themes.vsDark}
        code={tableRealLifeExampleCode}
        language="tsx"
      >
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

    </Container>
  )
}
