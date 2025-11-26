import { Link } from "react-router-dom";
import Collapsible from "../collapsible/Collapsible";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import "./LeftNav.css";
import IconButton from "../buttons/IconButton";
import CloseButton from "../buttons/CloseButton";



export interface LeftNavMenuOption {
  optionName: string;
  optionUrl?: string;
}

export interface LeftNavLink {
  linkName: string;
  linkUrl?: string; //either linkUrl or options must be provided - if both are provided, options take precedence
  options?: LeftNavMenuOption[];
}

export interface LeftNavProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  children?: React.ReactNode;
  width: string;
  top: string;
  links: LeftNavLink[];
  fixed?: boolean;
}



export default function LeftNav({
  className,
  style,
  id,
  children,
  width = '280px',
  top = '0px',
  links,
  fixed = true,
}: LeftNavProps) {

  // Show/Hide LeftNav functions
  function showLeftNav() {
    const leftNav = document.querySelector('.left-nav') as HTMLElement;
    if (leftNav) {
      leftNav.style.transform = 'translateX(0px)';
    }
  }

  function hideLeftNav() {
    const leftNav = document.querySelector('.left-nav') as HTMLElement;
    if (leftNav) {
      leftNav.style.transform = 'translateX(-1000px)';
    }
  }


  // Render
  return (
    <>
      { /* LeftNav show button (for small screens) */}
      <IconButton 
        className="left-nav-open-button"
        icon={<FaChevronRight className="text-gray-700" />}
        onClick={showLeftNav}
      />

      { /* LeftNav component */}
      <nav
        className={`left-nav ${className || ''}`}
        style={{
          width,
          top,
          position: fixed ? 'fixed' : 'relative',
          left: fixed ? '0px' : undefined,
          height: fixed ? `calc(100vh - ${top})` : '100%',
          ...style,
        }}
        id={id}
      >
        { /* LeftNav hide button (for small screens) */}
        <CloseButton 
          className="left-nav-close-button"
          onClick={hideLeftNav}
          aria-label="Close left navigation"
        />

        {links.map((link, index) => {
          // If link has options, render as Collapsible
          if (link.options && link.options.length > 0) {
            return (
              <Collapsible
                key={'collapsible-' + link.linkName}
                trigger={
                  <span 
                    className={`left-nav-link-trigger ${index > 0 ? 'left-nav-border-top-0' : ''}`}
                  >
                    {link.linkName}
                    <FaChevronDown size={10} className="left-nav-chevron" style={{ color: 'var(--nc-nav-text)' }} />
                  </span>
                }
              >
                {link.options.map((opt) => (
                  <Link 
                    key={'option-' + opt.optionName} 
                    to={opt.optionUrl || '/'} 
                    className="left-nav-option-link"
                    tabIndex={-1}
                  >
                    {opt.optionName}
                  </Link>
                ))}
              </Collapsible>
            );
          }

          // If link is a simple link, render as Link
          else {
            return (
              <Link 
                key={'link-' + link.linkName} 
                to={link.linkUrl || '/'} 
                className={`left-nav-simple-link ${index > 0 ? 'left-nav-border-top-0' : ''}`}
                tabIndex={-1}
              >
                {link.linkName}
              </Link>
            );
          }
        })}
        {children}
      </nav>
    </>
  );
}




export interface LeftNavPageProps {
  top?: string;
  left?: string;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}

export function LeftNavPage({ top = '96px', left = '200px', children, className, style, id }: LeftNavPageProps) {
  return (
    <>
      <style>
        {`
          @media (min-width: 1001px) {
            .left-nav-page {
              margin-left: ${left} !important;
            }
          }
        `}
      </style>

      <div
        className={`left-nav-page ${className || ''}`}
        style={{ top, ...style }}
        id={id}
      >
        {children}
      </div>
    </>
  );
}
