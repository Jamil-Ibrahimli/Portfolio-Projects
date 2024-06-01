import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './Redux/Store.ts'
import { GoogleOAuthProvider } from '@react-oauth/google'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
          <GoogleOAuthProvider clientId='870546377206-fp4oc6huln305ru9m7j4vdlrr59rgm6d.apps.googleusercontent.com'>

      <Provider store={store} >

        <App />

      </Provider>
      </GoogleOAuthProvider>
    </React.StrictMode>,

)


// 961536372894-f0uctrttfjmp6ukt2v9bc2tv7r89qc8o.apps.googleusercontent.com