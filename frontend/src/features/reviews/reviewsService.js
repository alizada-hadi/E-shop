import axios from "axios";

const createReview = async (data) => {
  const { user, id } = data;
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  };

  const response = await axios.post(`/api/product/${id}/review/`, data, config);
  return response.data;
};

const reviewsService = {
  createReview,
};

export default reviewsService;
