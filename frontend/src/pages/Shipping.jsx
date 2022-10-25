import React, { useState, useEffect } from "react";
import { saveShippingAddress } from "../features/carts/cartsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";

function Shipping() {
  const dispatch = useDispatch();
  const { shippingAddress } = useSelector((state) => state.carts);
  console.log(shippingAddress);
  const [formData, setFormData] = useState({
    address: shippingAddress?.address ? shippingAddress.address : "",
    city: shippingAddress?.city ? shippingAddress.city : "",
    postalCode: shippingAddress?.postalCode ? shippingAddress.postalCode : "",
    country: shippingAddress?.country ? shippingAddress.country : "",
  });

  const navigate = useNavigate();

  const { address, city, postalCode, country } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress(formData));
    navigate("/payment");
  };

  return (
    <div className="container">
      <CheckoutSteps step1 step2 />
      <div className="col-lg-6 m-auto">
        <h2 className="mt-3">Shipping Address</h2>
        <form onSubmit={submitHandler}>
          <div>
            <label htmlFor="">Address</label>
            <input
              type="text"
              className="form-control"
              name="address"
              value={address}
              onChange={onChange}
            />
          </div>
          <div className="mt-2">
            <label htmlFor="">City</label>
            <input
              type="text"
              className="form-control"
              name="city"
              value={city}
              onChange={onChange}
            />
          </div>
          <div className="mt-2">
            <label htmlFor="">Postal Code</label>
            <input
              type="text"
              className="form-control"
              name="postalCode"
              value={postalCode}
              onChange={onChange}
            />
          </div>
          <div className="mt-2">
            <label htmlFor="">Country</label>
            <input
              type="text"
              className="form-control"
              name="country"
              value={country}
              onChange={onChange}
            />
          </div>
          <button className="btn btn-primary mt-2">Continue</button>
        </form>
      </div>
    </div>
  );
}

export default Shipping;
