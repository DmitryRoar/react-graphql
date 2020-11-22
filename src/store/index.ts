import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import {homeReducer} from './reducers/home'

const rootReducer = combineReducers({
  home: homeReducer
})

export default createStore(rootReducer, applyMiddleware(thunk))