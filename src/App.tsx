import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import TablePage from './pages/TablePage'
import TopNav from './components/navs/TopNav';
import Button from './components/buttons/Button';




function App() {
  const logo = () => <div className="font-bold text-xl translate-y-1">NCSS</div>;
  const links = [
    { 
      linkName: 'Home', 
      linkUrl: '/' 
    },
    { 
      linkName: 'Tables', 
      options: [ 
        { optionName: 'Table', optionUrl: '/tables/table' }, 
        { optionName: 'Virtualized Table', optionUrl: '/tables/virtualizedtable' } 
      ] 
    },
  ];
  const customContent = () => <Button variant='outline' className='bg-white' onClick={() => alert('TopNav customContent clicked')}>Sign In</Button>;

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <TopNav
          logo={logo()}
          logoUrl="/"
          links={links}
          height="96px"
          customContent={customContent()}
          className='shadow-md bg-gray-200 mb-12'
        />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tables/table" element={<span>Table Page</span>} />
          <Route path="/tables/virtualizedtable" element={<TablePage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
