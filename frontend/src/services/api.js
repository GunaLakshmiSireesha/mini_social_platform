import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_BASE,
});

export function getToken() {
  return localStorage.getItem('token');
}

export function authHeaders() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export function getUserFromToken(token) {
  if (!token) return null;
  try {
    const payload = token.split('.')[1];
    const json = JSON.parse(atob(payload));
    return { email: json.email, userId: json.userId };
  } catch (err) {
    return null;
  }
}

export async function registerUser(data) {
  return api.post('/auth/register', data).then(r => r.data);
}

export async function loginUser(data) {
  return api.post('/auth/login', data).then(r => r.data);
}


export async function createPost(formData) {
  return api.post('/posts', formData, { headers: { ...authHeaders(), 'Content-Type': 'multipart/form-data' } }).then(r => r.data);
}

export async function getPosts() {
  return api.get('/posts').then(r => r.data);
}

export function getImageUrl(postId) {
  return `http://localhost:5000/api/posts/${postId}/image`;
}
