import React from 'react'
import ReactDOM from 'react-dom'
import { AliveScope } from 'react-activation'
// 引入重置样式
import '@/styles/index.scss'
import '@/i18n/configs'
import '@/mock'
import './index.css'
import rootStore from './redux'
import { Provider } from 'react-redux'
import App from './App'

ReactDOM.render(
    <AliveScope>
        <Provider store={rootStore.store}>
            <App />
        </Provider>
    </AliveScope>,
    document.getElementById('root')
)
