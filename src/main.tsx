import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import './styles/global.css'
import Home from './routes/Home'
import MobileFitting from './routes/MobileFitting'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mobile-fitting" element={<MobileFitting />} />
      </Routes>
      <Analytics />
    </BrowserRouter>
  </React.StrictMode>
)
