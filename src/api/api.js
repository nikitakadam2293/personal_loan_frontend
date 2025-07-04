import axios from "axios";

const API_BASE = 'http://localhost:8080/api/rate';

export const calculateRate = (data) => axios.post(`${API_BASE}/calculate_rate`,data);
export const calculateEmi  = (data) => axios.post(`${API_BASE}/calculate_emi`,data);
export const compareScenarios =(data) => axios.post(`${API_BASE}/compare`,data);
export const getAllApplicants =() => axios.get(`${API_BASE}/getall`);
export const getApplicantById = (id) => axios.get(`${API_BASE}/${id}`);
