import axios from "axios";

const BASE = "http://localhost:8081/api/transactions";

export const addTransaction = (data) => axios.post(BASE, data);
export const getTransactions = (params) => axios.get(BASE, { params });
export const deleteTransaction = (id) => axios.delete(`${BASE}/${id}`);
export const getSummary = () => axios.get(`${BASE}/summary`);
