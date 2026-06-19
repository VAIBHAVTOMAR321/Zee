import React, { useState, useEffect } from "react";
import { Container, Row, Col, Carousel, Card, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import { 
  FaRocket, FaEye, FaBriefcase, FaUserCheck, 
  FaChartLine, FaQuoteLeft, FaFacebook, FaTwitter, FaLinkedin, 
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaGlobe, FaChevronRight,
  FaCube, FaTools, FaServer, FaIndustry, FaArrowUp
} from 'react-icons/fa';
import "../../assets/css/home.css";

function Home() {
  const [loading, setLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [pageData, setPageData] = useState({
    heroSlides: [],
    aboutImage: "",
    services: [],
    products: [],
    projects: []
  });

  useEffect(() => {
    const fetchHomeContent = async () => {
      try {
        // In a real scenario, you would fetch from your API:
        // const response = await axios.get('/api/v1/company/assets');
        
        // Simulated fetching delay
        const mockData = {
          heroSlides: [
            {
              id: 1,
              title: "Zee Zero Enterprises",
              subtitle: "Empowering Businesses with Strategic Innovation and Global Excellence.",
              image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070",
              btnText: "Explore Services"
            },
            {
              id: 2,
              title: "Visionary Leadership",
              subtitle: "Pioneering tomorrow's business solutions today with integrity and precision.",
              image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2069",
              btnText: "Contact Us Today"
            }
          ],
          aboutImage: "https://images.unsplash.com/photo-1522071823991-b5182991e38f?auto=format&fit=crop&q=80&w=2070",
          services: [
            { title: "Strategic Planning", icon: <FaChartLine />, desc: "Tailored strategies to navigate market complexities and drive profitability." },
            { title: "Project Management", icon: <FaBriefcase />, desc: "End-to-end delivery of complex industrial and corporate projects." },
            { title: "Digital Transformation", icon: <FaGlobe />, desc: "Modernizing your business with cutting-edge digital infrastructure." },
            { title: "HR & Talent Management", icon: <FaUserCheck />, desc: "Optimizing your workforce through strategic recruitment and training." }
          ],
          products: [
            { title: "Enterprise Software", icon: <FaCube />, desc: "Robust ERP and CRM solutions tailored for large-scale operations.", img: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=2070" },
            { title: "Industrial Equipment", icon: <FaIndustry />, desc: "High-performance machinery and tools for modern manufacturing.", img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2070" },
            { title: "Network Hardware", icon: <FaServer />, desc: "Secure and scalable server solutions for global data management.", img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&q=80&w=2070" },
            { title: "Smart Safety Systems", icon: <FaTools />, desc: "Advanced AI-driven security and safety monitoring products.", img: "https://images.unsplash.com/photo-1557597774-9d2739f85a94?auto=format&fit=crop&q=80&w=2070" }
          ],
          projects: [
            { title: "Metro Infrastructure", cat: "Engineering", img: "https://images.unsplash.com/photo-1454165833767-027ff8af996a?auto=format&fit=crop&q=80&w=2070" },
            { title: "Sustainable Energy", cat: "Green Tech", img: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=2070" },
            { title: "Corporate HQ", cat: "Architecture", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070" }
          ]
        };

        setPageData(mockData);
      } catch (err) {
        console.error("Failed to fetch company images", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeContent();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleImageError = (e) => {
    e.target.src = "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000"; // Professional corporate fallback
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div className="home-wrapper">
      {/* Hero Carousel Section */}
      <section className="hero-section">
        <Carousel fade interval={6000} controls={true} indicators={true}>
          {pageData.heroSlides.map((slide) => (
            <Carousel.Item key={slide.id} className="hero-item">
              <div className="hero-overlay"></div>
              <img
                className="d-block w-100 hero-img"
                src={slide.image}
                alt={slide.title}
                onError={handleImageError}
              />
              <Carousel.Caption className="hero-caption">
                <h1 className="animate-fade-in-down">{slide.title}</h1>
                <p className="animate-fade-in-up">{slide.subtitle}</p>
                <div className="hero-btns animate-fade-in-up">
                  <Button className="btn-premium">{slide.btnText}</Button>
                </div>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </section>

      {/* About Us Section */}
      <section id="about" className="about-section py-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-4 mb-lg-0">
              <div className="section-header text-start">
                <span className="subtitle">ABOUT OUR COMPANY</span>
                <h2 className="section-title">Redefining Corporate Standards</h2>
                <div className="title-bar"></div>
              </div>
              <p className="lead fw-bold color-primary">Zee Zero Enterprises is built on a foundation of trust, innovation, and an unwavering commitment to our clients' success.</p>
              <p className="text-muted">We provide a comprehensive suite of business solutions designed to streamline operations and foster sustainable growth in an ever-evolving global market.</p>
              <Row className="mt-4">
                <Col md={6} className="mb-3">
                  <div className="about-card h-100">
                    <FaRocket className="about-icon" />
                    <h4>Our Mission</h4>
                    <p className="small text-muted">To deliver unparalleled value through strategic consulting and technological innovation.</p>
                  </div>
                </Col>
                <Col md={6} className="mb-3">
                  <div className="about-card h-100">
                    <FaEye className="about-icon" />
                    <h4>Our Vision</h4>
                    <p className="small text-muted">To be the global benchmark for professional excellence and ethical business practices.</p>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col lg={6} className="ps-lg-5 text-center">
              <div className="about-image-stack">
                <img 
                  src={pageData.aboutImage} 
                  alt="About Zee Zero" 
                  className="img-fluid rounded-4 shadow-lg main-img" 
                  onError={handleImageError}
                />
                <div className="experience-badge animate-float">
                  <span className="years">15+</span>
                  <span className="text">Years of Excellence</span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Our Services Section */}
      <section id="services" className="services-section py-5 bg-light">
        <Container>
          <div className="section-header text-center mb-5">
            <span className="subtitle">EXPERT SOLUTIONS</span>
            <h2 className="section-title">Our Premium Services</h2>
            <div className="title-bar mx-auto"></div>
          </div>
          <Row>
            {pageData.services.map((service, idx) => (
              <Col md={6} lg={3} key={idx} className="mb-4">
                <Card className="service-card border-0 shadow-sm h-100 text-center p-3">
                  <Card.Body>
                    <div className="service-icon-box mb-4">{service.icon}</div>
                    <h4 className="fw-bold mb-3">{service.title}</h4>
                    <p className="text-muted small mb-0">{service.desc}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Our Products Section */}
      <section id="products" className="products-section py-5">
        <Container>
          <div className="section-header text-center mb-5">
            <span className="subtitle">QUALITY HARDWARE & SOFTWARE</span>
            <h2 className="section-title">Our Featured Products</h2>
            <div className="title-bar mx-auto"></div>
          </div>
          <Row>
            {pageData.products.map((product, idx) => (
              <Col md={6} lg={3} key={idx} className="mb-4">
                <Card className="product-card border-0 shadow-sm h-100 text-center p-3">
                  <div className="product-img-wrapper">
                    <img 
                      src={product.img} 
                      alt={product.title} 
                      className="img-fluid" 
                      onError={handleImageError}
                    />
                  </div>
                  <div className="product-content-overlay">
                    <div className="product-icon-box">{product.icon}</div>
                    <h4 className="product-title">{product.title}</h4>
                    <p className="product-desc">{product.desc}</p>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects-section py-5">
        <Container>
          <div className="section-header text-center mb-5">
            <span className="subtitle">LATEST PROJECTS</span>
            <h2 className="section-title">Showcasing Our Work</h2>
            <div className="title-bar mx-auto"></div>
          </div>
          <Row className="g-4">
            {pageData.projects.map((p, i) => (
              <Col md={4} key={i}>
                <div className="project-card overflow-hidden rounded-3 shadow-sm">
                  <div className="project-img-container">
                    <img 
                      src={p.img} 
                      alt={p.title} 
                      className="img-fluid" 
                      onError={handleImageError}
                    />
                    <div className="project-hover-info p-4">
                      <h5 className="text-white mb-1">{p.title}</h5>
                      <p className="text-white-50 small mb-0">{p.cat}</p>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Why Choose Us Section with Counters */}
      <section className="why-us-section py-5 text-white">
        <Container>
          <Row className="text-center align-items-center">
            <Col md={3} sm={6} className="mb-4 mb-md-0">
              <div className="counter-item">
                <h2 className="counter-val">250+</h2>
                <p className="mb-0">Global Partners</p>
              </div>
            </Col>
            <Col md={3} sm={6} className="mb-4 mb-md-0">
              <div className="counter-item">
                <h2 className="counter-val">1.2K</h2>
                <p className="mb-0">Projects Finished</p>
              </div>
            </Col>
            <Col md={3} sm={6} className="mb-4 mb-md-0">
              <div className="counter-item">
                <h2 className="counter-val">99%</h2>
                <p className="mb-0">Happy Clients</p>
              </div>
            </Col>
            <Col md={3} sm={6} className="mb-4 mb-md-0">
              <div className="counter-item">
                <h2 className="counter-val">45+</h2>
                <p className="mb-0">Awards Won</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="contact-cta-section py-5">
        <Container>
          <div className="cta-box text-center p-5 rounded-4 shadow">
            <h2 className="mb-3 text-white">Ready to Accelerate Your Business Growth?</h2>
            <p className="mb-4 text-white opacity-75">Connect with our experts today for a personalized consultation.</p>
            <Button className="btn-premium px-5 py-3">Inquire Now <FaChevronRight className="ms-2" /></Button>
          </div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="footer-section pt-5">
        <Container>
          <Row className="pb-5">
            <Col lg={4} className="mb-4">
              <h3 className="footer-logo mb-3">Zee Zero</h3>
              <p className="text-muted pe-lg-4">Leading the path in corporate excellence and innovation. Providing professional services across the globe with unmatched quality.</p>
              <div className="footer-socials d-flex gap-3 mt-4">
                <a href="#"><FaFacebook /></a>
                <a href="#"><FaTwitter /></a>
                <a href="#"><FaLinkedin /></a>
              </div>
            </Col>
            <Col lg={4} md={6} className="mb-4">
              <h5 className="mb-4 fw-bold">Company Info</h5>
              <ul className="list-unstyled footer-contact-list">
                <li className="mb-3 small"><FaMapMarkerAlt className="text-primary me-2" /> 789 Corporate Plaza, Financial District, NY</li>
                <li className="mb-3 small"><FaPhone className="text-primary me-2" /> +1 (800) ZEE-ZERO</li>
                <li className="mb-3 small"><FaEnvelope className="text-primary me-2" /> contact@zeezero.com</li>
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

      {/* Scroll To Top Button */}
      <button 
        className={`scroll-to-top ${showScrollTop ? 'visible' : ''}`} 
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <FaArrowUp />
      </button>
    </div>
  );
}

export default Home;