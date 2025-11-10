import { Link } from "react-router-dom";
import Collapsible from "../collapsible/Collapsible";
import { FaChevronDown } from "react-icons/fa";



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
}



export default function LeftNav({
  className,
  style,
  id,
  children,
  width = '280px',
  top = '0px',
  links,
}: LeftNavProps) {

  return (
    <nav
      className={`left-nav z-[4] overflow-x-hidden overflow-y-auto ${className}`}
      style={{
        ...style,
        width,
        top,
        position: 'fixed',
        left: '0px',
        height: `calc(100vh - ${top})`,
      }}
      id={id}
    >
      {links.map((link, index) => {
        // If link has options, render as Collapsible
        if (link.options && link.options.length > 0) {
          return (
            <Collapsible
              key={'collapsible-' + link.linkName}
              trigger={
                <span className={`flex items-center w-full font-semibold text-gray-700 hover:text-gray-900 hover:bg-gray-100 px-4 py-4 border border-gray-300 border-r-0 ${index > 0 ? 'border-t-0' : ''} cursor-pointer`}>
                  {link.linkName}
                  <FaChevronDown size={10} className="ml-2" />
                </span>
              }
            >
              {link.options.map((opt) => (
                <Link 
                  key={'option-' + opt.optionName} 
                  to={opt.optionUrl || '/'} 
                  className="block w-full text-gray-700 hover:text-gray-900 hover:bg-gray-100 px-8 py-4 border border-gray-300 border-r-0 border-t-0"
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
              className={`block w-full font-semibold text-gray-700 hover:text-gray-900 hover:bg-gray-100 px-4 py-4 border border-gray-300 border-r-0 ${index > 0 ? 'border-t-0' : ''}`}
            >
              {link.linkName}
            </Link>
          );
        }
      })}
      {children}
    </nav>
  );
}
