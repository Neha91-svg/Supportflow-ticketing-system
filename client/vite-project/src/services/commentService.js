import api from "../utils/api";

const getComments = async (ticketId) => {
  const res = await api.get(`/comments/${ticketId}`);
  return res.data;
};

const addComment = async (data) => {
  const res = await api.post("/comments", data);
  return res.data;
};

export default { getComments, addComment };
