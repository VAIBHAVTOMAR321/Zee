import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import axios from 'axios';
import '../../contact.css';

const Contact = () => {
  // State to manage form data matching the API payload
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    mobile_number: '',
    message: ''
  });

  // State for handling submission status and errors
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback({ type: '', message: '' });

    try {
      const response = await axios.post(
        'https://mahadevaaya.com/zeeproject/zeeproject_backend/api/contact-us/',
        formData
      );

      // Check for successful response
      if (response.status === 200 || response.status === 201) {
        setFeedback({ type: 'success', message: 'Your message has been sent successfully!' });
        // Reset form fields
        setFormData({
          full_name: '',
          email: '',
          mobile_number: '',
          message: ''
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setFeedback({ 
        type: 'danger', 
        message: error.response?.data?.message || 'Failed to send message. Please try again later.' 
      });
    } finally {
      setLoading(false);
    }
  };

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
                  
                  {/* Display Success/Error Feedback */}
                  {feedback.message && (
                    <Alert variant={feedback.type} onClose={() => setFeedback({ type: '', message: '' })} dismissible>
                      {feedback.message}
                    </Alert>
                  )}

                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="formGroupName">
                          <Form.Label>Full Name</Form.Label>
                          <Form.Control 
                            type="text" 
                            name="full_name"
                            value={formData.full_name}
                            onChange={handleChange}
                            placeholder="Enter your full name" 
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                          <Form.Label>Email address</Form.Label>
                          <Form.Control 
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email" 
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    
                    <Form.Group className="mb-3" controlId="formGroupPhone">
                      <Form.Label>Mobile Number</Form.Label>
                      <Form.Control 
                        type="tel" 
                        name="mobile_number"
                        value={formData.mobile_number}
                        onChange={handleChange}
                        placeholder="Enter your mobile number" 
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGroupMessage">
                      <Form.Label>Message</Form.Label>
                      <Form.Control 
                        as="textarea" 
                        rows={5} 
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Your message" 
                        required
                      />
                    </Form.Group>
                    
                    <Button variant="primary" type="submit" className="px-4 py-2" disabled={loading}>
                      {loading ? 'Sending...' : 'Send Message'}
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