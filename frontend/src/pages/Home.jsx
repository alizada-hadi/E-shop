import React, { useEffect, useState } from "react";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productsSlice";
import { fetchCategories } from "../features/categories/categoriesSlice";
import Loader from "../components/Loader";
import { BsSearch } from "react-icons/bs";
import { useSearchParams } from "react-router-dom";
import Pagination from "../components/Pagination";
import Search from "../components/Search";
function Home() {
  const dispatch = useDispatch();
  let { products, status } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const [sortByName, setSortByName] = useState("");
  const [sortByPrice, setSortByPrice] = useState(0);
  const [sortedItems, setSortedItems] = useState([]);
  // * get the current posts
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  let paginatedProduct = [];
  if (sortedItems.length > 0) {
    paginatedProduct = sortedItems.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    );
  } else {
    paginatedProduct = products.slice(indexOfFirstProduct, indexOfLastProduct);
  }

  // * change the page
  const paginate = (number) => setCurrentPage(number);

  const searchTerm = searchParams.get("name") || "";

  const filterByCategory = (name) => {
    setSelectedCategory(name);
  };

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  if (selectedCategory) {
    paginatedProduct = paginatedProduct.filter(
      (product) => product.category.category_name === selectedCategory
    );
  }
  const handleChange = (e) => {
    const name = e.target.value;

    if (name) {
      setSearchParams({ name });
    } else {
      setSearchParams({});
    }
  };

  const resetFilter = () => {
    setSelectedCategory("");
  };

  // ! sort the items
  const sortHandler = (e) => {
    const value = e.target.value;
    var sorted = [];
    if (value == "") {
      sorted = products.slice().sort((a, b) => a.name.localeCompare(b.name));
      setSortedItems(sorted);
    } else if (value == 0) {
      sorted = [];
      sorted = products.slice().sort((a, b) => a.price.localeCompare(b.price));
      setSortedItems(sorted);
    }
  };

  return status === "loading" ? (
    <Loader />
  ) : (
    <div className="container">
      <div className="row mt-4">
        <div className="col-lg-2">
          <ul className="category">
            <li className="category--item active--item" onClick={resetFilter}>
              <span>All</span>
              <span className="badge bg-secondary badge-pill">
                {products.length}
              </span>
            </li>
            {categories.map((category) => (
              <li
                className="category--item my-2"
                key={category.id}
                onClick={() => filterByCategory(category.category_name)}
              >
                <span>{category.category_name}</span>
                <span className="badge bg-secondary badge-pill">
                  {category.number_of_products}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-lg-10">
          <div className="sort--search-wrapper">
            <div className="sort--product">
              <form>
                <select
                  name="sort"
                  onChange={sortHandler}
                  id=""
                  className="form-control"
                >
                  <option value="">Sort by...</option>
                  <option value={sortByName}>Name</option>
                  <option value={sortByPrice}>Price</option>
                </select>
              </form>
            </div>
            <div className="search">
              <form>
                <input
                  type="text"
                  name="q"
                  value={searchTerm}
                  className="form-control"
                  onChange={handleChange}
                />
                <BsSearch />
              </form>
            </div>
          </div>
          <div className="row mt-3">
            {paginatedProduct
              .filter((product) =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((product) => (
                <Product product={product} key={product.id} />
              ))}

            {products.length > productsPerPage && (
              <Pagination
                productsPerPage={productsPerPage}
                totalProducts={products.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
