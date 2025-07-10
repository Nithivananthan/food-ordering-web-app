import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Food({ foodinf, addcart, cart, handeldelete, index,handelitem}) {
  const [visi, setVisi] = useState(false);

  function addedornot() {
    return cart.some(item => item._id === foodinf._id);
  }
  return (
    <div>
      <div className="food">
        <img
          className="food-img"
          src={foodinf.foodimage}
          alt={foodinf.foodname}
        />
        <h3>{foodinf.foodname}</h3>
        <button onClick={() => setVisi(true)} className="details">
          <FontAwesomeIcon icon={faInfoCircle} />
        </button>
      </div>
      {visi && (
        <div className="back">
          <div className="food-d">
            <button className="food-d-cancel" onClick={() => setVisi(false)}>
              X
            </button>
            <div className="foodoverview">
              <img
                className="food-d-img"
                src={foodinf.foodimage}
                alt={foodinf.foodname}
              />
              <h1 className="food-d-name">Name: {foodinf.foodname}</h1>
              <h2 className="price">Price: {foodinf.foodprice}</h2>
              <h3 className="description">{foodinf.fooddescription}</h3>
              <br />
              {addedornot() ? (
                <button
                  className="food-remove"
                  onClick={() => {
                    const idx = cart.findIndex(item => item._id === foodinf._id);
                    if (idx !== -1) handeldelete(idx);
                  }}
                >
                  Remove
                </button>
              ) : (
                <button className="food-add" onClick={() => addcart(foodinf)}>
                  ADD
                </button>
              )}
          <Link to="/buyitem"><button className="food-buy" onClick={()=>handelitem(foodinf)}>Buy</button></Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Food;
