import axios from "axios";
// import config from '../../app/config'
const register = async (data) => {
  const response = await axios.post("/api/accounts/register/", data);
  return response.data;
};

const login = async (data) => {
  const response = await axios.post("/api/accounts/login/", data);
  return response.data;
};

const logout = async () => {
  const response = await axios.post("/api/accounts/logout/");
  return response.data;
};

const profile = async (data) => {
  const { user } = data;

  const config = {
    headers: {
      "Content-type": "multipart/form-data",
      Authorization: `Bearer ${user.token}`,
    },
  };
  const response = await axios.post("/api/accounts/profile/", data, config);
  return response.data;
};

const getAllUsers = async (user) => {
  const config = {
    headers: {
      "Content-type": "multipart/form-data",
      Authorization: `Bearer ${user.token}`,
    },
  };
  const response = await axios.get("/api/accounts/users/", config);
  return response.data;
};

const updateUser = async (data) => {
  const { user, id } = data;
  const config = {
    headers: {
      "Content-type": "multipart/form-data",
      Authorization: `Bearer ${user.token}`,
    },
  };
  const response = await axios.put(
    `/api/accounts/user/${id}/update/`,
    "",
    config
  );
  return response.data;
};

const deleteUser = async (data) => {
  const { user, id } = data;
  const config = {
    headers: {
      "Content-type": "multipart/form-data",
      Authorization: `Bearer ${user.token}`,
    },
  };

  const response = await axios.delete(
    `/api/accounts/user/${id}/delete/`,
    config
  );
  return response.data;
};

const authService = {
  register,
  login,
  logout,
  profile,
  getAllUsers,
  updateUser,
  deleteUser,
};

export default authService;
