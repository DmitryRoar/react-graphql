import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import {authReducer} from './reducers/auth'
import {homeReducer} from './reducers/home'

const rootReducer = combineReducers({
  home: homeReducer,
  auth: authReducer
})

export default createStore(rootReducer, applyMiddleware(thunk))