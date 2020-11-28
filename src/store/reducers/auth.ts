import {IAction} from '../../interfaces'
import { AUTH_AUTHORIZE, AUTH_LOGOUT } from '../types'

const initialState: any = {
  isAuth: false
}

export const authReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case AUTH_AUTHORIZE: 
      return {...state, isAuth: true}
    case AUTH_LOGOUT:
      return {...state, isAuth: false}
    default: 
      return state
  }
}