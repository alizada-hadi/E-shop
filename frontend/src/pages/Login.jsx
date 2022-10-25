import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

function Login() {
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (user || status === "succeeded") {
      navigate("/");
      toast.success("Logged In");
    }
  }, [user, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  if (status === "loading") {
    return <Loader />;
  }

  if (status === "failed") {
    toast.error("Invalid email or password ");
  }

  return (
    <div className="container">
      <div className="register--form">
        <form onSubmit={submitHandler}>
          <h2 className="mb-4">Continue with E-shop</h2>
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
            <label htmlFor="">Password</label>
            <input
              type="password"
              className="form-control mt-2"
              name="password"
              value={password}
              onChange={onChange}
            />
          </div>

          <p className="mt-3">
            Don't have an account? <Link to={"/signup"}>Sign Up</Link>
          </p>
          <button className="mt-2 btn btn-outline-dark">Sign In</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
