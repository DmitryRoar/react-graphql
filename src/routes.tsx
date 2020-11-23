import React from 'react'
import {Switch, Route} from 'react-router-dom'

import {HomePage} from './pages/Home/HomePage'

interface Props {
  isAuth: boolean
}

export const useRoutes: React.FC<Props> = (isAuth) => {
  if (isAuth) {
    return (
      <Switch>
        <Route path='/' component={HomePage} />
      </Switch>
    )
  }

  return (
    <Switch>
      <Route/>
    </Switch>
  )
}