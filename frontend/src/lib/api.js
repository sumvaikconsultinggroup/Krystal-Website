import axios from 'axios';
import {
  ALL_PRODUCTS,
  PROJECTS,
  BLOG_POSTS,
  FAQS,
  TESTIMONIALS,
  CITIES,
  COLOR_FINISHES,
  GLASS_OPTIONS,
  HARDWARE_ITEMS,
  DOWNLOADS,
  GLOBAL_SETTINGS,
} from './seedData';

const API_BASE = process.env.REACT_APP_BACKEND_URL || '';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Products
export const getProducts = async (params = {}) => {
  let products = ALL_PRODUCTS;
  if (params.category) {
    products = products.filter(p => p.category === params.category);
  }
  if (params.featured) {
    products = products.filter(p => p.is_featured);
  }
  return new Promise(resolve => setTimeout(() => resolve(products), 100));
};

export const getProduct = async (slug) => {
  const product = ALL_PRODUCTS.find(p => p.slug === slug);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (product) {
        resolve(product);
      } else {
        reject(new Error('Product not found'));
      }
    }, 100);
  });
};

// Projects
export const getProjects = async (params = {}) => {
  let projects = PROJECTS;
  if (params.featured) {
    projects = projects.filter(p => p.is_featured);
  }
  return new Promise(resolve => setTimeout(() => resolve(projects), 100));
};

export const getProject = async (slug) => {
  const project = PROJECTS.find(p => p.slug === slug);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (project) {
        resolve(project);
      } else {
        reject(new Error('Project not found'));
      }
    }, 100);
  });
};

// Blog
export const getBlogPosts = async (params = {}) => {
  return new Promise(resolve => setTimeout(() => resolve(BLOG_POSTS), 100));
};

export const getBlogPost = async (slug) => {
  const post = BLOG_POSTS.find(p => p.slug === slug);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (post) {
        resolve(post);
      } else {
        reject(new Error('Post not found'));
      }
    }, 100);
  });
};

// FAQs
export const getFAQs = async (params = {}) => {
  let faqs = FAQS;
  if (params.featured) {
    faqs = faqs.filter(f => f.is_featured);
  }
  return new Promise(resolve => setTimeout(() => resolve(faqs), 100));
};

// Testimonials
export const getTestimonials = async (params = {}) => {
  return new Promise(resolve => setTimeout(() => resolve(TESTIMONIALS), 100));
};

// Cities
export const getCities = async () => {
  return new Promise(resolve => setTimeout(() => resolve(CITIES), 100));
};

export const getCity = async (slug) => {
  const city = CITIES.find(c => c.slug === slug);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (city) {
        resolve(city);
      } else {
        reject(new Error('City not found'));
      }
    }, 100);
  });
};

// Design Studio
export const getColorFinishes = async (params = {}) => {
  return new Promise(resolve => setTimeout(() => resolve(COLOR_FINISHES), 100));
};

export const getGlassOptions = async () => {
  return new Promise(resolve => setTimeout(() => resolve(GLASS_OPTIONS), 100));
};

export const getHardware = async (params = {}) => {
  return new Promise(resolve => setTimeout(() => resolve(HARDWARE_ITEMS), 100));
};

// Downloads
export const getDownloads = async (params = {}) => {
  return new Promise(resolve => setTimeout(() => resolve(DOWNLOADS), 100));
};

// Settings
export const getSettings = async () => {
  return new Promise(resolve => setTimeout(() => resolve(GLOBAL_SETTINGS), 100));
};


// Leads
export const createLead = async (data) => {
  const response = await api.post('/api/leads', data);
  return response.data;
};

export default api;
