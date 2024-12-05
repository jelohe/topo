import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'
import "bootstrap/dist/css/bootstrap.min.css"
import Home from './routes/Home.jsx'
import AddSecret from './routes/AddSecret.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddSecret />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
