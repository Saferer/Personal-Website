import React from "react"
import { Col, Navbar, Nav } from "react-bootstrap"
import HamburgerMenu from "../img/HamburgerMenu.svg"

const menuButtonStyle = {
  width: "45px",
  height: "45px",
}

export default function PageContainer({ children }) {
  return (
    <div style={{ height: "100vh" }}>
      <Navbar className="navbar-global" expand="lg">
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          style={{ border: "none", padding: "0px" }}
        >
          <span>
            <img src={HamburgerMenu} style={menuButtonStyle}></img>
          </span>
        </Navbar.Toggle>
        {/* <Navbar.Brand href="/" style={{ margin: 0 }}>
          <img src={Blu} height="50px" width="50px" />
        </Navbar.Brand> */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="nav-global">
            <Nav.Link href="/" className="navlink-global">
              Saferer
            </Nav.Link>
            <Nav.Link href="/dango" className="navlink-global">
              Dango
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {children}
    </div>
  )
}
