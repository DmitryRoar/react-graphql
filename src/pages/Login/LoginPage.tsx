import React, {useRef, useState} from 'react'

export const LoginPage: React.FC = () => {
  const [passwordType, setPasswordType] = useState(true)

  const loginRef: any = useRef('')
  const passwordRef: any = useRef('')

  return (
    <div>
      <form>
        <label htmlFor='email'>Email:  
          <input type='email' id='email' ref={loginRef} placeholder='login' />
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
    </div>
  )
}