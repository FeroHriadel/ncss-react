import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ButtonsPage from './pages/ButtonsPage';
import DropdownsPage from './pages/DropdownsPage';
import VirtualizedTablePage from './pages/VirtualizedTablePage'
import TopNav from './components/navs/TopNav';
import logo from './assets/logo.png'




function App() {

  // Navigation links
  const links = [
    { 
      linkName: 'Home', 
      linkUrl: '/' 
    },
    { 
      linkName: 'Dropdowns', 
      linkUrl: '/dropdowns'
    },
    {
      linkName: 'Buttons',
      linkUrl: '/buttons'
    },
    { 
      linkName: 'Tables', 
      options: [ 
        { optionName: 'Table', optionUrl: '/tables/table' }, 
        { optionName: 'Virtualized Table', optionUrl: '/tables/virtualizedtable' } 
      ] 
    },
  ];


  // Render
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <TopNav
          logo={<img src={logo} alt="NCSS Logo" className="h-8 translate-y-1" />}
          logoUrl="/"
          links={links}
          height="96px"
          className='shadow-md bg-gray-200 mb-12'
        />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/buttons" element={<ButtonsPage />} />
          <Route path="/dropdowns" element={<DropdownsPage />} />
          <Route path="/tables/virtualizedtable" element={<VirtualizedTablePage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
