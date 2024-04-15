// import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Route from './Route.jsx'
import store from './redux/store.js'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Route />
  </Provider>,
)
