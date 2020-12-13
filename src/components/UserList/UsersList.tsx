import React from 'react'
import classes from './UserList.module.scss'

import {useDispatch} from 'react-redux'
import { getUsers, removeAppUser } from '../../store/actions/home'

interface Props {
  name: string
  age: string
}

export const UsersList: React.FC<Props> = ({name, age}) => {
  const dispatch = useDispatch()

  const removeHandler = () => {
    dispatch(removeAppUser(String(localStorage.getItem('user-id'))))
    dispatch(getUsers(String(localStorage.getItem('user-id'))))
  }

  return (
    <div className={classes.Wrap}>
      <li className={classes.List}>
        <span>Name/Age: </span>
        <strong>{name}, {age} </strong>
      </li>
      <div onClick={removeHandler}>
        <i className={`${classes.Times} fas fa-times`}/>
      </div>
    </div>
  )
}