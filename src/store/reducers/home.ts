import { IUsers } from '../../interfaces'
import { HOME_ADD_USER, HOME_GET_USERS, HOME_LOADING } from '../types'

interface IAction {
  type: string
  payload: any
}

interface State {
  users: IUsers[],
  isAuth: boolean,
  loading: boolean
}

const initialState: State = {
  users: [],
  isAuth: false,
  loading: false
}

export const homeReducer = (state = initialState, action: IAction): State  => {
  switch(action.type) {
    case HOME_GET_USERS:
      return {...state, users: action.payload, loading: false}
    case HOME_LOADING:
      return {...state, loading: true}
    case HOME_ADD_USER:
      return {...state, users: [{...action.payload}, ...state.users]}
    default:
      return state
  }
}