import ThemeSwitch from "../components/buttons/ThemeSwitch";
import TopDeckNav from "../components/navs/TopDeckNav";



export default function TestPage() {
  const navLinks = [
    { 
      linkName: 'Home', 
      linkUrl: '/'
    },
    {
      linkName: 'Components',
      options: [ 
        { optionName: 'Buttons', optionUrl: '/buttons' },
        { optionName: 'Cards', optionUrl: '/cards' },
        { optionName: 'Collapsible', optionUrl: '/collapsible' },
        { optionName: 'Dialogs', optionUrl: '/dialogs' },
        { optionName: 'Dropdowns', optionUrl: '/dropdowns' },
        { optionName: 'Inputs', optionUrl: '/inputs' },
        { optionName: 'Navs', optionUrl: '/navs' },
        { optionName: 'Pills', optionUrl: '/pills' },
        { optionName: 'Table', optionUrl: '/tables/table' },
        { optionName: 'Virtualized Table', optionUrl: '/tables/virtualizedtable' }
      ]
    },
    {
      linkName: 'Constructs',
      options: [ 
        { optionName: 'Forms', optionUrl: '/forms' },
      ]
    }
  ];
  return (
    <>
      <TopDeckNav 
        links={navLinks}
        customContent={<ThemeSwitch />}
        customContentPosition="left"
        logo={<span className='font-extrabold text-2xl' style={{filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,0.2))'}}>NCSS</span>}
        sidebar={<div style={{padding: '1rem'}}>Sidebar content</div>}
      />
    </>
  )
}