import React, {SyntheticEvent, useRef, useState} from 'react'
import {useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import { Button } from '../../components/Button/Button'
import {authorize} from '../../store/actions/auth'

import classes from './LoginPage.module.scss'

export const LoginPage: React.FC = () => {
  const [passwordType, setPasswordType] = useState(true)
  const dispatch = useDispatch()

  const emailRef: any = useRef('')
  const passwordRef: any = useRef('')

  const submitHandler = (event: SyntheticEvent) => {
    event.preventDefault()

    const email = emailRef.current.value.trim()
    const password = passwordRef.current.value.trim()
    if (!email && !password) return

    dispatch(authorize(email, password))
  }

  return (
    <div>
      <div className={classes.Wrap}>
        <form onSubmit={submitHandler} className={classes.Form}>
          <div className={classes.FormEmail}>
            <label htmlFor='email'>Email: </label>
            <input type='email' id='email' ref={emailRef} placeholder='email' />
          </div>
          <label htmlFor='password'>Password: </label>
          <input 
              id='password' 
              type={passwordType ? 'password' : 'text'} 
              ref={passwordRef} 
              placeholder='password' 
            />
            <span
              onClick={() => setPasswordType(prev => !prev)}
              className={classes.showPassword}
            >
              eye
            </span>
            <Button className='danger' type='submit'>Login</Button>
        </form>

        <Link to='/sign-up' >SignUp</Link>
      </div>
    </div>
  )
}