import VirtualizedTable from "../components/tables/VirtualizedTable/VirtualizedTable";
import Container from "../components/wrappers/Container";
import Card from "../components/cards/Card";

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

export default function TablePage() {
  return (
    <Container>
      <h1 className="mb-10">Virtualized Table</h1>
      <Card className="mb-16">
        <VirtualizedTable 
          data={data} 
          height="500px"
          horizontalSeparators={true}
          verticalSeparators={true}
          columnsConfig={[
            { column: 'id', displayValue: 'ID', width: '80px' },
            { column: 'name', displayValue: 'Full Name', width: '200px' },
            { column: 'age', displayValue: 'Age', width: '80px' },
            { column: 'isActive', displayValue: 'Status', width: '120px' },
            { column: 'description', displayValue: 'Description', width: '300px' },
            { column: 'tags', displayValue: 'Skills (Array)', width: '250px' },
            { column: 'metadata', displayValue: 'Info (Object)', width: '300px' },
            { column: 'actions', displayValue: 'Actions', width: '100px' },
          ]}
        />
      </Card>
    </Container>
  )
}
