import React, {SyntheticEvent, useRef} from 'react'
import './CreataeUser.scss'
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
      <form onSubmit={submitHandler}>
        <label htmlFor='name'>Name: </label>
        <input ref={nameRef} id='name' type='text' />
        <label htmlFor='age'>Age: </label>
        <input ref={ageRef} id='age' type='number' />
        <button type='submit'>Create</button>
      </form>
    </div>
  )
}