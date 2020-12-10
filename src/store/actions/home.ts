import axios from 'axios'

import {HOME_LOADING, HOME_GET_USERS, HOME_ADD_USER} from '../types'
import {IUsers} from '../../../interfaces'

const loading = () => ({
  type: HOME_LOADING
})

const getUsersAction = (payload: IUsers[]) => ({
  type: HOME_GET_USERS,
  payload
})

export const getUsers = () => async (dispatch: any) => {
  dispatch(loading())
  try {
    const query = `
      query {
        getUsers {
          name age
        }
      }
    ` 
    const {data} = await axios.post('http://localhost:3001/graphql', {query})
    dispatch(getUsersAction(data.data.getUsers))
  } catch (e) {
    console.log('[HOME_GETUSERS:]', e)
  }
}

const addUserAction = (payload: any) => ({
  type: HOME_ADD_USER,
  payload
})

export const addUser = (name: string, age: string) => async (dispatch: any) => {
  try {
    const query = `
      mutation {
        addUser(name: "${name}", age: "${age}") {
          name age
        }
      }
    `
    const {data} = await axios.post('http://localhost:3001/graphql', {query})
    dispatch(addUserAction(data.data.addUser))
  } catch (e) {
    console.log('[HOME_ADDUSER]: ', e)
  }
}