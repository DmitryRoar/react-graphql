import React from 'react'
import './MainLayout.scss'

export const MainLayout: React.FC = ({children}) => {
  return (
    <div className='Main'>
      {children}
    </div>
  )
}