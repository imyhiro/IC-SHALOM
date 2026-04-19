import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import LandingV1 from './proposals/v1/LandingV1.tsx'
import Landing from './proposals/v2/Landing.tsx'
import LandingV3 from './proposals/v3/LandingV3.tsx'
import LandingV5 from './proposals/v5/LandingV5.tsx'
import AdminPanel from './proposals/v2/AdminPanel.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/v1" element={<LandingV1 />} />
        <Route path="/v2" element={<Landing />} />
        <Route path="/v3" element={<LandingV3 />} />
        <Route path="/v4" element={<App />} />
        <Route path="/v5" element={<LandingV5 />} />
        <Route path="/marco/admin" element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
