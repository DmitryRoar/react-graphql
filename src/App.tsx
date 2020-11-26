import React from 'react'
import './App.scss'

import { useRoutes } from './routes'

export const App: React.FC = () => {
  const routes = useRoutes(false)

  return (
    <div>
      {routes}
    </div>
  )
}