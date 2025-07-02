import React from 'react';

function Contact() {
  return (
    <div className="contact-container">
      <h2 className="contact-heading">Contact Us</h2>
      <p className="contact-subheading">We'd love to hear from you! Fill out the form below.</p>
      
      <form className="contact-form">
        <input type="text" placeholder="Your Name" required />
        <input type="email" placeholder="Your Email" required />
        <textarea placeholder="Your Message" rows="5" required></textarea>
        <button type="submit">Send Message</button>
      </form>

      <div className="contact-info">
        <h4>Contact Info</h4>
        <p>Email: support@foodrush.com</p>
        <p>Phone: +91 1234567891</p>
        <p>Address: 123 Food Street, Chennai, India</p>
      </div>
    </div>
  );
}
export default Contact;
