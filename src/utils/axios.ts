import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const instance = axios.create({
  baseURL: `${API_URL}/api/`,
  timeout: 5000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const fetchGet = async (endpoint: string, params: {}) => {
  try {
    const res = await instance.get(endpoint, { params });
    return res.data;
  } catch (err) {
    return err;
  }
};

export const fetchPost = async (endpoint: string, params: {}) => {
  try {
    const res = await instance.post(endpoint, params);
    return res.data;
  } catch (err) {
    return err;
  }
};
