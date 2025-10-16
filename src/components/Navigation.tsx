import { Link } from 'react-router-dom'

function Navigation() {

  return (
    <nav>
      <Link
        to="/"
        className='inline-block px-4 py-2'
      >
        Home
      </Link>
      <Link
        to="/table"
        className='inline-block px-4 py-2'
      >
        Table
      </Link>
    </nav>
  )
}

export default Navigation