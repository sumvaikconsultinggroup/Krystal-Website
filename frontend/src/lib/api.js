import axios from 'axios';

const API_BASE = process.env.REACT_APP_BACKEND_URL || '';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Products
export const getProducts = async (params = {}) => {
  const response = await api.get('/api/products', { params });
  return response.data;
};

export const getProduct = async (slug) => {
  const response = await api.get(`/api/products/${slug}`);
  return response.data;
};

// Projects
export const getProjects = async (params = {}) => {
  const response = await api.get('/api/projects', { params });
  return response.data;
};

export const getProject = async (slug) => {
  const response = await api.get(`/api/projects/${slug}`);
  return response.data;
};

// Blog
export const getBlogPosts = async (params = {}) => {
  const response = await api.get('/api/blog', { params });
  return response.data;
};

export const getBlogPost = async (slug) => {
  const response = await api.get(`/api/blog/${slug}`);
  return response.data;
};

// FAQs
export const getFAQs = async (params = {}) => {
  const response = await api.get('/api/faqs', { params });
  return response.data;
};

// Testimonials
export const getTestimonials = async (params = {}) => {
  const response = await api.get('/api/testimonials', { params });
  return response.data;
};

// Cities
export const getCities = async () => {
  const response = await api.get('/api/cities');
  return response.data;
};

export const getCity = async (slug) => {
  const response = await api.get(`/api/cities/${slug}`);
  return response.data;
};

// Design Studio
export const getColorFinishes = async (params = {}) => {
  const response = await api.get('/api/design-studio/colors', { params });
  return response.data;
};

export const getGlassOptions = async () => {
  const response = await api.get('/api/design-studio/glass');
  return response.data;
};

export const getHardware = async (params = {}) => {
  const response = await api.get('/api/design-studio/hardware', { params });
  return response.data;
};

// Downloads
export const getDownloads = async (params = {}) => {
  const response = await api.get('/api/downloads', { params });
  return response.data;
};

// Settings
export const getSettings = async () => {
  const response = await api.get('/api/settings');
  return response.data;
};

// Leads
export const createLead = async (data) => {
  const response = await api.post('/api/leads', data);
  return response.data;
};

export default api;
