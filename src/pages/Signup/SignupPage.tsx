import React, {useState, useRef, SyntheticEvent} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

export const SignupPage: React.FC = () => {
  const [passwordType, setPasswordType] = useState(true)
  const emailRef: any = useRef('')
  const passwordRef: any = useRef('')
  const confrimPasswordRef: any = useRef('')

  const submitHandler = async (event: SyntheticEvent) => {
    event.preventDefault()

    const email = emailRef.current.value.trim()
    const password = passwordRef.current.value.trim()
    const confrimPassword = confrimPasswordRef.current.value.trim()
    
    if (!email && !password && !confrimPassword) return
    if (password !== confrimPassword) {
      throw new Error('Different password')
    } 

    const query = `
      mutation {
        register(email: "${email}", password: "${password}") {
          id
        }
      }
    `
    await axios.post('http://localhost:3001/graphql', {query})

    emailRef.current.value = ''
    passwordRef.current.value = ''
    confrimPasswordRef.current.value = ''
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <label htmlFor='email'>Email:  
          <input type='email' id='email' ref={emailRef} placeholder='login' />
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
        <label htmlFor='password'>Confirm Password: 
          <input 
            id='password' 
            type={passwordType ? 'password' : 'text'} 
            ref={confrimPasswordRef} 
            placeholder='password' 
          />
          <button 
            type='button' 
            onClick={() => setPasswordType(prev => !prev)}
          >
            eye
          </button>
        </label>
        <button type='submit'>SignUp</button>
      </form>

      <Link to='/login'>Login</Link>
    </div>
  )
}