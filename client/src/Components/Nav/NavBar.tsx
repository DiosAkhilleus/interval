import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import AuthNav from './AuthNav';

interface Props {}

const NavBar = (props: Props) => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Interval</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/profile">Profile</Nav.Link>
            <Nav.Link href="/createpost">Create Post</Nav.Link>
            <NavDropdown style={{userSelect: 'none'}} title="Other" id="basic-nav-dropdown">
              <NavDropdown.Item href="/users/search">Find Users</NavDropdown.Item>
              <NavDropdown.Item href="/posts/search">
                Search for Posts
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/settings">
                Your Settings
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className="justify-content-end">
            <Nav.Item>
              <AuthNav />
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
