import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import ListCodes from './routes/ListCodes'
import AddSecret from './routes/AddSecret'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/"    element={<ListCodes />} />
        <Route path="/add" element={<AddSecret />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
