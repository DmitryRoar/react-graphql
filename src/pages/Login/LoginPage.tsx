import React, {SyntheticEvent, useRef, useState} from 'react'
import {useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {authorize} from '../../store/actions/auth'

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

    emailRef.current.value = ''
    passwordRef.current.value = ''
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <label htmlFor='email'>Email:  
          <input type='email' id='email' ref={emailRef} placeholder='email' />
        </label>
        <label htmlFor='password'>Password: 
          <input 
            id='password' 
            type={passwordType ? 'password' : 'text'} 
            ref={passwordRef} 
            placeholder='password' 
          />
          <button 
            type='button' 
            onClick={() => setPasswordType(prev => !prev)}
          >
            eye
          </button>
        </label>
        <button type='submit'>Login</button>
      </form>

      <Link to='/sign-up' >SignUp</Link>
    </div>
  )
}