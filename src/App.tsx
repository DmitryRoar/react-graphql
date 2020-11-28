import React from 'react'
import { useSelector } from 'react-redux'
import './App.scss'

import { useRoutes } from './routes'

export const App: React.FC = () => {
  const isAuth = useSelector((state: any) =>state.auth.isAuth)
  const routes = useRoutes(isAuth) 

  return (
    <div>
      {routes}
    </div>
  )
}