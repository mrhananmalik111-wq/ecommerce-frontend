// About.jsx - Complete About page with all sections
import "../css/About.css";

const About = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <h1>About Our Store</h1>
          <p>We create premium digital experiences with passion and purpose.</p>
        </div>
      </section>

      {/* Main About Content */}
      <section className="py-5">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-md-6">
              <div className="bg-dark-card">
                <h2 className="text-gold mb-3">
                  <i className="fas fa-address-card me-2"></i>Who We Are
                </h2>
                <p className="text-light" style={{ lineHeight: 1.8 }}>
                  We are a passionate team crafting premium digital experiences. 
                  Our mission is to merge modern design with robust functionality. 
                  This page demonstrates how the <span className="text-gold">same dark theme</span> 
                  can power both product displays and informational pages.
                </p>
                
                {/* Stats */}
                <div className="about-stats">
                  <div className="about-stat-item">
                    <span className="number">50+</span>
                    <span className="label">Products</span>
                  </div>
                  <div className="about-stat-item">
                    <span className="number">100+</span>
                    <span className="label">Customers</span>
                  </div>
                  <div className="about-stat-item">
                    <span className="number">4.8</span>
                    <span className="label">Rating</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-md-6">
              <div className="product-card p-3">
                <div className="product-image">
                  <img 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop&crop=center" 
                    alt="team" 
                  />
                  <div className="wishlist-icon">
                    <i className="fas fa-heart"></i>
                  </div>
                </div>
                <div className="p-3">
                  <div className="rating">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star-half-alt"></i>
                  </div>
                  <h5>Creative Collective</h5>
                  <p className="small text-secondary">Design · Code · Innovation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-gold text-center mb-4">
            <i className="fas fa-bullseye me-2"></i>Our Mission & Vision
          </h2>
          <div className="mission-vision-grid">
            <div className="mission-card">
              <div className="icon"><i className="fas fa-rocket"></i></div>
              <h4>Our Mission</h4>
              <p>To empower businesses with cutting-edge digital solutions that combine aesthetic excellence with functional precision.</p>
            </div>
            <div className="vision-card">
              <div className="icon"><i className="fas fa-eye"></i></div>
              <h4>Our Vision</h4>
              <p>To become the global leader in dark-themed e-commerce experiences, setting new standards for design and usability.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-gold text-center mb-4">
            <i className="fas fa-gem me-2"></i>Our Values
          </h2>
          <div className="values-grid">
            <div className="value-item">
              <div className="icon"><i className="fas fa-heart"></i></div>
              <h5>Passion</h5>
              <p>We love what we do and it shows in every project.</p>
            </div>
            <div className="value-item">
              <div className="icon"><i className="fas fa-lightbulb"></i></div>
              <h5>Innovation</h5>
              <p>Always pushing boundaries with creative solutions.</p>
            </div>
            <div className="value-item">
              <div className="icon"><i className="fas fa-users"></i></div>
              <h5>Community</h5>
              <p>Building connections that matter and last.</p>
            </div>
            <div className="value-item">
              <div className="icon"><i className="fas fa-star"></i></div>
              <h5>Excellence</h5>
              <p>Never settling for anything less than the best.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-gold text-center mb-4">
            <i className="fas fa-clock me-2"></i>Our Journey
          </h2>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="timeline">
                <div className="timeline-item">
                  <span className="year">2022</span>
                  <div className="title">Founded</div>
                  <div className="desc">Started with a vision to revolutionize dark-themed e-commerce.</div>
                </div>
                <div className="timeline-item">
                  <span className="year">2023</span>
                  <div className="title">First 100 Customers</div>
                  <div className="desc">Reached our first milestone with overwhelming support.</div>
                </div>
                <div className="timeline-item">
                  <span className="year">2024</span>
                  <div className="title">Global Expansion</div>
                  <div className="desc">Expanded our reach to international markets.</div>
                </div>
                <div className="timeline-item">
                  <span className="year">2025</span>
                  <div className="title">New Era</div>
                  <div className="desc">Continuing to innovate and push boundaries.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5">
        <div className="container">
          <div className="about-cta">
            <h3>Ready to Start Your Journey?</h3>
            <p>Join thousands of satisfied customers who trust us for their digital needs.</p>
            <a href="#" className="btn-cta">
              <i className="fas fa-arrow-right me-2"></i>Get Started
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;