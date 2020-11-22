import React from 'react'
import ReactDOM from 'react-dom'
import {MainLayout} from './layouts/MainLayout'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './store/index'
import './index.scss'


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <MainLayout/>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)