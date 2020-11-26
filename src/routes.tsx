import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import {HomePage} from './pages/Home/HomePage'
import {LoginPage} from './pages/Login/LoginPage'
import {SignupPage} from './pages/Signup/SignupPage'

export const useRoutes: React.FC<any> = (isAuth: boolean) => {
  if (isAuth) {
    return (
      <Switch>
        <Route path='/' exact component={HomePage} />
        <Redirect to='/' />
      </Switch>
    )
  }

  return (
    <Switch>
      <Route path='/login' exact component={LoginPage} />
      <Route path='/sign-up' exact component={SignupPage} />
      <Redirect to='/login' />
    </Switch>
  )
}