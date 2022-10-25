import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  order_detail,
  payment,
  payment_intend,
  resetPayment,
} from "../features/order/orderSlice";
import { BsPaypal } from "react-icons/bs";
import Loader from "../components/Loader";

import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

function OrderDetail() {
  const dispatch = useDispatch();
  const {
    order,
    status,
    payment: paymentStatus,
  } = useSelector((state) => state.orders);
  const { paymentMethod, shippingAddress } = useSelector(
    (state) => state.carts
  );
  const { user } = useSelector((state) => state.auth);
  const params = useParams();
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (elements == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    dispatch(
      payment_intend({
        user,
        email: user ? user.email : "test@gmail.com",
        name: user ? user.username : "testuser",
        amount: order ? order.totalPrice : 0,
        payment_method_id: paymentMethod.id,
      })
    );
    dispatch(payment({ user, params }));
    dispatch(resetPayment());
  };

  useEffect(() => {
    dispatch(order_detail({ user, params }));
  }, [dispatch]);

  return status === "loading" ? (
    <Loader />
  ) : (
    <div className="container">
      <div className="row mt-3">
        <div className="col-lg-9">
          <h4>Order No : #{params.id}</h4>
          <h2>Shipping Address</h2>
          <p className="text" style={{ color: "#999" }}>
            Address : {shippingAddress?.address} - {shippingAddress?.city},{" "}
            {shippingAddress?.postalCode}, {shippingAddress?.country}
          </p>
          <p className="text" style={{ color: "#999" }}>
            Name : {order.user ? order.user.username : ""}
          </p>
          <p className="text" style={{ color: "#999" }}>
            Email : {order.user ? order.user.email : ""}
          </p>
          {order.is_delivered ? (
            <p className="alert alert-success">
              Delivered At : {order.delivered_at}
            </p>
          ) : (
            <p className="alert alert-warning">Not Delivered</p>
          )}
          <hr />
          <h2>Payment Method</h2>
          <h6>
            Method : {paymentMethod} <BsPaypal />{" "}
          </h6>
          {order.is_paid ? (
            <p className="alert alert-success">Paid at : {order.paid_at}</p>
          ) : (
            <p className="alert alert-warning">Not paid</p>
          )}
          <hr />

          <h2>Order Items</h2>
          <table className="table">
            <thead></thead>
            <body>
              {order.orderItems
                ? order.orderItems.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <img
                          src={item.image}
                          style={{ width: "100px" }}
                          alt=""
                        />
                      </td>
                      <td>{item.name}</td>
                      <td>${item.price}</td>
                      <td>
                        ${item.price} X {item.qty} = ${item.price * item.qty}
                      </td>
                    </tr>
                  ))
                : ""}
            </body>
          </table>
        </div>
        <div className="col-lg-3">
          <ul className="list-group">
            <li className="list-group-item">
              Total Item : ${order.totalPrice}
            </li>
            <li className="list-group-item">
              Shipping Price ${order.shippingPrice}
            </li>
            <li className="list-group-item">Tax : ${order.taxPrice}</li>
            <li className="list-group-item">Total : ${order.totalPrice}</li>
          </ul>
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="card--element">
              <CardElement />
            </div>
            <button
              className="mt-3 btn btn-dark btn-block"
              type="submit"
              style={{ width: "100%" }}
              disabled={!stripe || !elements}
            >
              {status === "loading" ? "Processing..." : "Pay"}
            </button>
          </form>
          <Link
            to={"/"}
            className="mt-2 btn btn-outline-dark"
            style={{ width: "100%" }}
          >
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;
