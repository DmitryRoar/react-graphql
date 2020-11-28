import {IAction} from '../../interfaces'
import { AUTH_AUTHORIZE } from '../types'

const initialState: any = {
  isAuth: false
}

export const authReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case AUTH_AUTHORIZE: 
      return {...state, isAuth: true}
    default: 
      return state
  }
}