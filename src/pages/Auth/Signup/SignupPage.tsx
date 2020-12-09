import React, {useState, useRef, SyntheticEvent} from 'react'
import authClasses from '../Auth.module.scss'
import Logo from '@img/roar.png'

import {Link, useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'

import {register} from '../../../store/actions/auth'
import {Button} from '../../../components/Button/Button'

export const SignupPage: React.FC = () => {
  const [passwordType, setPasswordType] = useState(true)
  const [confirmPassword, setConfirmPasswordType] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const emailRef: any = useRef('')
  const passwordRef: any = useRef('')
  const confirmPasswordRef: any = useRef('')

  const history = useHistory()
  const dispatch = useDispatch()

  const submitHandler = async (event: SyntheticEvent) => {
    event.preventDefault()

    const email = String(emailRef.current.value).trim()
    const password = String(passwordRef.current.value).trim()
    const confirmPassword = String(confirmPasswordRef.current.value).trim()
    
    dispatch(register({email, password, confirmPassword}, history))
  }

  const showPasswordHandler = () => {
    setPasswordType(prev => !prev)
    setShowPassword(prev => !prev)
  }

  const showConfirmPasswordHadnler = () => {
    setConfirmPasswordType(prev => !prev)
    setShowConfirmPassword(prev => !prev)
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
          </div>

          <div className={authClasses.FormInputWrap}>
            <label htmlFor='confirmPassword'>Confirm Password: </label>
            <div className={authClasses.Input}>
              <input 
                id='confirmPassword' 
                type={confirmPassword ? 'password' : 'text'} 
                ref={confirmPasswordRef} 
                placeholder='password' 
              />
              {
                showConfirmPassword
                ? <i
                    onClick={showConfirmPasswordHadnler}
                    className={`far fa-eye ${authClasses.showPassword}`}
                  />
                : <i
                    onClick={showConfirmPasswordHadnler}
                    className={`far fa-eye-slash ${authClasses.showPassword}`}
                  />
              }
            </div>

            <Button type='submit'>SignUp</Button>
            <Button>
              <Link to='/login'>LogIn Page</Link>
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}