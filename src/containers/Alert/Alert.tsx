import React from 'react'
import classes from './Alert.module.scss'

import {useSelector} from 'react-redux'

export const Alert: React.FC = ({children}) => {
  const homeError = useSelector((state: any) => state.home.alert)
  const authError = useSelector((state: any) => state.auth.alert)
  const message = homeError || authError

  return (
    <div>
      {
        message && (
        <div className={classes.Wrap}>
          <div className={classes.Alert}>{message}</div>
        </div>
        )
      }
      {children}
    </div>
  )
}