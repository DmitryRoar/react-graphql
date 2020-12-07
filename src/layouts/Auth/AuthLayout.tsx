import React from 'react'
import classes from './AuthLayout.module.scss'

export const AuthLayout: React.FC = ({children}) => {
  return (
    <div className={classes.Wrap}>
      {children}
    </div>
  )
}