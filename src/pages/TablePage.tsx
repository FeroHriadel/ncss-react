import VirtualizedTable from "../components/tables/VirtualizedTable"


const data = [
  { 
    id: 1, 
    name: <span className="font-bold text-blue-600">John Doe</span>, 
    age: 28, 
    isActive: <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">Active</span>, 
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    tags: ['React', 'TypeScript', 'Frontend'],
    metadata: { role: 'Developer', team: 'Frontend', level: 'Senior' },
    actions: <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Edit</button>
  },
  { 
    id: 2, 
    name: <span className="font-bold text-purple-600">Jane Smith</span>, 
    age: 34, 
    isActive: <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-sm">Inactive</span>, 
    description: 'Ut enim ad minim veniam, quis nostrud exercitation.',
    tags: ['Vue', 'JavaScript'],
    metadata: { role: 'Designer', team: 'UX', level: 'Mid' },
    actions: <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Edit</button>
  },
  { 
    id: 3, 
    name: <span className="font-bold text-green-600">Sam Johnson</span>, 
    age: 45, 
    isActive: <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">Active</span>, 
    description: <em>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</em>,
    tags: ['Python', 'Django', 'Backend', 'DevOps'],
    metadata: { role: 'Tech Lead', team: 'Backend', level: 'Principal', experience: 15 },
    actions: <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Edit</button>
  },
  { 
    id: 4, 
    name: <span className="font-bold text-orange-600">Alice Brown</span>, 
    age: 29, 
    isActive: <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">Active</span>, 
    description: 'Ut enim ad minim veniam, quis nostrud exercitation.',
    tags: ['Angular', 'RxJS', 'NgRx'],
    metadata: { role: 'Full Stack', team: 'Product', level: 'Senior', certifications: ['AWS', 'Google Cloud'] },
    actions: <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Edit</button>
  },
  { 
    id: 5, 
    name: <span className="font-bold text-red-600">Bob White</span>, 
    age: 38, 
    isActive: <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-sm">Inactive</span>, 
    description: <strong>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</strong>,
    tags: [],
    metadata: { role: 'Manager', team: 'Operations', level: 'Director', reports: 12 },
    actions: <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Edit</button>
  },
]

export default function TablePage() {
  return (
    <div>
      <h1 className="mb-10">Virtualized Table</h1>
      <VirtualizedTable
        data={data}
        columnNames={[
          { column: 'id', displayValue: 'ID' },
          { column: 'name', displayValue: 'Full Name' },
          { column: 'age', displayValue: 'Age' },
          { column: 'isActive', displayValue: 'Status' },
          { column: 'description', displayValue: 'Description' },
          { column: 'tags', displayValue: 'Skills (Array)' },
          { column: 'metadata', displayValue: 'Info (Object)' },
          { column: 'actions', displayValue: 'Actions' },
        ]}
      />
    </div>
  )
}
