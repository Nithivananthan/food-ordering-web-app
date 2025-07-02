import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const ThankYouPage = () => {
  const navigate = useNavigate();
  return (
    <div className="thank-you-container">
      <div className="thank-you-card">
        <div className="check-icon">✔</div>
        <h1 className="thank-you-title">Thank You!</h1>
        <p className="thank-you-message">Your order has been placed successfully. 🎉</p>
        <div className="thank-you-buttons">
          <button className="home-button" onClick={() => navigate('/')}>
            Go to Home
          </button>
          <Link to="/myorder"><button className="orders-button">
            View My Orders
          </button></Link>
        </div>
      </div>
    </div>
  );
};
export default ThankYouPage;
