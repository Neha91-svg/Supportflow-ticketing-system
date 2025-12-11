import api from "../utils/api";

const getAll = async () => {
  const res = await api.get("/priorities");
  return res.data;
};

const create = async (data) => {
  const res = await api.post("/priorities", data);
  return res.data;
};

const update = async (id, data) => {
  const res = await api.put(`/priorities/${id}`, data);
  return res.data;
};

const remove = async (id) => {
  const res = await api.delete(`/priorities/${id}`);
  return res.data;
};

export default { getAll, create, update, remove };
