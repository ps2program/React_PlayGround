import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
// import App from './App_useFetch.jsx'
// import App from './App_useAuth.jsx'
// import App from './App_searchComponent.jsx'
// import App from './App_useLocalStorage.jsx'
// import App from './App_useDarkMode.jsx'
// import App from './App_InfiniteScrollComponent.jsx'
// import App from './App_useWebSocket.jsx'
// import App from './App_useGeoLocation.jsx'
// import App from './App_usegRPC.jsx'
import App from './App_useSocket.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
