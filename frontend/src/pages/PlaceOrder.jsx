import React, { useEffect } from "react";
import CheckoutSteps from "../components/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import { BsPaypal } from "react-icons/bs";
import { create_order, resetOrder } from "../features/order/orderSlice";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { clearCartItems } from "../features/carts/cartsSlice";

function PlaceOrder() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, shippingAddress, paymentMethod } = useSelector(
    (state) => state.carts
  );

  const { order, status, error } = useSelector((state) => state.orders);
  const { user } = useSelector((state) => state.auth);

  const totalAmount = cartItems
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);
  const shippingPrice = (totalAmount > 100 ? 0 : 10).toFixed(2);
  const tax = Number(0.082 * totalAmount).toFixed(2);
  const total = Number(totalAmount) + Number(shippingPrice) + Number(tax);

  const placeOrderHandler = () => {
    dispatch(
      create_order({
        user: user,
        orderItems: cartItems,
        shippingAddress: shippingAddress,
        paymentMethod,
        shippingPrice,
        taxPrice: tax,
        totalPrice: total,
      })
    );
    dispatch(resetOrder());
    dispatch(clearCartItems());
    navigate(`/order/${order.id + 1}`);
  };

  return status === "loading" ? (
    <Loader />
  ) : (
    <div className="container">
      <CheckoutSteps step1 step2 step3 step4 />

      <div className="row mt-3">
        <div className="col-lg-9">
          <h2>Shipping Address</h2>
          <p className="text" style={{ color: "#999" }}>
            Address : {shippingAddress?.address} - {shippingAddress?.city},{" "}
            {shippingAddress?.postalCode}, {shippingAddress?.country}
          </p>
          <hr />
          <h2>Payment Method</h2>
          <h6>
            Method : {paymentMethod} <BsPaypal />{" "}
          </h6>
          <hr />

          <h2>Order Items</h2>
          <table className="table">
            <thead></thead>
            <body>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img
                      src={item.cover_image}
                      style={{ width: "100px" }}
                      alt=""
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>${item.price}</td>
                  <td>
                    ${item.price} X {item.quantity} = $
                    {item.price * item.quantity}
                  </td>
                </tr>
              ))}
            </body>
          </table>
        </div>
        <div className="col-lg-3">
          <ul className="list-group">
            <li className="list-group-item">Total Item : ${totalAmount}</li>
            <li className="list-group-item">
              Shipping Address ${shippingPrice}
            </li>
            <li className="list-group-item">Tax : ${tax}</li>
            <li className="list-group-item">Total : ${total}</li>
          </ul>
          <button
            className="btn btn-dark btn-block mt-2"
            onClick={placeOrderHandler}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;
