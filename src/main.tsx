import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './global/styles/patterns.css'
import App from './App.tsx'
import { DisplaySettingsProvider } from './global/contexts/DisplayContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DisplaySettingsProvider>
      <App />
    </DisplaySettingsProvider>
  </StrictMode>,
)
