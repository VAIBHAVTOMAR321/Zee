import React from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import '../../contact.css';

const Contact = () => {
  return (
    <div className="contact-page">
      <header className="contact-hero-section text-center text-white py-5">
        <Container>
          <h1 className="display-5 fw-bold">Contact Us</h1>
          <p className="lead">
            We're here to help and answer any question you might have.
          </p>
        </Container>
      </header>

      <section className="py-5">
        <Container>
          <Row>
            <Col lg={8} className="mb-4 mb-lg-0">
              <Card className="border-0 shadow-sm">
                <Card.Body className="p-4 p-md-5">
                  <h3 className="fw-bold mb-4">Send us a Message</h3>
                  <Form>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="formGroupName">
                          <Form.Label>Name</Form.Label>
                          <Form.Control type="text" placeholder="Enter your name" />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                          <Form.Label>Email address</Form.Label>
                          <Form.Control type="email" placeholder="Enter your email" />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Form.Group className="mb-3" controlId="formGroupSubject">
                      <Form.Label>Subject</Form.Label>
                      <Form.Control type="text" placeholder="Subject" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupMessage">
                      <Form.Label>Message</Form.Label>
                      <Form.Control as="textarea" rows={5} placeholder="Your message" />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="px-4 py-2">
                      Send Message
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4}>
              <Card className="border-0 shadow-sm h-100">
                <Card.Body className="p-4 p-md-5">
                  <h3 className="fw-bold mb-4">Contact Information</h3>
                  <ul className="list-unstyled">
                    <li className="d-flex align-items-start mb-4">
                      <FaMapMarkerAlt size={20} className="text-primary me-3 mt-1" />
                      <div>
                        <strong>Address:</strong>
                        <p className="text-muted mb-0">789 Corporate Plaza, Financial District, NY</p>
                      </div>
                    </li>
                    <li className="d-flex align-items-start mb-4">
                      <FaPhone size={20} className="text-primary me-3 mt-1" />
                      <div>
                        <strong>Phone:</strong>
                        <p className="text-muted mb-0">+1 (800) ZEE-ZERO</p>
                      </div>
                    </li>
                    <li className="d-flex align-items-start">
                      <FaEnvelope size={20} className="text-primary me-3 mt-1" />
                      <div>
                        <strong>Email:</strong>
                        <p className="text-muted mb-0">contact@zeezero.com</p>
                      </div>
                    </li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Contact;