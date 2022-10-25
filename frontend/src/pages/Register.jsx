import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../features/auth/authSlice";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

function Register() {
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    password2: "",
  });
  const { email, username, password, password2 } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (user || status === "succeeded") {
      navigate("/profile");
    }
  }, [user, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password === password2) {
      dispatch(register(formData));
    } else {
      toast.error("Passwords do not match");
    }
  };

  if (status === "loading") {
    return <Loader />;
  }
  if (status === "failed") {
    toast.error(error);
  }

  return (
    <div className="container">
      <div className="register--form">
        <form onSubmit={submitHandler}>
          <h2 className="mb-4">Register for E-shop</h2>
          <div className="mt-1">
            <label htmlFor="">Email</label>
            <input
              type="email"
              className="form-control mt-2"
              name="email"
              value={email}
              onChange={onChange}
            />
          </div>
          <div className="mt-1">
            <label htmlFor="">Username</label>
            <input
              type="text"
              className="form-control mt-2"
              name="username"
              value={username}
              onChange={onChange}
            />
          </div>
          <div className="mt-1">
            <label htmlFor="">Password</label>
            <input
              type="password"
              className="form-control mt-2"
              name="password"
              value={password}
              onChange={onChange}
            />
          </div>
          <div className="mt-1">
            <label htmlFor="">Confirm Password</label>
            <input
              type="password"
              className="form-control mt-2"
              name="password2"
              value={password2}
              onChange={onChange}
            />
          </div>
          <p className="mt-3">
            Already have an account? <Link to={"/signin"}>Sign In</Link>
          </p>
          <button className="mt-2 btn btn-outline-dark">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
