import axios from "axios";

const fetchCategories = async () => {
  const response = await axios.get("/api/category/list/");
  return response.data;
};

const createCategory = async (data) => {
  const { user } = data;

  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  };
  const response = await axios.post("/api/category/create/", data, config);
  return response.data;
};

const updateCategory = async (data) => {
  const { id, user } = data;
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  };
  const response = await axios.put(`/api/category/update/${id}/`, data, config);
  return response.data;
};

const deleteCategory = async (data) => {
  const { user, id } = data;
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  };
  const response = await axios.delete(`/api/category/delete/${id}/`, config);
  return response.data;
};

const categoriesService = {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};

export default categoriesService;
