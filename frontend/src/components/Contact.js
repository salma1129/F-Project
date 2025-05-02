import React, { useState } from 'react';
import '../styles/Contact.css';
import Navbar from './Navbar'; // Assuming Navbar is reused

const Contact = React.forwardRef((props, ref) => {
  const [messageSent, setMessageSent] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setMessageSent(true);

    // Hide message after 3 seconds
    setTimeout(() => {
      setMessageSent(false);
    }, 3000);
  };

  return (
    <div className="home-page-container">
      {/* Use the Navbar component */}
      <Navbar />

      <div className="home-container full-page">
        <div className="home-content">
          <h1>Contact Us</h1>
          <p>
            Got questions? Reach out — we’re here to help. Our team is available for any inquiries
            or support you may need.
          </p>

          {/* Success message */}
          {messageSent && <div className="success-message">Message sent successfully!</div>}

          {/* Image section like in About */}
          <div className="about-image-section" style={{ marginTop: '2rem' }}></div>

          {/* Contact form section */}
          <div className="contact-grid">
            <form className="contact-form" onSubmit={handleFormSubmit}>
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />
              <textarea placeholder="Your Message" rows="5" required></textarea>
              <button type="submit" className="btn btn-primary">
                Send Message
              </button>
            </form>

            <div className="contact-info">
              <p>
                <span><i className="fas fa-envelope"></i> syra@hrsystem.com</span><br />
                <span><i className="fas fa-phone-alt"></i> +1 (555) 123-4567</span><br />
                <span><i className="fas fa-map-marker-alt"></i> Sahloul, Sousse</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Contact;