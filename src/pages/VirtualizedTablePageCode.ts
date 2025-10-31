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
