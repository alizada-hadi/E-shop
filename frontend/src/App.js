import Header from "./layout/Header";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Category from "./pages/Category";
import ProductDetail from "./pages/ProductDetail";
import Shipping from "./pages/Shipping";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";
import PlaceOrder from "./pages/PlaceOrder";
import OrderDetail from "./pages/OrderDetail";
import Stock from "./adminPanel/Stock";
import OrderList from "./adminPanel/OrderList";
import UsersList from "./adminPanel/UsersList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loadStripe } from "@stripe/stripe-js";
import AllProducts from "./adminPanel/AllProducts";
import CreateProduct from "./adminPanel/CreateProduct";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  const stripePromise = loadStripe(
    "pk_test_51LeW73GGK2NMnKXM6Sbjd0CGDURwOKNY9jL8bK3lD32AVPF5Kp4zp7TwNHHDjrumdwJbksgMMuU12bSaQw6GRAcV00O5pQSGo8"
  );

  return (
    <div className="">
      <Router>
        <Header />
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/categories" element={<Category />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/place_order" element={<PlaceOrder />} />

            <Route path="/stock" element={<Stock />} />
            <Route path="/product/create" element={<CreateProduct />} />
            <Route path="/products/all" element={<AllProducts />} />
            <Route path="/orders/all" element={<OrderList />} />
            <Route path="/users/all" element={<UsersList />} />
            <Route
              path="/order/:id"
              element={
                <Elements stripe={stripePromise}>
                  <OrderDetail />
                </Elements>
              }
            />
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />

          <Route path="/signup" element={<Register />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <ToastContainer />
      </Router>
    </div>
  );
}

export default App;
