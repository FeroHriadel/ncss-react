import { useState } from "react";
import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { BsFolderSymlinkFill } from "react-icons/bs";
import IconButton from '../buttons/IconButton';
import Dropdown from "../dropdowns/Dropdown";
import Button from "../buttons/Button";
import './TopDeckNav.css';



export interface TopDeckMenuOption {
  optionName: string;
  optionUrl?: string;
}

export interface TopNavLink {
  linkName: string;
  linkUrl?: string; //either linkUrl or options must be provided - if both are provided, options take precedence
  options?: TopDeckMenuOption[];
}

export interface TopDeckNavProps {
  sidebar?: React.ReactNode;
  logo?: React.ReactNode;
  logoUrl?: string;
  links?: TopNavLink[];
  height?: string;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  fixed?: boolean;
  customContent?: React.ReactNode;
  customContentPosition?: "left" | "right";
}



export default function TopDeckNav({sidebar, logo, logoUrl, links, height = '5rem', className, style, id = "top-deck-nav", fixed = true, customContent, customContentPosition}: TopDeckNavProps) {

  const linkOptions = !links ? [] : links.flatMap((link) => {
    //if link has options, flatten them into individual Links
    if (link.options && link.options.length > 0) {
      return link.options.map((opt) => ({
        render: <Link to={opt.optionUrl || '/'} className="top-nav-dropdown-option">{opt.optionName}</Link>,
        value: opt.optionUrl || opt.optionName
      }));
    }
    //if link is a simple link, render it
    else {
      return [{
        render: <Link to={link.linkUrl || '/'} className="top-nav-dropdown-option">{link.linkName}</Link>,
        value: link.linkUrl || link.linkName
      }];
    }
  });
  const sidebarHeight = "calc(100vh - 7rem)"
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  function toggleSidebar() {
    setIsSidebarOpen(!isSidebarOpen);
  }


  return (
    <nav 
      id={id}
      className={`top-deck-nav ${className || ''}`} 
      style={{ height: height, position: fixed ? 'fixed' : 'relative', ...style }}
    >

      {/* Left side - Hamburger Menu & Logo */}
      <div className="top-deck-nav-left-side">
        {
          sidebar
          &&
          <IconButton 
            icon={<RxHamburgerMenu 
            size={24} />} 
            ariaLabel="Menu" 
            className="top-deck-nav-burger" 
            onClick={toggleSidebar}
          />
        }
        {logo && <Link to={logoUrl || "/"}>{logo}</Link>}
      </div>


      {/* Right side */}
      <div className="top-deck-nav-right-side">
        <span className="top-deck-nav-links">
          {
            /* render dropdowns on wider screens */
            links?.map((link) => {
              if (link.options && link.options.length > 0) { //if link has options, render as dropdown
                return (
                  <Dropdown
                    key={'dropdown-' + link.linkName}
                    trigger={<Button variant="transparent" className="top-nav-dropdown-trigger">{link.linkName}</Button>}
                    closeOnSelect={true}
                    options={link.options.map((opt) => ({
                    render: <Link to={opt.optionUrl || '/'} className="top-nav-dropdown-option">{opt.optionName}</Link>,
                    value: opt.optionUrl || opt.optionName
                    }))}
                  />
                );
              }

              /* render links on wider screens */
              else return (
                <Link key={'link-' + link.linkName} to={link.linkUrl!} className="top-deck-nav-link">
                  {link.linkName}
                </Link>
              )
            })
          }
        </span>

        {/* custom content */}
        <span 
          className="top-deck-nav-custom-content"
          style={{ order: customContentPosition === "left" ? -1 : 1 }}
        >
          {customContent}
        </span>


        {
          // render collapsible menu on smaller screens
          <span className="top-deck-small-screen-options">
            <Dropdown options={linkOptions} className="top-deck-nav-collapsible-menu">
              <IconButton icon={<BsFolderSymlinkFill size={20} />} />
            </Dropdown>
          </span>
        }
      </div>

      {/* Sidebar */}
      <div 
        className="top-deck-nav-sidebar" 
        style={{
          height: isSidebarOpen ? sidebarHeight : '0rem', 
          border: isSidebarOpen ? '2px solid var(--nc-topdeck-nav-border)' : 'none'
      }}>
        {sidebar}
      </div>
    </nav>
  )
}