import React from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.scss'
// import { useRoutes } from './routes'
// import babel from '@img/babel.jpg'
import {HomePage} from './pages/Home/HomePage'

export const App: React.FC = ({}) => {
  // const routes = useRoutes(true)

  return (
    <Switch>
      <Route path='/' component={HomePage} />
    </Switch>
  )
}