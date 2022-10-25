import React, { useEffect, useState } from "react";
import {
  allOrders,
  updateOrderAsDelivered,
  deleteOrder,
} from "../features/order/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";

function OrderList() {
  const dispatch = useDispatch();
  const { orders, status, error } = useSelector((state) => state.orders);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(allOrders(user));
  }, [dispatch]);

  const markAsDerliveredHandler = (id) => {
    dispatch(updateOrderAsDelivered({ user, id }));
    dispatch(allOrders(user));
  };

  const orderDeleteHandler = (id) => {
    const qs = window.confirm("are you sure you want to delete this order? ");
    if (qs) {
      dispatch(deleteOrder({ user, id }));
    }
    dispatch(allOrders(user));
  };

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-lg-10">
          <h2>All Orders</h2>
        </div>
      </div>
      {status === "laoding" ? (
        <Loader />
      ) : (
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th>#</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Total</th>
              <th>Is Paid</th>
              <th>Is Delivered</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.user.username}</td>
                <td>{order.created_at.substring(0, 10)}</td>
                <td>${order.totalPrice}</td>
                <td>
                  {order?.is_paid ? (
                    <span className="badge bg-success">Paid</span>
                  ) : (
                    <span className="badge bg-warning">Not paid</span>
                  )}
                </td>
                <td>
                  {order?.is_delivered ? (
                    <span className="badge bg-success">Delivered</span>
                  ) : (
                    <span className="badge bg-warning">Not Delivered</span>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => markAsDerliveredHandler(order.id)}
                    className="btn btn-outline-success"
                  >
                    Mark as Delivered
                  </button>
                  <button
                    onClick={() => orderDeleteHandler(order.id)}
                    className="btn btn-outline-danger mx-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default OrderList;
