import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetail } from "../features/products/productsSlice";
import { useParams, Link } from "react-router-dom";
import { createReview, resetReviews } from "../features/reviews/reviewsSlice";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import { addToCart } from "../features/carts/cartsSlice";
import { toast } from "react-toastify";
import { AiOutlineHeart } from "react-icons/ai";
function ProductDetail() {
  const dispatch = useDispatch();
  const { product, status } = useSelector((state) => state.products);
  const {
    reviews,
    status: reviewsStatus,
    error,
  } = useSelector((state) => state.reviews);
  const { user } = useSelector((state) => state.auth);
  const params = useParams();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    dispatch(getProductDetail(params.id));
  }, [dispatch]);

  const addCommentHandler = (e) => {
    e.preventDefault();
    if (reviewsStatus === "loading") {
      return <Loader />;
    } else if (reviewsStatus === "failed") {
      toast.error(error);
      setComment("");
      setRating(0);
      dispatch(resetReviews());
      dispatch(getProductDetail(params.id));
    } else {
      dispatch(
        createReview({ user, id: params.id, rating: rating, comment: comment })
      );
      dispatch(getProductDetail(params.id));
      dispatch(resetReviews());
      setComment("");
      setRating(0);
    }
  };

  const [selectedImage, setSelectedImage] = useState("");
  const changeImageHandler = (path) => {
    setSelectedImage(path);
  };

  const addToCartHandler = (product) => {
    dispatch(addToCart(product));
  };
  return status === "loading" ? (
    <Loader />
  ) : (
    <div className="container">
      <div className="row mt-4">
        <div className="col-lg-6">
          <img
            src={selectedImage ? selectedImage : product.cover_image}
            alt="product image not loaded"
            className="product--detail--img"
          />
          <div className="row">
            <div className="col-lg-2">
              <img
                src={product.cover_image}
                className="product--sub--imgs"
                alt=""
                onClick={() => changeImageHandler(product.cover_image)}
              />
            </div>
            {product.images &&
              product.images.map((image) => (
                <div key={image.id} className="col-lg-2">
                  <img
                    src={image.image}
                    alt="image not loaded"
                    className="product--sub--imgs"
                    onClick={() => changeImageHandler(image.image)}
                  />
                </div>
              ))}
          </div>
        </div>
        <div className="col-lg-6">
          <h2>
            {product.name} - {product.brand}
          </h2>
          <h5 style={{ color: "lightgray" }}>
            {product.category ? product.category.category_name : ""}
          </h5>
          <Rating
            value={product.rating}
            text={`${product.numOfReviews} reviews`}
            color="#e13249"
          />
          <p className="mt-3">{product.description}</p>

          <div className="current--price">
            <h3>Current Price : </h3>
            <span className="text-success">${product.price}</span>
          </div>

          <div className="avilable--colors">
            {product?.colors && <h4>Colors : </h4>}
            {product?.colors &&
              product.colors.map((color) => (
                <div>
                  <div
                    style={{
                      width: "25px",
                      height: "25px",
                      marginLeft: "1rem",
                      border: "2px solid #e13249",
                      borderRadius: "3px",
                      padding: "2px",
                      cursor: "pointer",
                      backgroundColor: `${color.color_hex}`,
                    }}
                  ></div>
                </div>
              ))}
          </div>

          <div className="my-2 available--sizes">
            {product?.sizes && <h4>Sizes : </h4>}
            {product?.sizes &&
              product.sizes.map((size) => (
                <span
                  style={{
                    marginLeft: "1rem",
                    fontSize: "1.2rem",
                    fontWeight: "500",
                  }}
                  key={size.size}
                >
                  {size.size}
                </span>
              ))}
          </div>

          <div className="mt-4">
            <button
              onClick={() => addToCartHandler(product)}
              className="add--cart--btn"
            >
              Add To Cart
            </button>
            <button className="like--product--btn">
              <AiOutlineHeart />
            </button>
          </div>
        </div>
      </div>

      <div className="col-lg-6 mt-4 mb-5">
        <hr />
        <h1>Reviews</h1>
        {product.reviews &&
          product?.reviews.map((review) => (
            <div key={review.id}>
              <h5>{review.name}</h5>
              <small>{review.created_at.substring(0, 10)}</small>
              <Rating value={review.rating} color="#e13249" />
              <p className="mt-2">{review.comment}</p>
              <hr />
            </div>
          ))}
        <h2>Leave a comment</h2>
        {user?.token ? (
          <form onSubmit={addCommentHandler}>
            <div>
              <label htmlFor="">Rating</label>
              <select
                name="rating"
                onChange={(e) => setRating(e.target.value)}
                className="form-control"
                value={rating}
                id=""
              >
                <option value="">Select Rating</option>
                <option value="1">1- Very Bad</option>
                <option value="2">2- Bad</option>
                <option value="3">3- Good</option>
                <option value="4">4- Very Good</option>
                <option value="5">5- Outstanding</option>
              </select>
            </div>

            <div className="mt-2">
              <label htmlFor="">Comment</label>
              <textarea
                name="comment"
                className="form-control"
                id=""
                cols="10"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="How this product looks like?"
              ></textarea>
            </div>
            <button className="mt-3 btn btn-primary">Comment</button>
          </form>
        ) : (
          <p className="alert alert-info">
            Login to leave a comment <Link to={"/signin"}>Login</Link>
          </p>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
