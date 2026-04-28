import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Landing from './Landing.tsx'
import AdminPanel from './AdminPanel.tsx'
import LandingV1 from './versiones/v1/LandingV1.tsx'
import LandingV3 from './versiones/v3/LandingV3.tsx'
import LandingV5 from './versiones/v5/LandingV5.tsx'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/marco/admin" element={<AdminPanel />} />
        {/* Versiones anteriores */}
        <Route path="/v1" element={<LandingV1 />} />
        <Route path="/v3" element={<LandingV3 />} />
        <Route path="/v4" element={<App />} />
        <Route path="/v5" element={<LandingV5 />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
