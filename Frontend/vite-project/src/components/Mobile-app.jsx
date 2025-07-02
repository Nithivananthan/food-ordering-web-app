import React from 'react';

const MobileAppPage = () => {
  return (
    <div className="mobile-app-container">
      <h1 className="mobile-app-title">Mobile App Coming Soon!</h1>
      <p className="mobile-app-description">
        We're working hard to bring you the best food ordering experience on mobile.
        Our app will be available on iOS and Android soon.
      </p>

      <img
  src="https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=300&q=80"
  alt="Mobile App Preview"
  className="mobile-app-image"
/>
      <div className="store-buttons">
        <button className="store-button disabled">App Store</button>
        <button className="store-button disabled">Google Play</button>
      </div>
    </div>
  );
};

export default MobileAppPage;
