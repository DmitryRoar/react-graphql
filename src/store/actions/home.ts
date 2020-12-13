import axios from 'axios'

import {HOME_LOADING, HOME_GET_USERS, HOME_ADD_USER, HOME_ERROR, HOME_REMOVE_USER} from '../types'

const loading = () => ({
  type: HOME_LOADING
})

const homeError = (payload = 'Something went wrong') => ({
  type: HOME_ERROR,
  payload
})

// const getUsersAction = (payload: IUser[]) => ({
  
// })

export const getUsers = (owner: string) => async (dispatch: any) => {
  dispatch(loading())
  try {
    const query = `
      mutation {
        getUsers(owner: "${owner}") {
          name age 
        }
      }
    ` 
    const {data} = await axios.post('http://localhost:3001/graphql', {query})
    dispatch({
      type: HOME_GET_USERS,
      payload: data.data.getUsers
    })
  } catch (e) {
    console.log('[HOME_GETUSERS:]', e)
    dispatch(homeError('Failed to load users. Try again'))
  }
}

// const addUserAction = (payload: any) => ({
//   type: HOME_ADD_USER,
//   payload
// })

export const addUser = (name: string, age: string, owner: string) => async (dispatch: any) => {
  try {
    const query = `
      mutation {
        addUser(name: "${name}", age: "${age}", owner: "${owner}") {
          name age
        }
      }
    `
    const {data} = await axios.post('http://localhost:3001/graphql', {query})
    dispatch({
      type: HOME_ADD_USER,
      payload: data.data.addUser
    })
  } catch (e) {
    console.log('[HOME_ADDUSER]: ', e)
    dispatch(homeError('Failed to add user. Try again'))
  }
}

export const removeAppUser = (owner: string) => async (dispatch: any) => {
  try {
    const query = `
    mutation {
      removeAppUser(owner: "${owner}") {
        _id
      }
    }
  `
    const {data} = await axios.post('http://localhost:3001/graphql', {query})
    dispatch({
      type: HOME_REMOVE_USER,
      payload: data.data.removeAppUser._id
    })
  } catch (e) {
    console.log('[HOME_REMOVE_APPUSER]', e)
    dispatch(homeError('Failed to delete user. Try again'))
  }
}