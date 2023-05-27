import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Root } from './pages/root'
import { ErrorPage } from './pages/errorPage'
import { PanelResize } from './pages/panelResize'
import { StepWizard } from './pages/stepWizard'

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
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
