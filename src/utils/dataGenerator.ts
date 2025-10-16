export interface User extends Record<string, unknown> {
  id: number
  name: string
  email: string
  role: string
  department: string
  salary: number
  joinDate: string
  status: 'active' | 'inactive'
}

export function generateLargeUserDataset(count: number = 10000): User[] {
  const names = ['John', 'Jane', 'Bob', 'Alice', 'Charlie', 'Diana', 'Eve', 'Frank', 'Grace', 'Henry']
  const surnames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez']
  const roles = ['Developer', 'Designer', 'Manager', 'Analyst', 'QA Engineer', 'DevOps', 'Product Manager', 'Sales Rep']
  const departments = ['Engineering', 'Design', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations']
  const statuses: ('active' | 'inactive')[] = ['active', 'inactive']

  const users: User[] = []

  for (let i = 1; i <= count; i++) {
    const name = names[Math.floor(Math.random() * names.length)]
    const surname = surnames[Math.floor(Math.random() * surnames.length)]
    
    users.push({
      id: i,
      name: `${name} ${surname}`,
      email: `${name.toLowerCase()}.${surname.toLowerCase()}${i}@company.com`,
      role: roles[Math.floor(Math.random() * roles.length)],
      department: departments[Math.floor(Math.random() * departments.length)],
      salary: Math.floor(Math.random() * 100000) + 40000,
      joinDate: new Date(
        2020 + Math.floor(Math.random() * 5), 
        Math.floor(Math.random() * 12), 
        Math.floor(Math.random() * 28) + 1
      ).toISOString().split('T')[0],
      status: statuses[Math.floor(Math.random() * statuses.length)]
    })
  }
  
  return users
}