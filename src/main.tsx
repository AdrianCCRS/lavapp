import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'

import './styles/global.css'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import { HeroUIProvider } from '@heroui/system'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HeroUIProvider>
        <AuthProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthProvider>
    </HeroUIProvider>
  </StrictMode>,
)
