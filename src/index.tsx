import React from 'react'
import ReactDOM from 'react-dom'
import { MainLayout } from './layouts/MainLayout'
import {BrowserRouter} from 'react-router-dom'
import './index.scss'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <MainLayout/>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)