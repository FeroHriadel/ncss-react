import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import IconButton from '../buttons/IconButton';
import './TopDeckNav.css';



export default function TopDeckNav() {
  const sidebarHeight = "calc(100vh - 7rem)"
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  function toggleSidebar() {
    setIsSidebarOpen(!isSidebarOpen);
  }

  return (
    <nav className="top-deck-nav">
      <div className="top-deck-nav-left-side">
        <IconButton 
          icon={<RxHamburgerMenu 
          size={24} />} 
          ariaLabel="Menu" 
          className="top-deck-nav-burger" 
          onClick={toggleSidebar}
        />
        <span className="top-deck-nav-logo">LOGO</span>
      </div>

      <div className="top-deck-nav-right-side">
        
      </div>

      <div 
        className="top-deck-nav-sidebar" 
        style={{
          height: isSidebarOpen ? sidebarHeight : '0rem', 
          border: isSidebarOpen ? '2px solid var(--nc-topdeck-nav-border)' : 'none'
        }}>

      </div>
    </nav>
  )
}