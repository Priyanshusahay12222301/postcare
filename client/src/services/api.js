import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Products
export const getProducts = () => api.get('/products');
export const getProductById = (id) => api.get(`/products/${id}`);
export const getProductsByCategory = (category) => api.get(`/products/category/${category}`);

// Orders
export const createOrder = (orderData) => api.post('/orders', orderData);
export const getOrderById = (id) => api.get(`/orders/${id}`);
export const getOrderByOrderId = (orderId) => api.get(`/orders/order/${orderId}`);

// Recommendations
export const getRecommendations = (orderId) => api.get(`/recommendations/${orderId}`);

// Coupons
export const generateCoupon = (orderId) => api.post('/coupons/generate', { orderId });
export const validateCoupon = (code) => api.get(`/coupons/validate/${code}`);

export default api;
