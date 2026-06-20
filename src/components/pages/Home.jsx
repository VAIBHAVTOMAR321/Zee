import React, { useState, useEffect } from "react";
import { Container, Row, Col, Carousel, Card, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from 'axios';
import { 
  FaRocket, FaEye, FaBriefcase, FaUserCheck, 
  FaChartLine, FaQuoteLeft, FaFacebook, FaTwitter, FaLinkedin, 
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaGlobe, FaChevronRight,
  FaCube, FaTools, FaServer, FaIndustry, FaArrowUp
} from 'react-icons/fa';
import "../../assets/css/home.css";
import Services from "./Services";

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

  const MEDIA_BASE_URL = "https://mahadevaaya.com/zeeproject/zeeproject_backend";

  useEffect(() => {
    const fetchHomeContent = async () => {
      try {
        // In a real scenario, you would fetch from your API:
        // const response = await axios.get('/api/v1/company/assets');
        
        // Simulated fetching delay
        const [servicesRes, productsRes, projectsRes] = await Promise.all([
          axios.get("https://mahadevaaya.com/zeeproject/zeeproject_backend/api/zee-service/"),
          axios.get("https://mahadevaaya.com/zeeproject/zeeproject_backend/api/zee-product/"),
          axios.get("https://mahadevaaya.com/zeeproject/zeeproject_backend/api/zee-project/")
        ]);

        setPageData({
          heroSlides: [
             {
               id: 1,
               title: "Zero Error Enterpries",
               subtitle: "Creates custom software solutions for businesses and individuals so that they can show case their business and help increaseproductivity,reduce costs, and improve efficiency.",
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
          services: servicesRes.data.success ? servicesRes.data.data : [],
          products: productsRes.data.success ? productsRes.data.data : [],
          projects: projectsRes.data.success ? projectsRes.data.data : [],
        });
      } catch (err) {
        console.error("Failed to fetch home page data", err);
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
                  <Link to={slide.btnText === "Explore Services" ? "/services" : "/contact"} className="btn btn-premium">{slide.btnText}</Link>
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
            <Col lg={6} className="mb-4 mb-lg-0 about-style">
              <div className="section-header text-start">
                <span className="subtitle">ABOUT OUR COMPANY</span>
                {/* <h2 className="">Zero Error Enterprises</h2> */}
                <div className="title-bar"></div>
              </div>
               <p className="lead fw-bold color-primary">Delivering customized,scalable,and technology-driven solutions to enhance productivity, efficiency, and business growth.</p> 
              <p className="text-muted">Zero Error Enterprises is Software Consulting and Development company based in dehradun.Company was established in 2020 with goal of custom software solutions for businesses and individuals so that they can show case their business and help increase productivity,reduce costs,and improve efficiency. Our Comapny Employ is highly skilled developers, designers, and engineers who are constantly learning and staying up-to-date with the latest technology trends and advancements.
Our team has develop too many application according to client needs.</p>
              <Row className="mt-4">
                <Col md={6} className="mb-3">
                  <div className="about-card h-100">
                    <FaRocket className="about-icon" />
                    <h4>Our Vision</h4>
                    <p className="small text-muted">To become a leading software development company that is recognized for its innovative and user friendly software solutions, exceptional customer service, and dedication to the professional growth and well-being ofits employees.</p>
                  </div>
                </Col>
                <Col md={6} className="mb-3">
                  <div className="about-card h-100">
                    <FaEye className="about-icon" />
                    <h4>Our Mission</h4>
                    <p className="small text-muted">To provide high-quality software development services to our clients while fostering a culture of creativity,collaboration, and continuous learning among our employees.</p>
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

      <section id="services" className="services-section py-5 bg-light">
        <Services showBanner={false} />
      </section>

      {/* Our Products Section */}
      <section id="products" className="products-section py-5">
        <Container>
          <div className="section-header  mb-5">
            <span className="subtitle">QUALITY HARDWARE & SOFTWARE</span>
            <h2 className="">Our Featured Products</h2>
            <div className="title-bar mx-auto"></div>
          </div>
          <Row>
            {pageData.products.map((product, idx) => (
              <Col md={6} lg={3} key={idx} className="mb-4 about-style">
                <Card className="product-card h-100 border-0 shadow-sm p-3">
                  <div className="product-img-wrapper">
                    <img 
                      src={product.prod_img ? `${MEDIA_BASE_URL}${product.prod_img}` : "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=2070"} 
                      alt={product.prod_title} 
                      className="img-fluid" 
                      onError={handleImageError}
                    />
                  </div>
                  <Card.Body className="text-center">
                    {/* <div className="product-icon-box mb-3"><FaCube /></div> */}
                    <Card.Title className="product-title">{product.prod_title}</Card.Title>
                    <Card.Text className="product-desc text-muted">{product.prod_desc}</Card.Text>
                  </Card.Body>
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
            <h2 className="">Showcasing Our Work</h2>
            <div className="title-bar mx-auto"></div>
          </div>
          <Row className="g-4">
            {pageData.projects.map((p, i) => (
              <Col md={4} key={p.id}>
                <div className="project-card overflow-hidden rounded-3 shadow-sm">
                  <div className="project-img-container">
                    <img 
                      src={p.pro_img ? `${MEDIA_BASE_URL}${p.pro_img}` : "https://images.unsplash.com/photo-1454165833767-027ff8af996a?auto=format&fit=crop&q=80&w=2070"} 
                      alt={p.pro_title} 
                      className="img-fluid" 
                      onError={handleImageError}
                    />
                    <div className="project-hover-info p-4">
                      <h5 className="text-white mb-1">{p.pro_title}</h5>
                      <p className="text-white-50 small mb-0">{p.pro_desc}</p>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

     

      {/* Why Choose Us Section */}
      <section id="why-us" className="why-us-section py-5 bg-light">
        <Container>
          <div className="section-header why text-center mb-5">
            <span className="subtitle">WHY CHOOSE US</span>
            <h2 className="">Why Us?</h2>
            <div className="title-bar mx-auto"></div>
              <p className="text-center mb-4">
            We have a team of software professionals that specialize in each of the unique skills that are necessary for a strong internet presence. Our aim is to provide the best services through its extensive experience and knowledge. With its examined processes this company makes recommendations to maximize a client's profitability within efficient time management.
          </p>
          </div>
        
          <Row className="g-4">
            <Col md={4}>
              <div className="about-card h-100 text-center p-4">
                <h4>100% Result Oriented</h4>
                <p className="text-muted">Work on time with guaranteed results</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="about-card h-100 text-center p-4">
                <h4>100+ Satisfied Clients</h4>
                <p className="text-muted">Happy clients across various industries</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="about-card h-100 text-center p-4">
                <h4>Certified Professionals</h4>
                <p className="text-muted">Team of professionals certified programmer by OCP and MCP</p>
              </div>
            </Col>
          </Row>
          <Row className="mt-4 g-4">
            <Col md={6}>
              <div className="about-card h-100 text-center p-4">
                <h4>Cost Effective Services</h4>
                <p className="text-muted">Quality services at competitive prices</p>
              </div>
            </Col>
            <Col md={6}>
              <div className="about-card h-100 text-center p-4">
                <h4>We Work On</h4>
                <p className="text-muted">Java technology, PHP technology, CMS Interface, AJAX, JQuery, JS, NodeJS, Bootstrap</p>
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
            <Button className="btn-premium px-5 py-3" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>Inquire Now <FaChevronRight className="ms-2" /></Button>
          </div>
        </Container>
      </section>


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