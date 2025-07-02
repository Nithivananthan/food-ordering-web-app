import React from 'react';
import { useNavigate } from 'react-router-dom';

function Buyitems({ setcustomer, order, total }) {
  const navigate = useNavigate();

 const handleSubmit = (e) => {
  e.preventDefault();
  const success = order();
  if (success) {
    navigate("/thankyou");
  }
};
  return (
    <div className="order-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="quantity">Quantity:</label>
          <input
            onChange={(e) => setcustomer(prev => ({ ...prev, quantity: e.target.value }))}
            type="number"
            id="quantity"
            name="quantity"
            placeholder="Enter the quantity"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">Your Name:</label>
          <input
            onChange={(e) => setcustomer(prev => ({ ...prev, name: e.target.value }))}
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number:</label>
          <input
            onChange={(e) => setcustomer(prev => ({ ...prev, number: e.target.value }))}
            type="tel"
            id="phone"
            name="phone"
            placeholder="Enter your phone number"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Delivery Address:</label>
          <input
            onChange={(e) => setcustomer(prev => ({ ...prev, address: e.target.value }))}
            type="text"
            id="address"
            name="address"
            placeholder="Enter your delivery address"
            required
          />
        </div>

        <div className="totalprice">
          <label htmlFor="totalprice">Total Price: ${total}</label>
        </div>

        <div className="placeorder">
          <button type="submit">Place Order</button>
        </div>
      </form>
    </div>
  );
}
export default Buyitems;
