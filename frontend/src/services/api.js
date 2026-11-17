import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3333/api/v1',
  timeout: 12000,
  headers: { 'Content-Type': 'application/json' }
});

api.interceptors.response.use((response) => response, (error) => {
  const message = error.response?.data?.error || (error.code === 'ECONNABORTED' ? 'A API demorou para responder.' : 'Não foi possível conectar à Lumina. Verifique se o servidor está ativo.');
  return Promise.reject(new Error(message));
});

export const chatService = {
  list: async () => (await api.get('/chats')).data.data,
  create: async (title = 'Nova conversa') => (await api.post('/chats', { title })).data.data,
  get: async (id) => (await api.get(`/chats/${id}`)).data.data,
  rename: async (id, title) => (await api.put(`/chats/${id}`, { title })).data.data,
  remove: async (id) => api.delete(`/chats/${id}`),
  addMessage: async (id, message) => (await api.post(`/chats/${id}/messages`, message)).data.data,
  ask: async (id, content) => (await api.post(`/chats/${id}/ask`, { content })).data.data
};
export const exerciseService = {
  list: async () => (await api.get('/exercises')).data.data
};
