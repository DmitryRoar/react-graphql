import React from 'react'
import './App.scss'
import babel from '@img/babel.jpg'

interface Props {
  text: string
}

export const App: React.FC<Props> = ({text}) => {
  return (
    <div>
      <p>Hello Webpack & React & {text}!</p>
      <img src={babel} />
    </div>
  )
}