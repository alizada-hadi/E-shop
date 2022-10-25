import React, { useState } from "react";
import { BsPaypal } from "react-icons/bs";
import { SiMastercard } from "react-icons/si";
import { MdMobileFriendly, MdOutlinePayments } from "react-icons/md";
import { addPaymentMethod } from "../features/carts/cartsSlice";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import { useNavigate } from "react-router-dom";

function Payment() {
  const [paymentMethod, setPaymentMethod] = useState("payPal");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(addPaymentMethod(paymentMethod));
    navigate("/place_order");
  };

  return (
    <div className="container">
      <CheckoutSteps step1 step2 step3 />
      <div className="col-lg-5 m-auto">
        <h2 className="my-3">Payment Methods</h2>
        <form onSubmit={submitHandler}>
          <div className="radio--buttons row">
            <div className="col-lg-6">
              <input
                type="radio"
                name="payment"
                id="paypal"
                value="payPal"
                onChange={(e) => setPaymentMethod(e.target.value)}
                checked={paymentMethod}
              />
              <label htmlFor="paypal">
                <span style={{ marginRight: "3px", fontSize: "1.2rem" }}>
                  Paypal
                </span>
                <BsPaypal />
              </label>
            </div>
            <div className="col-lg-6">
              <input
                type="radio"
                name="payment"
                id="mPaisa"
                value="m_paisa"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label htmlFor="mPaisa">
                <span>M Paisa</span>
                <MdMobileFriendly />
              </label>
            </div>
            <div className="col-lg-6">
              <input
                type="radio"
                name="payment"
                id="aziPay"
                value="azipay"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label htmlFor="aziPay">
                <span>Azi Pay</span>
                <MdOutlinePayments />
              </label>
            </div>
            <div className="col-lg-6">
              <input
                type="radio"
                name="payment"
                id="credit"
                value="master"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label htmlFor="credit">
                <span>Master Card</span>
                <SiMastercard />
              </label>
            </div>
          </div>
          <button className="btn btn-primary mt-2">Continue</button>
        </form>
      </div>
    </div>
  );
}

export default Payment;
