import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import '@fontsource/source-sans-3/400.css'
import '@fontsource/source-sans-3/600.css'
import '@fontsource/cairo/400.css'
import '@fontsource/cairo/600.css'

import './i18n'
import './index.css'
import App from './App.tsx'
import { ApplicationFormProvider } from './context/ApplicationFormContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ApplicationFormProvider>
        <App />
      </ApplicationFormProvider>
    </BrowserRouter>
  </StrictMode>,
)
