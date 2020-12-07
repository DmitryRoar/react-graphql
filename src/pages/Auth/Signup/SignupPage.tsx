import React, {useState, useRef, SyntheticEvent} from 'react'
import authClasses from '../Auth.module.scss'
import Logo from '@img/roar.png'

import {Link, useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import axios from 'axios'

import {alertError} from '../../../store/actions/auth'
import {Button} from '../../../components/Button/Button'

export const SignupPage: React.FC = () => {
  const [passwordType, setPasswordType] = useState(true)
  const [confrimPasswordType, setConfirmPasswordType] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfrimPassword] = useState(false)

  const emailRef: any = useRef('')
  const passwordRef: any = useRef('')
  const confrimPasswordRef: any = useRef('')

  const history = useHistory()
  const dispatch = useDispatch()

  const submitHandler = async (event: SyntheticEvent) => {
    event.preventDefault()

    const email = String(emailRef.current.value).trim()
    const password = String(passwordRef.current.value).trim()
    const confrimPassword = String(confrimPasswordRef.current.value).trim()
    
    if (!email || !password || !confrimPassword) return
    if (password !== confrimPassword) {
      dispatch(alertError('Different password'))
      throw new Error('Different password')
    }
    
    try {
      const query = `
        mutation {
          register(email: "${email}", password: "${password}") {
            userToken
          }
        }
      `
      await axios.post('http://localhost:3001/graphql', {query})
      history.push('/login')
    } catch (e) {
      dispatch(alertError('Email Exists'))
    }
  }

  const showPasswordHandler = () => {
    setPasswordType(prev => !prev)
    setShowPassword(prev => !prev)
  }

  const showConfirmPasswordHadnler = () => {
    setConfirmPasswordType(prev => !prev)
    setShowConfrimPassword(prev => !prev)
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
            <label htmlFor='confirmPassword'>Password: </label>
            <div className={authClasses.Input}>
              <input 
                id='confirmPassword' 
                type={confrimPasswordType ? 'password' : 'text'} 
                ref={confrimPasswordRef} 
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
              <Link to='/login'>LogIn</Link>
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}