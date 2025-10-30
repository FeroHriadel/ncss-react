import { Link } from "react-router-dom";
import Dropdown from "../dropdowns/Dropdown";
import { useEffect, useRef, useState } from "react";
import { GrMenu } from "react-icons/gr";
import IconButton from "../buttons/IconButton";



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
  customContent?: React.ReactNode;
  keepCustomContentOnSmallScreens?: boolean;
  height?: string;
  className?: string;
  style?: React.CSSProperties;
  fixed?: boolean;
}



export default function TopNav({
  logo, 
  logoUrl, 
  links, 
  customContent, 
  height, 
  className, 
  style, 
  keepCustomContentOnSmallScreens = true,
  fixed = true
}: TopNavProps) {

  // Refs & state
  const leftSideRef = useRef<HTMLSpanElement>(null);
  const rightSideRef = useRef<HTMLDivElement>(null);
  const [showHamburger, setShowHamburger] = useState<boolean>(false);
  
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


  // Check if there's at least 200px space between left and right sides
  function hasEnoughSpace(): boolean {
    const leftRect = leftSideRef.current?.getBoundingClientRect();
    const rightRect = rightSideRef.current?.getBoundingClientRect();
    if (!leftRect || !rightRect) return true;
    const spaceBetween = rightRect.left - leftRect.right;
    return spaceBetween >= 200;
  }


  // Handle window resize
  useEffect(() => {
    function handleResize() { setShowHamburger(!hasEnoughSpace()); }
    
    // Check on mount
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  // Render
  return (
    /* Top Navigation Bar wrap */
    <nav 
      className={`top-nav w-full px-4 py-2 flex justify-between ${height ? `min-h-[${height}]` : 'min-h-24'} ${fixed ? 'fixed top-0 left-0 right-0 z-30' : ''} ${className ? className : ''}`} 
      style={style} 
    >

      {/* Left side - Logo */}
      <span className="left-side top-nav-logo" ref={leftSideRef}>
        <Link to={logoUrl || '/' }>
          {logo}
        </Link>
      </span>
      
      {/* Right side - links & dropdowns - wider screens (no hamburger) */}
      <div className="right-side flex items-center gap-4" ref={rightSideRef}>
        {

          /* render dropdowns on wider screens */
          !showHamburger && links.map((link) => {
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

        {
          /* render custom content */
          customContent && (keepCustomContentOnSmallScreens || !showHamburger) && customContent
        }

        {
          // render hamburger menu on smaller screens
          showHamburger 
          && 
          <Dropdown options={hamburgerOptions}>
            <IconButton icon={<GrMenu />} />
          </Dropdown>

        }
      </div>
    </nav>
  )
}