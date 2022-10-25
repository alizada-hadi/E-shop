import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createProduct } from "../features/products/productsSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { FaPlus } from "react-icons/fa";
import { ImCross } from "react-icons/im";
function CreateProduct() {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const { user } = useSelector((state) => state.auth);

  const { status } = useSelector((state) => state.products);

  // create the local state

  let colorLength = 0;
  let sizeLength = 0;
  let imageLength = 0;

  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
  const [cover_image, setCover_image] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [productColors, setProductColors] = useState([
    {
      color_hex: "",
    },
  ]);

  const [productSizes, setProductSizes] = useState([{ size: "" }]);

  colorLength = productColors?.length;
  sizeLength = productSizes?.length;
  imageLength = selectedImages?.length;

  const uploadImageHandler = (e) => {
    const file = e.target.files[0];
    setCover_image(file);
  };

  const selectedFiles = (e) => {
    let addedFiles = e.target.files;
    const addedFileArray = Array.from(addedFiles);
    setSelectedImages(addedFileArray);
  };

  const productCategories = categories.map((category) => (
    <option value={category.id} key={category.id}>
      {category.category_name}
    </option>
  ));

  const addField = () => {
    let newColor = { color_hex: "" };

    setProductColors([...productColors, newColor]);
  };

  const addSizeField = () => {
    let newSize = { size: "" };
    setProductSizes([...productSizes, newSize]);
  };

  const removeField = (index) => {
    const colors = productColors.map((color) => color.id !== index);
    console.log(colors);
  };

  const productColorChange = (index, e) => {
    let data = [...productColors];
    data[index][e.target.name] = e.target.value;
  };

  const productSizeChange = (index, e) => {
    let data = [...productSizes];
    data[index][e.target.name] = e.target.value;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProduct({
        user,
        category,
        name,
        brand,
        price,
        description,
        countInStock,
        cover_image,
        productColors,
        productSizes,
        colorLength,
        sizeLength,
        imageLength,
        selectedImages,
      })
    );
    toast.success("New product added to the stock ");
  };
  return status === "loading" ? (
    <Loader />
  ) : (
    <div className="container mt-4">
      <h2>Create New Product</h2>

      <div className="row">
        <form onSubmit={submitHandler}>
          <div className="col-lg-6">
            <div className="row">
              <div className="col-lg-6">
                <label htmlFor="category">Category</label>
                <select
                  name="category"
                  id=""
                  onChange={(e) => setCategory(e.target.value)}
                  className="form-control mt-2"
                >
                  <option value="#">Choose category</option>
                  {productCategories}
                </select>
              </div>
              <div className="col-lg-6">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control mt-2"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-lg-6">
                <label htmlFor="brand">Brand</label>
                <input
                  type="text"
                  className="form-control mt-2"
                  name="brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>
              <div className="col-lg-6">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  step="0.02"
                  className="form-control mt-2"
                  name="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-lg-6">
                <label htmlFor="countInStock">Count In Stock</label>
                <input
                  type="number"
                  className="form-control mt-2"
                  name="countInStock"
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                />
              </div>
              <div className="col-lg-6">
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  id=""
                  className="form-control mt-2"
                  cols="20"
                  rows="0"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What is special about your product..."
                ></textarea>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col">
                <label htmlFor="cover_image">Cover Image</label>
                <input
                  type="file"
                  className="form-control mt-2"
                  size="60"
                  name="cover_image"
                  onChange={uploadImageHandler}
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-lg-6">
                <label htmlFor="">Product Colors</label>
                {productColors.map((input, index) => {
                  return (
                    <div key={index}>
                      <div className="row">
                        <div className="col-lg-8">
                          <input
                            type="color"
                            name="color_hex"
                            onChange={(e) => productColorChange(index, e)}
                            className="form-control mt-2"
                          />
                        </div>
                        <div className="col-lg-4">
                          <button
                            type="button"
                            onClick={addField}
                            className="btn btn-primary btn-sm mt-2"
                          >
                            <FaPlus />
                          </button>
                          {productColors?.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeField(index)}
                              className="btn btn-danger btn-sm mt-2 mx-2"
                            >
                              <ImCross />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="col-lg-6">
                <label htmlFor="size">Product Size</label>
                {productSizes.map((input, index) => (
                  <div key={index}>
                    <div className="row">
                      <div className="col-lg-8">
                        <input
                          type="text"
                          className="form-control mt-2"
                          name="size"
                          onChange={(e) => productSizeChange(index, e)}
                        />
                      </div>
                      <div className="col-lg-4">
                        <button
                          type="button"
                          onClick={addSizeField}
                          className="btn btn-primary btn-sm mt-2"
                        >
                          <FaPlus />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="row mt-2">
              <div className="col">
                <label htmlFor="">Product Image</label>
                <input
                  type="file"
                  className="form-control mt-2"
                  name="images"
                  onChange={selectedFiles}
                  multiple
                  accept="image/png , image/jpeg , image/jpg"
                />
              </div>
            </div>
          </div>
          <button className="btn btn-dark mt-2 btn-lg">Save</button>
        </form>
        <div className="col-lg-6"></div>
      </div>
    </div>
  );
}

export default CreateProduct;
