import React from 'react';


function Cart({ cart, handelDelete}) {
  return (
    <div>
      <table className="carttable" border={1}>
        <thead className="carthead">
          <tr>
            <th>Food</th>
            <th>Name</th>
            <th>Price</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody className="cartbody">
          {cart.map((cart,index) =>(
            <tr key={cart._id}>
              <td>  
                <img className="cartimg" src={cart.foodimage} alt={cart.foodname} />
              </td>
              <td className="cart-food-name">{cart.foodname}</td>
              <td className="cart-food-price">{cart.foodprice}</td>
              <td>
                <button className="cartdel" onClick={() => handelDelete(index)}>
                 Delete
                </button>
              </td> 
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Cart;

