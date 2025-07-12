// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.tsx'
import store from './slices/index.ts'

// при StrictMode два раза всё рендерится и вызывается

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <App />
    </Provider>,
)
