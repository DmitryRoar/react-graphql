import {HOME_LOADING, HOME_GETUSERS} from '../types'
import axios from 'axios'
import { IUsers } from '../../interfaces'

const loading = () => ({
  type: HOME_LOADING
})

const getUsersAction = (payload: IUsers[]) => ({
  type: HOME_GETUSERS,
  payload
})

export const getUsers = () => async (dispatch: any) => {
  try {
    dispatch(loading())
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
    console.log('[HOME-ACTION:]', e)
  }
}
