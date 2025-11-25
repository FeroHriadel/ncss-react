export const basicUse = `
  import Table from "../components/tables/Table/Table";

  const data = [
    { id: 1, name: 'John Doe', age: 28, email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', age: 34, email: 'jane@example.com' },
    { id: 3, name: 'Sam Johnson', age: 45, email: 'sam@example.com' },
    { id: 4, name: 'Alice Brown', age: 29, email: 'alice@example.com' },
    { id: 5, name: 'Bob White', age: 31, email: 'bob@example.com' },
  ];

  export default function MyPage() {
    return (
      <Table data={data} />
    )
  }
`;


export const columnsConfig = `
  const columnsConfig={[
      { column: 'id', displayValue: 'ID', width: '50px' },
      { column: 'name', displayValue: 'FULL NAME', width: '500px' },
      { column: 'age', displayValue: 'AGE', width: '75px' },
      { column: 'job', displayValue: 'JOB TITLE', width: '200px' },
      { column: 'interested', displayValue: 'INTERESTED', width: '400px' },
    ]}

    <Table data={data} columnsConfig={columnsConfig} />
`;


export const tableRealLifeExampleCode = `
  import Table from "../components/tables/Table/Table";

  const data = [
    { id: 1, name: "John Doe", age: 30, job: "Engineer", interested: true },
    { id: 2, name: "Jane Smith", age: 25, job: "Designer", interested: false },
    { id: 3, name: "Mike Johnson", age: 35, job: "Manager", interested: true },
    { id: 4, name: "Emily Davis", age: 28, job: "Developer", interested: false },
    { id: 5, name: "Sarah Wilson", age: 32, job: "Analyst", interested: true },
    // ... more rows
  ];

  export default function MyPage() {
    return (
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
        className="mb-8"
      />
    )
  }
`;
