import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import { ErrorPage } from './pages/errorPage'
import { Messages } from './pages/messages'
import { PanelResize } from './pages/panelResize'
import { Root } from './pages/root'
import { StepWizard } from './pages/stepWizard'
import { DockWidget } from './pages/dockWidget/dockWidget'
import { GradientHover } from './pages/gradientHover'
import { Dropdown } from './pages/dropdownMenu'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'panel-resize',
        element: <PanelResize />
      },
      {
        path: 'step-wizard',
        element: <StepWizard />
      },
      {
        path: 'messages',
        element: <Messages />
      },
      {
        path: 'dock-widget',
        element: <DockWidget />
      },
      {
        path: 'gradient-hover',
        element: <GradientHover />
      },
      {
        path: 'dropdown',
        element: <Dropdown />
      },
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
