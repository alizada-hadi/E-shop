import React, { useState } from "react";
import { Link } from "react-router-dom";
import { addToCart } from "../features/carts/cartsSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
} from "../features/carts/cartsSlice";
import Rating from "./Rating";
function Product({ product }) {
  const dispatch = useDispatch();
  const [itemAdded, setItemAdded] = useState(false);
  const { cartItems } = useSelector((state) => state.carts);

  const addItemHandler = (item) => {
    dispatch(addToCart(item));
    setItemAdded(true);
  };

  let qty = 0;
  cartItems.forEach((item) => {
    qty += item.quantity;
  });

  return (
    <div className="col-12 col-sm-8 col-md-6 col-lg-3">
      <div className="card product--card mb-3">
        <img src={product.cover_image} className="product--image" alt="" />
        <div className="card-title">
          <h3 className="product--title">
            <Link to={`/product/${product.id}`}>{product.name}</Link>
          </h3>
          <h6 className="product--category">
            Category : {product?.category?.category_name}
          </h6>
          <Rating
            value={product.rating}
            text={`${product.numOfReviews} reviews`}
            color="#e13249"
          />
        </div>
        <div className="card-body">
          <p className="product--desc">
            {product.description.substring(0, 50)}...
          </p>

          <div className="product--add--cart">
            <div className="product--price text-success">${product.price}</div>
            <button
              style={{ display: itemAdded ? "none" : "block" }}
              onClick={() => addItemHandler(product)}
              className="btn btn-danger"
            >
              Add To Cart
            </button>
            <div
              className="btn-group"
              role="group"
              aria-label="Default button group"
              style={{ display: itemAdded ? "block" : "none" }}
            >
              <button
                onClick={() => dispatch(decrementQuantity(product.id))}
                type="button"
                className="btn btn-outline-dark"
              >
                -
              </button>
              <button type="button" className="btn btn-outline-dark">
                {qty}
              </button>
              <button
                onClick={() => dispatch(incrementQuantity(product.id))}
                type="button"
                className="btn btn-outline-dark"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
