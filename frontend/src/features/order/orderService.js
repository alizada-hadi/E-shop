import axios from "axios";
import storage from "redux-persist/lib/storage";

const create_order = async (data) => {
  const { user } = data;
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  };
  const response = await axios.post(`/api/order/create/`, data, config);
  return response.data;
};

const order_detail = async (data) => {
  const { user, params } = data;
  const { id } = params;
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  };
  const response = await axios.get(`/api/order/detail/${id}`, config);
  return response.data;
};

const make_payment = async (data) => {
  const { user, params } = data;
  const { id } = params;
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  };
  const response = await axios.put(`/api/order/pay/${id}/`, "", config);
  return response.data;
};

const payment_intend = async (data) => {
  const { user } = data;
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  };
  const response = await axios.post("/api/payment/info/", data, config);
  return response.data;
};

// ! fetch users orders

const userOrders = async (user) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  };
  const response = await axios.get("/api/orders/mine", config);
  return response.data;
};

const allOrders = async (user) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  };
  const response = await axios.get("/api/order/list/", config);
  return response.data;
};

const updateOrderAsDelivered = async (data) => {
  const { user, id } = data;
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  };
  const response = await axios.put(`/api/order/deliver/${id}/`, "", config);
  return response.data;
};

const deleteOrder = async (data) => {
  const { user, id } = data;
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  };
  const response = await axios.delete(`/api/order/${id}/delete/`, config);
  return response.data;
};

const orderService = {
  create_order,
  order_detail,
  make_payment,
  payment_intend,
  userOrders,
  allOrders,
  updateOrderAsDelivered,
  deleteOrder,
};

export default orderService;
