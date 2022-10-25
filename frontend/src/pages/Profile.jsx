import React, { useState, useEffect } from "react";
import { profile } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { orders_mine } from "../features/order/orderSlice";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
function Profile() {
  const dispatch = useDispatch();
  const { user, status } = useSelector((state) => state.auth);
  const {
    orders,
    status: orderStatus,
    error,
  } = useSelector((state) => state.orders);
  const [formData, setFormData] = useState({
    user,
    email: user.email ? user.email : "",
    username: user.username ? user.username : "",
    first_name: user.first_name ? user.first_name : "",
    last_name: user.last_name ? user.last_name : "",
    phone: user.phone ? user.phone : "",
    address: user.address ? user.address : "",
    avatar: user.avatar ? user.avatar : "",
  });
  const { email, username, first_name, last_name, phone, address, avatar } =
    formData;
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const uploadImageHandler = (e) => {
    let newProfile = { ...formData };
    const file = e.target.files[0];
    console.log(file);
    newProfile["avatar"] = file;
    setFormData(newProfile);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(profile(formData));
  };

  useEffect(() => {
    dispatch(orders_mine(user));
  }, [dispatch]);

  console.log(orders[0]);

  return status === "loading" ? (
    <Loader />
  ) : (
    <div className="container">
      <div className="row mt-5">
        <div className="col-lg-6">
          <img
            src={user.avatar}
            style={{
              width: "150px",
              height: "150px",
              marginLeft: "14rem",
              border: "2px solid #565656",
              borderRadius: "50%",
              padding: "2px",
            }}
            alt=""
            className="mb-3"
          />
          <form onSubmit={submitHandler}>
            <div className="row">
              <div className="col-lg-6">
                <label htmlFor="">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChange}
                />
              </div>
              <div className="col-lg-6">
                <label htmlFor="">Username</label>
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={onChange}
                  className="form-control"
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-lg-6">
                <label htmlFor="">First Name</label>
                <input
                  type="text"
                  name="first_name"
                  value={first_name}
                  onChange={onChange}
                  className="form-control"
                />
              </div>
              <div className="col-lg-6">
                <label htmlFor="">Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  value={last_name}
                  onChange={onChange}
                  className="form-control"
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-lg-6">
                <label htmlFor="">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={phone}
                  onChange={onChange}
                  className="form-control"
                />
              </div>
              <div className="col-lg-6">
                <label htmlFor="">Avatar</label>
                <input
                  type="file"
                  name="avatar"
                  onChange={uploadImageHandler}
                  className="form-control"
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col">
                <label htmlFor="">Address</label>
                <textarea
                  name="address"
                  className="form-control"
                  id=""
                  value={address}
                  onChange={onChange}
                  cols="30"
                  rows="10"
                ></textarea>
              </div>
            </div>

            <button className="btn btn-outline-dark mt-3">Save</button>
          </form>
        </div>
        <div className="col-lg-6" style={{ borderLeft: "2px solid #dfdfdf" }}>
          <h3 className="mt-5">My Orders</h3>

          {orderStatus === "loading" ? (
            <Loader />
          ) : error ? (
            <p className="alert alert-danger">{error}</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Is Paid</th>
                  <th>Is Derliverd</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
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
                      <Link
                        to={`/order/${order.id}`}
                        className="btn btn-outline-dark"
                      >
                        Detail
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
