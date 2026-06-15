import axios from "axios";

const BASE =
  "https://fintech-dashboard-production-b212.up.railway.app/api/transactions";
const AUTH =
  "https://fintech-dashboard-production-b212.up.railway.app/api/auth";

const getToken = () => localStorage.getItem("token");

const authHeaders = () => ({
  headers: { Authorization: `Bearer ${getToken()}` },
});

export const register = (data) => axios.post(`${AUTH}/register`, data);
export const login = (data) => axios.post(`${AUTH}/login`, data);

export const addTransaction = (data) => axios.post(BASE, data, authHeaders());
export const getTransactions = (params) =>
  axios.get(BASE, { ...authHeaders(), params });
export const deleteTransaction = (id) =>
  axios.delete(`${BASE}/${id}`, authHeaders());
export const getSummary = () => axios.get(`${BASE}/summary`, authHeaders());
