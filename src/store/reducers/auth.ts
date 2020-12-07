import {IAction} from '../../interfaces'
import {AUTH_AUTHORIZE, AUTH_LOGOUT, AUTH_ERROR} from '../types'

interface State {
  alert: string
  isAuth: boolean
}

const initialState: State = {
  alert: '',
  isAuth: false
}

export const authReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case AUTH_AUTHORIZE: 
      return {...state, isAuth: true, alert: ''}
    case AUTH_LOGOUT:
      return {...state, isAuth: false, alert: ''}
    case AUTH_ERROR:
      return {...state, alert: action.payload}
    default: 
      return state
  }
}