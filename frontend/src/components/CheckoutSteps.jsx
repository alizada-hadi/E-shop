import React from "react";
import { Link } from "react-router-dom";

function CheckoutSteps({ step1, step2, step3, step4 }) {
  return (
    <div className="container">
      <ul className="nav justify-content-center mb-4 text-dark">
        <li className="nav-item">
          {step1 ? (
            <Link to={"/login"} className="nav-link active">
              Login
            </Link>
          ) : (
            <Link to={"/"} className="nav-link disabled">
              Login
            </Link>
          )}
        </li>
        <li className="nav-item">
          {step2 ? (
            <Link to={"/shipping"} className="nav-link active">
              Shipping
            </Link>
          ) : (
            <Link to={"/shipping"} className="nav-link disabled">
              Shipping
            </Link>
          )}
        </li>
        <li className="nav-item">
          {step3 ? (
            <Link to={"/payment"} className="nav-link active">
              Payment
            </Link>
          ) : (
            <Link to={"/payment"} className="nav-link disabled">
              Payment
            </Link>
          )}
        </li>
        <li className="nav-item">
          {step4 ? (
            <Link to={"/place_order"} className="nav-link active">
              Make Order
            </Link>
          ) : (
            <Link to={"/place_order"} className="nav-link disabled">
              Make Order
            </Link>
          )}
        </li>
      </ul>
    </div>
  );
}

export default CheckoutSteps;
