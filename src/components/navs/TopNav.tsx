import { Link } from "react-router-dom";
import Dropdown from "../dropdowns/Dropdown";




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
  logo?: React.ReactNode;
  logoUrl?: string;
  links?: TopNavLink[];
  customContent?: React.ReactNode;
  height?: string;
  className?: string;
  style?: React.CSSProperties;
}



export default function TopNav({logo, logoUrl, links, customContent, height, className, style}: TopNavProps) {

  return (
    /* Top Navigation Bar wrap */
    <nav 
      className={`top-nav w-full px-4 py-2 flex justify-between ${height ? `min-h-[${height}]` : 'min-h-24'} ` + className} 
      style={style} 
    >

      {
        /* Left side - Logo */
        logo
        &&
        <span className="top-nav-logo">
          <Link to={logoUrl || '/' }>
            {logo}
          </Link>
        </span>
      }

      {/* Right side - links & dropdowns */}
      <div className="flex items-center gap-4">
        {

          /* render dropdown */
          links && links.map((link) => {
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

            /* render link */
            else return (
              <Link key={'link-' + link.linkName} to={link.linkUrl!} className="text-gray-700 hover:text-gray-900">
                {link.linkName}
              </Link>
            )
          })
        }

        {
          /* render custom content */
          customContent
        }
      </div>
    </nav>
  )
}