import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import LandingV1 from './proposals/v1/LandingV1.tsx'
import LandingV2 from './proposals/v2/LandingV2.tsx'
import LandingV3 from './proposals/v3/LandingV3.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/v1" element={<LandingV1 />} />
        <Route path="/v2" element={<LandingV2 />} />
        <Route path="/v3" element={<LandingV3 />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
