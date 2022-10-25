import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "../features/categories/categoriesSlice";
import {
  filterProductByCategory,
  fetchProducts,
  reset,
} from "../features/products/productsSlice";
function Filter() {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  const filterHandler = (name) => {
    dispatch(filterProductByCategory(name));
  };
  const resetFilterProduct = () => {
    dispatch(fetchProducts());
  };
  return (
    <div>
      <button
        className="btn btn-outline-dark mx-1"
        style={{ borderRadius: "15px" }}
        onClick={resetFilterProduct}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          className="btn btn-outline-dark mx-1"
          style={{ borderRadius: "15px" }}
          key={category.id}
          onClick={() => filterHandler(category.category_name)}
        >
          {category.category_name}
        </button>
      ))}
    </div>
  );
}

export default Filter;
