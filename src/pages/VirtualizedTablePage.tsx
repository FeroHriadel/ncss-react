import Break from "../components/spacers/Break";
import VirtualizedTable, { type FilterPreset } from "../components/tables/VirtualizedTable/VirtualizedTable";
import Container from "../components/wrappers/Container";



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
      actions: <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Edit #{i}</button>
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
    <Container className="px-2 pt-24">
      <h1 className="mb-8 uppercase font-bold text-3xl">Virtualized Table</h1>
      <p className="text-gray-700 mb-4">Table for rendering 1000s of rows of data efficiently using virtualization.</p>
      <p className="text-gray-700">Features:</p>
      <ul className="text-gray-700 list-disc mb-12">
        <li className="ml-8">Virtualized rendering for performance</li>
        <li className="ml-8">Fleible column height (unlike most virtualized tables)</li>
        <li className="ml-8">Column reordering (drag and drop column to reorder)</li>
        <li className="ml-8">Column sorting (click the arrow in header cell to sort)</li>
        <li className="ml-8">Hiding columns (click the table icon in the controls to hide/show columns)</li>
        <li className="ml-8">Filtering (click the filter icon in the controls to filter shown data)</li>
        <li className="ml-8">Zooming in and out (click the magnifying glass icons to zoom in/out)</li>
        <li className="ml-8">Can render html, string, number, array, object, undefined, null in cells</li>
        <li className="ml-8">Customizable column widths</li>
        <li className="ml-8">Customizable table height</li>
        <li className="ml-8">Mouse wheel & mouse drag scrolling, keyboard controlls: home, pgup, pgdn, home, end, arrow keys</li>
        <li className="ml-8">Adjustability for developers (passing props to customize behavior & styles)</li>
      </ul>

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
        controls={true}
        controlBarClassName=""
        controlBarStyle={{}}
        headerClassName=""
        headerStyle={{}}
      />

      <Break amount={4} />
    </Container>
  )
}
