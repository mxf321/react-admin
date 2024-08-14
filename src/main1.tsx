import React from 'react'
import ReactDOM from 'react-dom/client'

// 引入重置样式
import '@/styles/index.scss'
import '@/i18n/configs'
import App from './App'
import '@/mock'
import './index.css'
import rootStore from './redux'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={rootStore.store}>
      <PersistGate persistor={rootStore.persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
