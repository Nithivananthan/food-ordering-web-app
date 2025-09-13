import React from "react";

function Cart({ cart, handelDelete,handelitem,foodinf }) {
  return (
    <div className="cart-container">
      <h2 className="cart-title">My Cart</h2>
      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty 🛒</p>
      ) : (
        cart.map((item, index) => (
          <div key={item._id} className="cart-card">
            <img className="cart-img" src={item.foodimage} alt={item.foodname} />
            <div className="cart-details">
              <h3>{item.foodname}</h3>
              <p className="cart-price">{item.foodprice}</p>
            </div>
            <button className="cart-del">Buy</button>
            <button
              className="cart-del"
              onClick={() => handelDelete(index)}
            >
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Cart;
