// Contact.jsx - Complete Contact page with all sections
import { useState } from 'react';
import '../css/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // const [formStatus, setFormStatus] = useState({
  //   submitted: false,
  //   error: false
  // });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // setFormStatus({ submitted: true, error: false });
    
    // Simulate API call
    setTimeout(() => {
      alert('Thank you for your message! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      // setFormStatus({ submitted: false, error: false });
    }, 500);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you. Reach out and we'll respond as soon as possible.</p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-5">
        <div className="container">
          <div className="contact-info-grid">
            <div className="contact-info-card">
              <span className="icon"><i className="fas fa-map-marker-alt"></i></span>
              <h5>Visit Us</h5>
              <p>Dark Street 42, Cyber City</p>
            </div>
            <div className="contact-info-card">
              <span className="icon"><i className="fas fa-phone-alt"></i></span>
              <h5>Call Us</h5>
              <p>+1 800 123 4567</p>
            </div>
            <div className="contact-info-card">
              <span className="icon"><i className="fas fa-envelope"></i></span>
              <h5>Email Us</h5>
              <p>hello@darkstore.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            {/* Sidebar */}
            <div className="col-lg-4">
              <div className="contact-sidebar">
                <h3 className="sidebar-title">
                  <i className="fas fa-map-pin me-2"></i>Get in Touch
                </h3>
                <p className="sidebar-text">
                  We're here to help you with any questions about our products, 
                  services, or anything else. Our team is ready to assist you.
                </p>
                
                <ul className="contact-info-list">
                  <li>
                    <span className="info-icon"><i className="fas fa-map-marker-alt"></i></span>
                    <span className="info-text">
                      <strong>Address</strong>
                      Dark Street 42, Cyber City
                    </span>
                  </li>
                  <li>
                    <span className="info-icon"><i className="fas fa-phone-alt"></i></span>
                    <span className="info-text">
                      <strong>Phone</strong>
                      +1 800 123 4567
                    </span>
                  </li>
                  <li>
                    <span className="info-icon"><i className="fas fa-envelope"></i></span>
                    <span className="info-text">
                      <strong>Email</strong>
                      hello@darkstore.com
                    </span>
                  </li>
                  <li>
                    <span className="info-icon"><i className="fas fa-clock"></i></span>
                    <span className="info-text">
                      <strong>Working Hours</strong>
                      Mon-Fri: 9AM - 6PM
                    </span>
                  </li>
                </ul>

                <div className="contact-social">
                  <span className="social-label">Follow Us</span>
                  <div className="social-links">
                    <a href="#"><i className="fab fa-twitter"></i></a>
                    <a href="#"><i className="fab fa-instagram"></i></a>
                    <a href="#"><i className="fab fa-github"></i></a>
                    <a href="#"><i className="fab fa-youtube"></i></a>
                    <a href="#"><i className="fab fa-linkedin-in"></i></a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="col-lg-8">
              <div className="contact-form-wrapper">
                <h3 className="form-title">
                  <i className="fas fa-paper-plane me-2"></i>Send a Message
                </h3>
                <p className="form-subtitle">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>

                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>
                          Your Name <span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>
                          Email Address <span className="required">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <label>Subject</label>
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="How can we help?"
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <label>
                          Message <span className="required">*</span>
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows="5"
                          placeholder="Write your message here..."
                          required
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-12">
                      <button type="submit" className="btn-submit">
                        <i className="fas fa-paper-plane"></i>
                        Send Message
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-5">
        <div className="container">
          <div className="contact-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.00369368400567!3d40.71312937933039!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a316bb82a5b%3A0xc8d032ae3cbb2b9c!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1641234567890!5m2!1sen!2s"
              allowFullScreen=""
              loading="lazy"
              title="Store Location"
            ></iframe>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-5">
        <div className="container">
          <div className="faq-section">
            <h3 className="faq-title">
              <i className="fas fa-question-circle me-2"></i>Frequently Asked Questions
            </h3>
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="faq-item">
                  <div className="faq-question">
                    <span>How do I place an order?</span>
                    <span className="faq-toggle"><i className="fas fa-chevron-down"></i></span>
                  </div>
                  <div className="faq-answer">
                    <p>Simply browse our products, add items to your cart, and proceed to checkout. It's that easy!</p>
                  </div>
                </div>
                <div className="faq-item">
                  <div className="faq-question">
                    <span>Do you ship internationally?</span>
                    <span className="faq-toggle"><i className="fas fa-chevron-down"></i></span>
                  </div>
                  <div className="faq-answer">
                    <p>Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location.</p>
                  </div>
                </div>
                <div className="faq-item">
                  <div className="faq-question">
                    <span>What is your return policy?</span>
                    <span className="faq-toggle"><i className="fas fa-chevron-down"></i></span>
                  </div>
                  <div className="faq-answer">
                    <p>We offer a 30-day return policy. If you're not satisfied with your purchase, we'll happily assist you.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;