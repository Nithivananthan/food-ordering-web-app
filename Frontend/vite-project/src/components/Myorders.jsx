import React, { useEffect, useState } from 'react';
import axios from 'axios';
function MyOrders({ user }) {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    if (user && user._id) {
      axios.get(`/api/orders/${user._id}`)
        .then((res) => setOrders(res.data))
        .catch((err) => console.error("Failed to fetch orders:", err));
    }
  }, [user]);

  const cancelOrder = (orderId) => {
    axios.delete(`/api/orders/${orderId}`)
      .then(() => {
        alert('Order cancelled successfully');
        setOrders((prevOrders) => prevOrders.filter(order => order._id !== orderId));
      })
      .catch((err) => {
        alert('Failed to cancel order');
        console.error("Error cancelling order:", err);
      });
  };
  if (!user) return <p className="orders-message">Please login to view your orders.</p>;
  return (
    <div className="orders-container">
      <h2 className="orders-heading">My Orders</h2>
      {orders.length === 0 ? (
        <p className="orders-message">No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="order-card">
            <img src={order.foodimage} alt={order.foodname} className="order-image" />
            <div className="order-info">
              <h3>{order.foodname}</h3>
              <p>Price: {order.foodprice}</p>
              <p>Quantity: {order.foodquantity}</p>
              <p>Total: ${order.totalprice}</p>
              <p>Delivery to: {order.address}</p>
              <p>Ordered by: {order.name} ({order.number})</p>
              <p className="order-status">Status: <span>Out for delivery</span></p>
              <button className="cancel-button" onClick={() => cancelOrder(order._id)}>Cancel Order</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default MyOrders;
