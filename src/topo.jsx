import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import List from '@/routes/List';
import Add from '@/routes/Add';
import '../css/topo.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/"    element={<List />} />
        <Route path="/add" element={<Add />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
