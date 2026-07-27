import React, { useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useLanguage } from "../all_login/LanguageContext";

import "../../assets/css/navbar.css";
import ukLogo from "../../assets/images/zeepnglogo.jpeg";

function NavBar() {
  const [expanded, setExpanded] = useState(false);
  const { language, setLanguage } = useLanguage();

  return (
    <Navbar expand="lg" expanded={expanded} onToggle={setExpanded} fixed="top" className="custom-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand-logo-wrapper">
          <img 
            src={ukLogo} 
            alt="UK Logo" 
            className="navbar-logo"
          />
          {/* <span className="brand-text">
            {language === 'hi' ? '' : 'Logo'}
          </span> */}
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" className="navbar-toggler-custom">
          <span className="toggler-line"></span>
          <span className="toggler-line"></span>
          <span className="toggler-line"></span>
        </Navbar.Toggle>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto nav-links">
            <Nav.Link as={Link} to="/" className="nav-link-item" onClick={() => setExpanded(false)}>
              <span className="nav-link-dot"></span>
              {language === 'hi' ? 'होम' : 'Home'}
            </Nav.Link>

            <NavDropdown title={<>
                <span className="nav-link-dot"></span>
                {language === 'hi' ? 'हमारे बारे में' : 'About Us'}
              </>} 
              id="about-us-dropdown" 
              className="nav-link-item"
            >
              <NavDropdown.Item as={Link} to="/about" onClick={() => setExpanded(false)}>Our Company</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Header>Our Team</NavDropdown.Header>
              <NavDropdown.Item as={Link} to="/team/Administrator" onClick={() => setExpanded(false)}>Administrator</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/team/Marketing" onClick={() => setExpanded(false)}>Marketing</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/team/Developer" onClick={() => setExpanded(false)}>Developer</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link as={Link} to="/services" className="nav-link-item" onClick={() => setExpanded(false)}>
              <span className="nav-link-dot"></span>
              {language === 'hi' ? 'सेवाएं' : 'Services'}
            </Nav.Link>

            <Nav.Link as={Link} to="/products" className="nav-link-item" onClick={() => setExpanded(false)}>
              <span className="nav-link-dot"></span>
              {language === 'hi' ? 'उत्पाद' : 'Products'}
            </Nav.Link>

            <Nav.Link as={Link} to="/projects" className="nav-link-item" onClick={() => setExpanded(false)}>
              <span className="nav-link-dot"></span>
              {language === 'hi' ? 'प्रोजेक्ट्स' : 'Projects'}
            </Nav.Link>

            <Nav.Link as={Link} to="/contact" className="nav-link-item" onClick={() => setExpanded(false)}>
              <span className="nav-link-dot"></span>
              {language === 'hi' ? 'संपर्क करें' : 'Contact'}
            </Nav.Link>

            {/* Desktop Language Toggle
            <Button 
              variant="outline-primary" 
              size="sm" 
              className="language-toggle-btn desktop-language-toggle"
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
            >
              <i className="bi bi-translate me-1"></i>
              {language === 'en' ? 'हिन्दी' : 'English'}
            </Button> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;