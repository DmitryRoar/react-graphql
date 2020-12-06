import axios from 'axios'
import {AUTH_AUTHORIZE, AUTH_LOGOUT} from '../types'


export const authorize = (email: string, password: string) => async (dispatch: any) => {
  try {
    const query = `
      mutation {
        login(email: "${email}", password: "${password}") {
          userToken
        }
      }
    `
    const {data} = await axios.post('http://localhost:3001/graphql', {query})
    console.log(data.data.login.userToken)
    dispatch({
      type: AUTH_AUTHORIZE
    })
  } catch (e) {
    console.log('[AUTH_AUTHORIZE]: ', e)
    localStorage.removeItem('token')
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
  localStorage.removeItem('token')
  return {
    type: AUTH_LOGOUT
  }
}