import { Link, Outlet } from "react-router-dom"

function Root() {
  return (
    <>
      <div id="sidebar">
        <h1>Animated Components</h1>
        <nav>
          <Link to="panel-resize">Panel Resize</Link>
          <Link to="step-wizard">Step Wizard</Link>
        </nav>
      </div>

      <div id="detail">
        <Outlet />
      </div>
    </>
  )
}

export { Root }
