import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchProducts,
  deleteProduct,
} from "../features/products/productsSlice";
import Loader from "../components/Loader";
function AllProducts() {
  const { products, status, error } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const deleteProductHandler = (id) => {
    const qs = window.confirm("Are you sure you want to delete this product? ");
    if (qs && id && user) {
      dispatch(deleteProduct({ user, id }));
    }
    dispatch(fetchProducts());
  };

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-lg-10">
          <h2>All Products</h2>
        </div>
        <div className="col-lg-2">
          <Link to={"/product/create"} className="btn btn-dark ">
            Create Product
          </Link>
        </div>
      </div>
      {status === "laoding" ? (
        <Loader />
      ) : error ? (
        <p className="alert alert-danger">{error}</p>
      ) : (
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th>#</th>
              <th>Category</th>
              <th>Name</th>
              <th>Brand</th>
              <th>Price</th>
              <th>Count In Stock</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product?.category.category_name}</td>
                <td>{product.name}</td>
                <td>{product.brand}</td>
                <td>${product.price}</td>
                <td>{product.countInStock}</td>
                <td>
                  <button className="btn btn-outline-success">Edit</button>
                  <button
                    onClick={() => deleteProductHandler(product.id)}
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

export default AllProducts;
