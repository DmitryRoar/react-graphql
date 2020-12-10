import React, {SyntheticEvent, useRef, useState} from 'react'
import authClasses from '../Auth.module.scss'
import Logo from '@img/roar.png'

import {useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {Button} from '../../../components/Button/Button'
import {authorize} from '../../../store/actions/auth'

export const LoginPage: React.FC = () => {
  const [passwordType, setPasswordType] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
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

  const showPasswordHandler = () => {
    setPasswordType(prev => !prev)
    setShowPassword(prev => !prev)
  }

  return (
    <div>
      <form onSubmit={submitHandler} className={authClasses.Form}>
        <div className={authClasses.Logo}>
          <img src={Logo} />
        </div>
        
        <div className={authClasses.WrapForInput}>

          <div className={authClasses.FormInputWrap}>
            <label htmlFor='email'>Email: </label>
            <input 
              type='email' 
              id='email' 
              ref={emailRef} 
              placeholder='email'
            />
          </div>
          <div className={authClasses.FormInputWrap}>
            <label htmlFor='password'>Password: </label>
            <div className={authClasses.Input}>
              <input 
                  id='password' 
                  type={passwordType ? 'password' : 'text'} 
                  ref={passwordRef} 
                  placeholder='password' 
                />
                {
                  showPassword
                  ? <i
                      onClick={showPasswordHandler}
                      className={`far fa-eye ${authClasses.showPassword}`}
                    />
                  : <i
                      onClick={showPasswordHandler}
                      className={`far fa-eye-slash ${authClasses.showPassword}`}
                    />
                }
            </div>

            <Button type='submit'>LogIn</Button>
            <Button>
              <Link to='/sign-up'>SignUp Page</Link>
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}