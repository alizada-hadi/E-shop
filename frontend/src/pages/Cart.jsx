import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FiTrash } from "react-icons/fi";
import {
  incrementQuantity,
  decrementQuantity,
  removeItem,
} from "../features/carts/cartsSlice";
function Cart() {
  const { cartItems } = useSelector((state) => state.carts);
  const dispatch = useDispatch();
  const getTotalAmount = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.quantity * item.price;
    });
    return total;
  };
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-lg-9">
          <table className="table table-hover table-bordered">
            <thead>
              <tr>
                <th className="text-center">Image</th>
                <th className="text-center">Product</th>
                <th className="text-center">Price</th>
                <th className="text-center">Quantity</th>
                <th>Total</th>
                <th className="text-center"></th>
              </tr>
            </thead>
            <tbody>
              {cartItems?.map((item) => (
                <tr key={item.id}>
                  <td className="text-center">
                    <img
                      src={item.cover_image}
                      style={{ width: "120px" }}
                      alt=""
                    />
                  </td>
                  <td className="text-center">
                    <Link to={`/product/${item.id}`}>{item.name}</Link>
                  </td>
                  <td className="text-center">${item.price}</td>
                  <td className="text-center">
                    <div
                      className="btn-group btn-group-lg"
                      role="group"
                      aria-label="Large button group"
                    >
                      <button
                        type="button"
                        className="btn btn-outline-dark"
                        onClick={() => dispatch(decrementQuantity(item.id))}
                      >
                        -
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-dark"
                        disabled
                      >
                        {item.quantity}
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-dark"
                        onClick={() => dispatch(incrementQuantity(item.id))}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="text-center">${item.quantity * item.price}</td>
                  <td className="text-center item--remove">
                    <FiTrash onClick={() => dispatch(removeItem(item.id))} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-lg-3">
          <ul className="list-group">
            <li className="list-group-item total--amount">
              <span className="">Total : </span>
              <span className="">${getTotalAmount()}</span>
            </li>
          </ul>
          {cartItems.length > 0 ? (
            <Link to={"/shipping"} className="btn btn-dark btn-block mt-2">
              Checkout
            </Link>
          ) : (
            <Link
              to={"/shipping"}
              className="btn btn-dark btn-block mt-2 disabled"
            >
              Checkout
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
