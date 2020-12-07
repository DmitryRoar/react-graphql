import React from 'react'
import classes from './UserList.module.scss'

interface Props {
  name: string
  age: string
}

export const UsersList: React.FC<Props> = ({name, age}) => {
  return (
    <li className={classes.List}>
      <span>Name/Age: </span>
      <strong>{name}, {age}</strong>
    </li>
  )
}