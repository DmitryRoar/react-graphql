import React, {useEffect} from 'react'
import './App.scss'

import {useDispatch, useSelector} from 'react-redux'
import {useRoutes} from './routes'

import {checkAuthorization} from './store/actions/auth'
import { Alert } from './containers/Alert/Alert'

export const App: React.FC = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector((state: any) =>state.auth.isAuth)
  const routes = useRoutes(isAuth) 
  
  useEffect(() => {
    dispatch(checkAuthorization())
  }, [])

  return (
    <div>
      <Alert>
        {routes}
      </Alert>
    </div>
  )
}