import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/inter'
import '@fontsource-variable/bricolage-grotesque'
import '@fontsource/hind-siliguri/400.css'
import '@fontsource/hind-siliguri/500.css'
import '@fontsource/hind-siliguri/600.css'
import '@fontsource/hind-siliguri/700.css'
import './index.css'
import App from './App.jsx'
import { loadBrandFont } from './lib/brandFont'
import { LocaleProvider } from './lib/LocaleProvider.jsx'

// Scroll-reveal styles only apply once JavaScript is running, so content is never hidden without it.
document.documentElement.classList.add('reveal-ready')
loadBrandFont()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LocaleProvider>
      <App />
    </LocaleProvider>
  </StrictMode>,
)
