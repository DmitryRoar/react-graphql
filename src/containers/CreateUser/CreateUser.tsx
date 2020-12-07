import React, {SyntheticEvent, useRef} from 'react'
import classes from './CreateUser.module.scss'

import {useDispatch} from 'react-redux'
import {addUser} from '../../store/actions/home'

export const CreateUser: React.FC = () => {
  const dispatch = useDispatch()
  const nameRef: any = useRef('')
  const ageRef: any = useRef('')
  
  const submitHandler = (event: SyntheticEvent) => {
    event.preventDefault()

    const name = nameRef.current.value
    const age = ageRef.current.value

    if (!age.trim() || !name.trim()) return

    dispatch(addUser(name, age))
    nameRef.current.value = ''
    ageRef.current.value = ''
  }

  return (
    <div>
      <form onSubmit={submitHandler} className={classes.From}>
        <div className={classes.FormInputWrap}>
          <label htmlFor='name'>Name: </label>
          <input ref={nameRef} id='name' type='text' />
        </div>
        <div className={classes.FormInputWrap}>
          <label htmlFor='age'>Age: </label>
          <input ref={ageRef} id='age' type='number' />
        </div>
        <button type='submit'>Create</button>
      </form>
    </div>
  )
}