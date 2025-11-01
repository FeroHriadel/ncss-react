export const basicUse = `
  import VirtualizedTable from "../components/tables/VirtualizedTable/VirtualizedTable";

  const data = [
    { id: 1, name: 'John Doe', age: 28, email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', age: 34, email: 'jane@example.com' },
    { id: 3, name: 'Sam Johnson', age: 45, email: 'sam@example.com' },
    { id: 4, name: 'Alice Brown', age: 29, email: 'alice@example.com' },
    { id: 5, name: 'Bob White', age: 31, email: 'bob@example.com' },
  ]; //though in real use cases, data would be much larger

  export default function MyPage() {
    return (
      <VirtualizedTable data={data} />
    )
  }
`;


export const columnsConfig = `
  const columnsConfig={[
      { column: 'id', displayValue: 'ID', width: '80px' },
      { column: 'name', displayValue: 'FULL NAME', width: '200px' },
      { column: 'age', displayValue: 'AGE', width: '80px' },
      { column: 'isActive', displayValue: 'STATUS', width: '120px' },
      { column: 'description', displayValue: 'DESCRIPTION', width: '300px' },
      { column: 'tags', displayValue: 'SKILLS (ARRAY)', width: '250px' },
      { column: 'metadata', displayValue: 'INFO (OBJECT)', width: '300px' },
      { column: 'actions', displayValue: 'Actions', width: '100px' },
    ]}

    <VirtualizedTable data={data} columnsConfig={columnsConfig} />
`;


export const filterPresetsCode = `
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

  <VirtualizedTable data={data} filterPresets={filterPresets} />
`;


export const virtualizedTableRealLifeExampleCode = `
  import VirtualizedTable, { type FilterPreset } from "../components/tables/VirtualizedTable/VirtualizedTable";

  // Sample large dataset
  const data = [
    {
      id: 1,
      name: <span className="font-bold text-blue-600">John Doe #1</span>,
      age: 26,
      isActive: <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">Active</span> // or Inactive,
      description: <em>Ut enim ad minim veniam, quis nostrud exercitation.</em>,
      tags: ['Vue', 'JavaScript'],
      metadata: { role: 'Developer', team: 'Frontend', level: 'Junior' },
      actions: <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => alert('Cell html is interactive')}>Edit #1</button>
    },
    {
      id: 2,
      name: <span className="font-bold text-purple-600">Jane Smith #2</span>,
      age: 27,
      isActive: <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">Active</span> // or Inactive,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      tags: ['Python', 'Django', 'Backend', 'DevOps'],
      metadata: { role: 'Designer', team: 'UX', level: 'Mid' },
      actions: <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => alert('Cell html is interactive')}>Edit #2</button>
    },
    // ...+ 997 or more rows
  ];

  // Sample filter presets
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

  // Render the VirtualizedTable with data and filter presets
  export default function MyPage() {
    return (
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
    );
  }

`
