import axios from 'axios';
export const API_BASE = 'http://localhost:5000/api';
export const api = axios.create({ baseURL: API_BASE });

export function getToken() { return localStorage.getItem('token'); }
export function authHeaders() { const token = getToken(); return token ? { Authorization: `Bearer ${token}` } : {}; }
export function getUserFromToken(token) {
  if (!token) return null;
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  } catch { return null; }
}


export async function registerUser(data) { return (await api.post('/auth/register', data)).data; }
export async function loginUser(data) { return (await api.post('/auth/login', data)).data; }

export async function createPost(formData) {
  return (await api.post('/posts', formData, { headers: { ...authHeaders(), 'Content-Type': 'multipart/form-data' } })).data;
}
export async function getPosts() { return (await api.get('/posts')).data; }
export function getImageUrl(postId){ return `http://localhost:5000/api/posts/${postId}/image`; }

export async function getFollowCounts(){ return (await api.get('/follow/counts', { headers: authHeaders() })).data; }
export async function getSuggestions(){ return (await api.get('/follow/suggestions', { headers: authHeaders() })).data; }
export async function followByEmail(email){ return (await api.post('/follow/follow', { emailToFollow: email }, { headers: authHeaders() })).data; }
export async function unfollowByEmail(email){ return (await api.post('/follow/unfollow', { emailToUnfollow: email }, { headers: authHeaders() })).data; }

export async function getConversation(email){ return (await api.get(`/messages/conversation/${encodeURIComponent(email)}`, { headers: authHeaders() })).data; }
