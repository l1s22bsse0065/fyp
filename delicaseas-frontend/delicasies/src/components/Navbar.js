import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import logo from '../assets/images/signup.jpg'; // replace with your logo

const NavbarComponent = () => {
  return (
    <Navbar expand="lg" className="py-3" bg="light">
      <Container>
        <Navbar.Brand href="/">
          <img src={logo} alt="logo" height="40" />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="mx-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/recipes">Recipes</Nav.Link>
            <Nav.Link href="/cooking-tips">Cooking Tips</Nav.Link>
            <Nav.Link href="/about">About Us</Nav.Link>
          </Nav>
          <div className="d-flex gap-2">
            <Button variant="outline-dark">Cart</Button>
            <Button variant="dark">Subscribe</Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
