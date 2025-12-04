import { Link } from "react-router-dom";
import Dropdown from "../dropdowns/Dropdown";
import { GrMenu } from "react-icons/gr";
import IconButton from "../buttons/IconButton";
import "./TopNav.css";
import Button from "../buttons/Button";



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
  height?: string;
  className?: string;
  style?: React.CSSProperties;
  fixed?: boolean;
  customContent?: React.ReactNode;
  customContentPosition?: "left" | "right";
}



export default function TopNav({
  logo, 
  logoUrl, 
  links, 
  height = `96px`, 
  className, 
  style,
  fixed = true,
  customContent,
  customContentPosition = "right"
}: TopNavProps) {

  // Hamburger menu options
  const hamburgerOptions = !links ? [] : links.flatMap((link) => {
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


  // Render
  return (
    /* Top Navigation Bar wrap */
    <nav 
      className={`top-nav ${fixed ? 'top-nav-fixed' : ''} ${className || ''}`}
      style={{...style, height: height || '96px', boxSizing: 'border-box'}} 
    >

      {/* Left side - Logo */}
      <span className="top-nav-logo">
        <Link to={logoUrl || '/' }>
          {logo}
        </Link>
      </span>
      
      {/* Right side - links & dropdowns - wider screens (no hamburger) */}
      <div className="top-nav-right-side">
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
              <Link key={'link-' + link.linkName} to={link.linkUrl!} className="top-nav-link">
                {link.linkName}
              </Link>
            )
          })
        }

        {/* custom content */}
        <span 
          className="top-nav-custom-content"
          style={{ order: customContentPosition === "left" ? -1 : 1 }}
        >
          {customContent}
        </span>
      </div>

      {
        // render hamburger menu on smaller screens
        <span className="small-screen-options">
          <Dropdown options={hamburgerOptions} className="top-nav-hamburger">
            <IconButton icon={<GrMenu />} />
          </Dropdown>
          <span 
            className="top-nav-custom-content"
            style={{ order: customContentPosition === "left" ? -1 : 1 }}
          >
            {customContent}
          </span>
        </span>
      }
    </nav>
  )
}