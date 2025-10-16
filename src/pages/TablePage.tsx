import VirtualizedTable from "../components/tables/VirtualizedTable"


const data = [
  { 
    id: 1, 
    name: <span className="font-bold text-blue-600">John Doe</span>, 
    age: 28, 
    isActive: <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">Active</span>, 
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    actions: <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Edit</button>
  },
  { 
    id: 2, 
    name: <span className="font-bold text-purple-600">Jane Smith</span>, 
    age: 34, 
    isActive: <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-sm">Inactive</span>, 
    description: 'Ut enim ad minim veniam, quis nostrud exercitation.',
    actions: <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Edit</button>
  },
  { 
    id: 3, 
    name: <span className="font-bold text-green-600">Sam Johnson</span>, 
    age: 45, 
    isActive: <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">Active</span>, 
    description: <em>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</em>,
    actions: <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Edit</button>
  },
  { 
    id: 4, 
    name: <span className="font-bold text-orange-600">Alice Brown</span>, 
    age: 29, 
    isActive: <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">Active</span>, 
    description: 'Ut enim ad minim veniam, quis nostrud exercitation.',
    actions: <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Edit</button>
  },
  { 
    id: 5, 
    name: <span className="font-bold text-red-600">Bob White</span>, 
    age: 38, 
    isActive: <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-sm">Inactive</span>, 
    description: <strong>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</strong>,
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
          { column: 'actions', displayValue: 'Actions' },
        ]}
      />
    </div>
  )
}
