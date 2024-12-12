import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import ListPage from './routes/ListPage'
import AddPage from './routes/AddPage'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import 'bootstrap/dist/css/bootstrap.min.css';

function HeaderNavbar() {
  return (
    <Navbar expand="lg">
      <Container >
        <Navbar.Brand href="/">Topo Authenticator</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">My codes</Nav.Link>
            <Nav.Link href="/add">Add a new one</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HeaderNavbar />
    <BrowserRouter>
      <Routes>
        <Route path="/"    element={<ListPage />} />
        <Route path="/add" element={<AddPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
