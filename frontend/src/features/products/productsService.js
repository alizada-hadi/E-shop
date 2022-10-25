import axios from "axios";

const fetchProducts = async () => {
  const response = await axios.get(`/api/product/list/`);
  return response.data;
};

const productDetail = async (id) => {
  const response = await axios.get(`/api/product/detail/${id}/`);
  return response.data;
};

const createProduct = async (data) => {
  const { user } = data;
  const config = {
    headers: {
      "Content-type": "multipart/form-data",
      Authorization: `Bearer ${user.token}`,
    },
  };
  const response = await axios.post("/api/product/create/", data, config);
  return response.data;
};

const removeProduct = async (data) => {
  const { user, id } = data;
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  };

  const response = await axios.delete(`/api/product/${id}/delete/`, config);
  return response.data;
};

const productsService = {
  fetchProducts,
  productDetail,
  createProduct,
  removeProduct,
};

export default productsService;
