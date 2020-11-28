import axios from 'axios'
import {AUTH_AUTHORIZE} from '../types'


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
    localStorage.setItem('token', data.data.login.userToken)
    dispatch({
      type: AUTH_AUTHORIZE
    })
  } catch (e) {
    console.log
  }
}

