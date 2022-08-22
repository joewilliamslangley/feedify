import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container'
import './BrandBar.css'

export default function BrandBar() {
  return (
    <Navbar className="brand-bar">
      <Container>
        <Navbar.Brand>Feedify</Navbar.Brand>
      </Container>
    </Navbar>
  )
}
