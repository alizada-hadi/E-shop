import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/Loader";
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../features/categories/categoriesSlice";
import { AiOutlineEdit } from "react-icons/ai";
import { FiTrash } from "react-icons/fi";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

function Category() {
  const dispatch = useDispatch();
  const { categories, status } = useSelector((state) => state.categories);
  const { user } = useSelector((state) => state.auth);
  const [modal, setModal] = useState(false);

  const [formData, setFormData] = useState({
    user,
    name: "",
  });
  const { name } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (formData.id && formData.name) {
      dispatch(updateCategory(formData));
    } else {
      dispatch(createCategory(formData));
    }
    setFormData({ name: "" });
    setModal(false);
  };

  const toggle = () => setModal(!modal);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const categoryEditHandler = (id, name) => {
    setModal(true);
    setFormData({
      user,
      id,
      name,
    });
  };

  const categoryDeleteHandler = (id) => {
    const ask = window.confirm(
      "Are you sure you want to delete this category? "
    );
    if (ask) {
      dispatch(deleteCategory({ user, id }));
      dispatch(fetchCategories());
    }
  };

  return status === "loading" ? (
    <Loader />
  ) : (
    <div className="container">
      {/* modal starts */}
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>New Category</ModalHeader>
        <ModalBody>
          <form onSubmit={submitHandler}>
            <div>
              <label htmlFor="">Name</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={onChange}
                className="form-control"
              />
            </div>
            <button className="btn btn-primary mt-3">Save</button>
          </form>
        </ModalBody>
      </Modal>
      {/* modal ends */}
      <div className="col-lg-9 m-auto">
        <div className="category--title">
          <h2 className="mt-5">Category List</h2>
          <button
            type="button"
            className="btn btn-primary mt-5"
            onClick={toggle}
          >
            Create
          </button>
        </div>

        <table className="table table-striped table-hover table-bordered mt-3">
          <thead>
            <tr>
              <th className="text-center">#</th>
              <th className="text-center">Category Name</th>
              <th className="text-center">Created At</th>
              <th className="text-center">Number of Product</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 &&
              categories.map((category) => (
                <tr key={category.id}>
                  <td className="text-center">{category.id}</td>
                  <td className="text-center">{category.category_name}</td>
                  <td className="text-center">{category.created_at}</td>
                  <td className="text-center">
                    <span className="badge bg-primary">
                      {category.number_of_products}
                    </span>
                  </td>
                  <td className="text-center">
                    <button
                      onClick={() =>
                        categoryEditHandler(category.id, category.category_name)
                      }
                      className="btn btn-outline-primary mx-2"
                    >
                      <AiOutlineEdit />
                    </button>
                    <button
                      onClick={() => categoryDeleteHandler(category.id)}
                      className="btn btn-outline-danger"
                    >
                      <FiTrash />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Category;
