import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../features/products/productsSlice";
import { fetchCategories } from "../features/categories/categoriesSlice";
import { allOrders } from "../features/order/orderSlice";
import { getAllUsers } from "../features/auth/authSlice";
function Stock() {
  const { categories } = useSelector((state) => state.categories);
  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.orders);
  const { users } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategories);
    dispatch(fetchProducts);
    dispatch(allOrders);
    dispatch(getAllUsers);
  }, [dispatch]);
  return (
    <div className="container">
      <div className="row mt-5 admin">
        <div className="col-lg-3">
          <Link to={"/categories"}>
            <div className="card">
              <h3>Product Category</h3>
              <h6>
                <span style={{ fontSize: "2rem", marginRight: "1rem" }}>
                  {categories?.length}
                </span>{" "}
                categories
              </h6>
            </div>
          </Link>
        </div>
        <div className="col-lg-3">
          <Link to={"/products/all"}>
            <div className="card">
              <h3>Products</h3>
              <h6>
                <span style={{ fontSize: "2rem", marginRight: "1rem" }}>
                  {products?.length}
                </span>{" "}
                Products
              </h6>
            </div>
          </Link>
        </div>
        <div className="col-lg-3">
          <Link to={"/orders/all"}>
            <div className="card">
              <h3>Orders</h3>
              <h6>
                <span style={{ fontSize: "2rem", marginRight: "1rem" }}>
                  {orders?.length}
                </span>{" "}
                Orders
              </h6>
            </div>
          </Link>
        </div>
        <div className="col-lg-3">
          <Link to={"/users/all"}>
            <div className="card">
              <h3>Users</h3>
              <h6>
                <span style={{ fontSize: "2rem", marginRight: "1rem" }}>
                  {users?.length}
                </span>{" "}
                Users
              </h6>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Stock;
