import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";
import { resetAuth } from "../features/auth/authSlice";
import { resetOrder } from "../features/order/orderSlice";
import { resetCart } from "../features/carts/cartsSlice";

import { useSelector, useDispatch } from "react-redux";
import { AiOutlineShoppingCart, AiOutlineStock } from "react-icons/ai";
import { HiUserGroup } from "react-icons/hi";
function Header() {
  const { user, status } = useSelector((state) => state.auth);

  const { cartItems } = useSelector((state) => state.carts);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    dispatch(resetCart());
    navigate("/");
  };

  const getTotalItemInCart = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.quantity;
    });
    return total;
  };
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <Link className="navbar-brand" to={"/"}>
          E-shop
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {user && user.isAdmin && (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" to={"/stock"}>
                  Stock Management
                  <AiOutlineStock />
                </Link>
              </li>
            </ul>
          )}

          {/* check if the logged in user is admin user */}

          {/* your condition goes here */}
          {user ? (
            <ul className="navbar-nav mr-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/cart" className="nav-link active ">
                  Cart
                  <AiOutlineShoppingCart />
                  <span className="cart--items">
                    {getTotalItemInCart() || 0}
                  </span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  style={{ marginRight: "10px" }}
                  to={"/profile"}
                >
                  Profile
                  <img src={user.avatar} alt="" />
                </Link>
              </li>

              <li className="nav-item">
                <button
                  className="btn btn-outline-secondary"
                  aria-current="page"
                  onClick={logoutHandler}
                >
                  Logout
                </button>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav mr-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/cart" className="nav-link active ">
                  Cart
                  <AiOutlineShoppingCart />
                  <span className="cart--items">
                    {getTotalItemInCart() || 0}
                  </span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to={"/signup"}
                >
                  Sign Up
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to={"/signin"}
                >
                  Sign In
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
