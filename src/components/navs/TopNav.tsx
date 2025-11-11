import { Link } from "react-router-dom";
import Dropdown from "../dropdowns/Dropdown";
import { GrMenu } from "react-icons/gr";
import IconButton from "../buttons/IconButton";
import "./TopNav.css";



export interface TopNavMenuOption {
  optionName: string;
  optionUrl?: string;
}

export interface TopNavLink {
  linkName: string;
  linkUrl?: string; //either linkUrl or options must be provided - if both are provided, options take precedence
  options?: TopNavMenuOption[];
}

export interface TopNavProps {
  logo: React.ReactNode;
  logoUrl?: string;
  links: TopNavLink[];
  height?: string;
  className?: string;
  style?: React.CSSProperties;
  fixed?: boolean;
}



export default function TopNav({
  logo, 
  logoUrl, 
  links, 
  height = `96px`, 
  className, 
  style,
  fixed = true
}: TopNavProps) {

  // Hamburger menu options
  const hamburgerOptions = links.flatMap((link) => {
    //if link has options, flatten them into individual Links
    if (link.options && link.options.length > 0) {
      return link.options.map((opt) => ({
        render: <Link to={opt.optionUrl || '/'} className="block w-full text-gray-700 hover:text-gray-900 hover:bg-gray-100 px-4 py-2">{opt.optionName}</Link>,
        value: opt.optionUrl || opt.optionName
      }));
    }
    //if link is a simple link, render it
    else {
      return [{
        render: <Link to={link.linkUrl || '/'} className="block w-full text-gray-700 hover:text-gray-900 hover:bg-gray-100 px-4 py-2">{link.linkName}</Link>,
        value: link.linkUrl || link.linkName
      }];
    }
  });


  // Render
  return (
    /* Top Navigation Bar wrap */
    <nav 
      className={`top-nav w-full px-4 py-2 flex justify-between items-center ${fixed ? 'fixed top-0 left-0 z-10' : ''} ${className ? className : ''}`} 
      style={{...style, height: height || '96px', boxSizing: 'border-box'}} 
    >

      {/* Left side - Logo */}
      <span className="top-nav-left-side top-nav-logo">
        <Link to={logoUrl || '/' }>
          {logo}
        </Link>
      </span>
      
      {/* Right side - links & dropdowns - wider screens (no hamburger) */}
      <div className="top-nav-right-side flex items-center gap-4">
        {

          /* render dropdowns on wider screens */
          links.map((link) => {
            if (link.options && link.options.length > 0) { //if link has options, render as dropdown
              return (
                <Dropdown
                  key={'dropdown-' + link.linkName}
                  trigger={<span className="text-gray-700 hover:text-gray-900">{link.linkName}</span>}
                  closeOnSelect={true}
                  options={link.options.map((opt) => ({
                    render: <Link to={opt.optionUrl || '/'} className="block w-full text-gray-700 hover:text-gray-900 hover:bg-gray-100 px-4 py-2">{opt.optionName}</Link>,
                    value: opt.optionUrl || opt.optionName
                  }))}
                />
              );
            }

            /* render links on wider screens */
            else return (
              <Link key={'link-' + link.linkName} to={link.linkUrl!} className="text-gray-700 hover:text-gray-900">
                {link.linkName}
              </Link>
            )
          })
        }
      </div>

      {
        // render hamburger menu on smaller screens
        <Dropdown options={hamburgerOptions} className="top-nav-hamburger">
          <IconButton icon={<GrMenu />} />
        </Dropdown>
      }
    </nav>
  )
}