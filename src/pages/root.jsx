import { Link, Outlet } from 'react-router-dom'

const links = [
  {
    link: 'panel-resize',
    text: 'Panel Resize',
  },
  {
    link: 'step-wizard',
    text: 'Step Wizard',
  },
  {
    link: 'messages',
    text: 'Messages',
  },
  {
    link: 'dock-widget',
    text: 'Dock Widget',
  }
]

function Root() {
  return (
    <>
      <div id="sidebar">
        <h1>Animated Components</h1>
        <nav>
          {links.map((link) => (
            <Link className='my-2 hover:bg-blue-800' key={link.link} to={link.link}>
              {link.text}
            </Link>
          ))}
        </nav>
      </div>

      <div id="detail" className='flex min-h-screen max-h-screen overflow-scroll'>
        <Outlet />
      </div>
    </>
  )
}

export { Root }
