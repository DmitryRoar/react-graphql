import {IAction, IUser} from '../../../interfaces'
import {HOME_ADD_USER, HOME_ERROR, HOME_GET_USERS, HOME_LOADING, HOME_REMOVE_USER} from '../types'

interface State {
  users: IUser[],
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
      return {...state, users: action.payload, loading: false, alert: ''}
    case HOME_LOADING:
      return {...state, loading: true, alert: ''}
    case HOME_ADD_USER:
      return {...state, users: [...state.users, action.payload], alert: ''}
    case HOME_ERROR:
      return {...state, alert: action.payload}
    case HOME_REMOVE_USER: 
      return {...state, alert: '', users: state.users.filter((user: IUser) => user._id !== action.payload)}
    default:
      return state
  }
}