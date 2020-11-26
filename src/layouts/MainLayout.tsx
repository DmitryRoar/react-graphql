import React from 'react'
import './MainLayout.scss'

import {HomePage} from '../pages/Home/HomePage'

export const MainLayout: React.FC = () => {
  return (
    <div className='Main'>
      <HomePage />
    </div>
  )
}