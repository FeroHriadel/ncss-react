import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ButtonsPage from './pages/ButtonsPage';
import DropdownsPage from './pages/DropdownsPage';
import InputsPage from './pages/InputsPage';
import NavsPage from './pages/NavsPage';
import VirtualizedTablePage from './pages/VirtualizedTablePage'
import TopNav from './components/navs/TopNav';
import LeftNav, { LeftNavPage } from './components/navs/LeftNav';
import ThemeSwitch from './components/buttons/ThemeSwitch';



function App() {

  // TopNav links
  const topNavLinks = [
    { 
      linkName: 'Home', 
      linkUrl: '/'
    },
    {
      linkName: 'Components',
      options: [ 
        { optionName: 'Buttons', optionUrl: '/buttons' }, 
        { optionName: 'Dropdowns', optionUrl: '/dropdowns' },
        { optionName: 'Inputs', optionUrl: '/inputs' },
      ]
    },
    {
      linkName: 'Constructs',
      options: [ 
        { optionName: 'Navs', optionUrl: '/navs' },
        { optionName: 'Tables', optionUrl: '/tables/table' },
        { optionName: 'Virtualized Table', optionUrl: '/tables/virtualizedtable' }
      ]
    }
  ];

  // LeftNav links
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
      linkName: 'Navs',
      linkUrl: '/navs'
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
          links={topNavLinks}
          height="96px"
          className='shadow-md bg-gray-200'
          customContent={<ThemeSwitch className='ml-1' />}
          customContentPosition="right"
        />
        <LeftNav 
          width="200px" 
          top="96px" 
          className='shadow-md bg-gray-200'
          links={links}
        />
        <LeftNavPage top="96px" left="200px">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/buttons" element={<ButtonsPage />} />
            <Route path="/dropdowns" element={<DropdownsPage />} />
            <Route path="/inputs" element={<InputsPage />} />
            <Route path="/navs" element={<NavsPage />} />
          <Route path="/tables/virtualizedtable" element={<VirtualizedTablePage />} />
        </Routes>
      </LeftNavPage>
    </div>
  </Router>
)
}

export default App
