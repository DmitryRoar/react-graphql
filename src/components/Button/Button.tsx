import React, {ReactNode} from 'react'
import classes from './Button.module.scss'

interface Props {
  children: ReactNode
  className?: string
  type?: 'button' | 'submit' | 'reset' 
  onClick?: any
}

export const Button: React.FC<Props> = ({type = 'button', className = 'default', children, onClick}) => {
  const classList = [classes.Button]
  if (className) {
    classList.push(classes[className])
  }
  
  return <button type={type} className={classList.join(' ')} onClick={onClick}>{children}</button>
}