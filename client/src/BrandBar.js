import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container'

export default function BrandBar() {
  return (
    <Navbar bg="light">
      <Container>
        <Navbar.Brand>Feedify</Navbar.Brand>
      </Container>
    </Navbar>
  )
}
