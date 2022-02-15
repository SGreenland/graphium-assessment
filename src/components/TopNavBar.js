import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function TopNavBar() {
  return (
    <div className="pb-2">
      <Navbar
        variant="dark"
        style={{ background: "#172A3B" }}
        expand="lg"
        className="px-3"
      >
        <Navbar.Brand href="/">Music-Teacher-Network</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link className="nav-link" to="/join">
              Join
            </Link>
            <Link className="nav-link" to="/find">
              Find
            </Link>
            <Link className="nav-link" to="/data">
              Data
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default TopNavBar;
