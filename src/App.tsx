import React from 'react'
import {Route, Switch} from 'react-router-dom'
import './App.scss'
import { MainLayout } from './layouts/MainLayout'
// import { useRoutes } from './routes'
// import babel from '@img/babel.jpg'

export const App: React.FC = ({}) => {
  // const routes = useRoutes(true)

  return (
    <Switch>
      <Route path='/' component={MainLayout}/>
    </Switch>
  )
}