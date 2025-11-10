import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ButtonsPage from './pages/ButtonsPage';
import DropdownsPage from './pages/DropdownsPage';
import InputsPage from './pages/InputsPage';
import VirtualizedTablePage from './pages/VirtualizedTablePage'
import TopNav from './components/navs/TopNav';



function App() {

  // Navigation links
  const links = [
    { 
      linkName: 'Home', 
      linkUrl: '/' 
    },
    {
      linkName: 'Buttons',
      linkUrl: '/buttons'
    },
    { 
      linkName: 'Dropdowns', 
      linkUrl: '/dropdowns'
    },
    {
      linkName: 'Inputs',
      linkUrl: '/inputs'
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
          logo={<span className='font-extrabold text-gray-500 text-2xl' style={{filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,0.2))'}}>NCSS</span>}
          logoUrl="/"
          links={links}
          height="96px"
          className='shadow-md bg-gray-200'
        />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/buttons" element={<ButtonsPage />} />
          <Route path="/dropdowns" element={<DropdownsPage />} />
          <Route path="/inputs" element={<InputsPage />} />
          <Route path="/tables/virtualizedtable" element={<VirtualizedTablePage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
