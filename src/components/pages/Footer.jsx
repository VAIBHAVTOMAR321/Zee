import React from 'react'
import { Col, Container, Row, Button } from 'react-bootstrap'
import { FaFacebook, FaTwitter, FaLinkedin, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa'

function Footer() {
  return (
    <div>
          <footer className="footer-section pt-5">
        <Container>
          <Row className="pb-5">
            <Col lg={4} className="mb-4">
              <h3 className="footer-logo mb-3">
Zero Error Enterprises</h3>
              <p className="text-muted pe-lg-4">Zero Error Enterprises is Software Consulting and Development company based in dehradun. </p>
              <div className="footer-socials d-flex gap-3 mt-4">
                <a href="#"><FaFacebook /></a>
                <a href="#"><FaTwitter /></a>
                <a href="#"><FaLinkedin /></a>
              </div>
            </Col>
            <Col lg={4} md={6} className="mb-4">
              <h5 className="mb-4 fw-bold">Company Info</h5>
              <ul className="list-unstyled footer-contact-list">
                <li className="mb-3 small"><FaMapMarkerAlt className="text-primary me-2" /> Park Road -Near keshav Road Dehradun , Uttarakhand</li>
                <li className="mb-3 small"><FaPhone className="text-primary me-2" /> +91-9690000217</li>
                <li className="mb-3 small"><FaEnvelope className="text-primary me-2" /> info.zeeindia@gmail.in</li>
              </ul>
            </Col>
            <Col lg={4} md={6} className="mb-4">
              <h5 className="mb-4 fw-bold">Newsletter</h5>
              <p className="small text-muted mb-3">Subscribe to get latest business news and updates.</p>
              <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Email address" />
                <Button variant="primary">Join</Button>
              </div>
            </Col>
          </Row>
          <div className="footer-bottom border-top py-4 text-center">
            <p className="mb-0 small text-muted">&copy; 2024 Zee Zero Enterprises. All rights reserved.</p>
          </div>
        </Container>
      </footer>
    </div>
  )
}

export default Footer