import React from 'react'
import './App.scss'

interface Props {
  text: string
}

export const App: React.FC<Props> = ({text}) => {
  return (
    <div>
      <p>Hello Webpack & React & {text}!</p>
    </div>
  )
}