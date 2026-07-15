import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './styles/global.css'
import Home from './routes/Home'
import MobileFitting from './routes/MobileFitting'
import { inject } from '@vercel/analytics'
import { SpeedInsights } from '@vercel/speed-insights/react'
inject()


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mobile-fitting" element={<MobileFitting />} />
      </Routes>
    </BrowserRouter>
    <SpeedInsights />
  </React.StrictMode>
)
