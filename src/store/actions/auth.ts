import axios from 'axios'
import {AUTH_AUTHORIZE, AUTH_ERROR, AUTH_LOGOUT} from '../types'

interface IRegisterArgs {
  email: string
  password: string
  confirmPassword: string
}

export const alertError = (payload: string) => ({
  type: AUTH_ERROR,
  payload
})

export const authorize = (email: string, password: string, req: any) => async (dispatch: any) => {
  try {
    const query = `
      mutation {
        login(email: "${email}", password: "${password}", req: "${req}") {
          userId token tokenExpiration
        }
      }
    `
    const {data} = await axios.post('http://localhost:3001/graphql', {query})
    localStorage.setItem('user-token', data.data.login.token)
    localStorage.setItem('user-id', data.data.login.userId)
    localStorage.setItem('user-exp', data.data.login.tokenExpiration)
    dispatch({
      type: AUTH_AUTHORIZE
    })
  } catch (e) {
    console.log('[AUTH_AUTHORIZE]: ', e)
    dispatch(alertError('Wrong password'))
    localStorage.clear()
  }
}

export const checkAuthorization = () => (dispatch: any) => {
  if (localStorage.getItem('token')) {
    dispatch({
      type: AUTH_AUTHORIZE
    })
  } 
}

export const logout = () => {
  localStorage.clear()
  return {
    type: AUTH_LOGOUT
  }
}

export const register = (args: IRegisterArgs, history: any) => async (dispatch: any) => {
  try {
    if (!args.email || !args.password || !args.confirmPassword) return
    if (args.password !== args.confirmPassword) {
      dispatch(alertError('Different password'))
      throw new Error('Different password')
    }

    const query = `
      mutation {
        register(email: "${args.email}", password: "${args.password}") {
          userId
        }
      }
    `
    await axios.post('http://localhost:3001/graphql', {query})
    history.push('/login')
  } catch (e) {
    dispatch(alertError('Email Exists'))
  }
}