import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import { AuthLayout } from './layouts/Auth/AuthLayout'
import { MainLayout } from './layouts/Main/MainLayout'

import {HomePage} from './pages/Home/HomePage'
import {LoginPage} from './pages/Auth/Login/LoginPage'
import {SignupPage} from './pages/Auth/Signup/SignupPage'

export const useRoutes: React.FC<any> = (isAuth: boolean) => {
  if (isAuth) {
    return (
      <MainLayout>
        <Switch>
          <Route path='/' exact component={HomePage} />
          <Redirect to='/' />
        </Switch>
      </MainLayout>
    )
  }

  return (
    <AuthLayout>
      <Switch>
        <Route path='/login' exact component={LoginPage} />
        <Route path='/sign-up' exact component={SignupPage} />
        <Redirect to='/login' />
      </Switch>
    </AuthLayout>
  )
}