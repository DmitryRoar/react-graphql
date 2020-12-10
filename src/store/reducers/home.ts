import {IAction, IUsers} from '../../../interfaces'
import {HOME_ADD_USER, HOME_GET_USERS, HOME_LOADING} from '../types'

interface State {
  users: IUsers[],
  isAuth: boolean,
  loading: boolean,
  alert: string
}

const initialState: State = {
  users: [],
  alert: '',
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
      return {...state, users: [...state.users, action.payload]}
    default:
      return state
  }
}