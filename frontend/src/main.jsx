import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from '../src/redux/store.js'
import { Toaster } from './components/ui/sonner'
import ThemeProvider from './components/themeProvider.jsx'
import { PersistGate } from 'redux-persist/integration/react'
import persistStore from 'redux-persist/es/persistStore'
const persister = persistStore(store)
createRoot(document.getElementById('root')).render(

  <StrictMode>
    {/* <Provider store={store}>
      <App />
     <Toaster/>
     <Provider/> */}
    <Provider store={store}>
      <PersistGate loading={null} persistor={persister}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </PersistGate>
      <Toaster />
    </Provider>

  </StrictMode>,
)
