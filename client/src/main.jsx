// import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Route from './Route.jsx'
import { store, persistor } from './redux/store.js'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
     <Route />
    </PersistGate>
  </Provider>,
)
