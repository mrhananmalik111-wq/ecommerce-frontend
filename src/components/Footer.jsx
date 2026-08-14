import {
  Container,
  Row,
  Col,
  Form,
  Button,
} from "react-bootstrap";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

import "../css/Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <Container>

        <Row className="gy-5">

          {/* About */}

          <Col lg={4} md={6}>

            <h3 className="footer-logo">
              FASHION<span>HUB</span>
            </h3>

            <p className="footer-text">
              Discover premium fashion for Men & Women.
              We bring quality clothing with affordable
              prices and fast delivery across Pakistan.
            </p>

            <div className="social-icons">

              <a href="#">
                <FaFacebookF />
              </a>

              <a href="#">
                <FaInstagram />
              </a>

              <a href="#">
                <FaLinkedinIn />
              </a>

              <a href="#">
                <FaTwitter />
              </a>

            </div>

          </Col>

          {/* Quick Links */}

          <Col lg={2} md={6}>

            <h5>Quick Links</h5>

            <ul>

              <li>Home</li>

              <li>Shop</li>

              <li>Categories</li>

              <li>New Arrivals</li>

              <li>Contact</li>

            </ul>

          </Col>

          {/* Customer Care */}

          <Col lg={3} md={6}>

            <h5>Customer Care</h5>

            <ul>

              <li>FAQ</li>

              <li>Shipping</li>

              <li>Returns</li>

              <li>Privacy Policy</li>

              <li>Terms & Conditions</li>

            </ul>

          </Col>

          {/* Newsletter */}

          <Col lg={3} md={6}>

            <h5>Newsletter</h5>

            <p>
              Subscribe to receive latest offers &
              exclusive discounts.
            </p>

            <Form>

              <Form.Control
                type="email"
                placeholder="Enter your email"
                className="mb-3"
              />

              <Button
                variant="warning"
                className="w-100"
              >
                Subscribe
              </Button>

            </Form>

          </Col>

        </Row>

        <hr />

        <Row className="align-items-center">

          <Col md={6}>

            <p className="copyright">
              © 2026 FashionHub. All Rights Reserved.
            </p>

          </Col>

          <Col md={6} className="text-md-end">

            <span className="contact-info">

              <FaMapMarkerAlt /> Lahore, Pakistan

            </span>

            <br />

            <span className="contact-info">

              <FaPhoneAlt /> +92 300 1234567

            </span>

            <br />

            <span className="contact-info">

              <FaEnvelope /> support@fashionhub.com

            </span>

          </Col>

        </Row>

      </Container>

    </footer>
  );
}

export default Footer;