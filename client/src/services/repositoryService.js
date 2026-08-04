import axios from "axios";

const API = "http://localhost:5000/api/v1";

export const getRepository = async () => {
  const response = await axios.get(`${API}/repository`);
  return response.data;
};