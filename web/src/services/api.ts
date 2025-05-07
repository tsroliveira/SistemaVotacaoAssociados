
import axios from 'axios';

// Replace with your actual API URL
const API_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Associates API
export const associatesApi = {
  getAll: () => api.get('/associados'),
  getById: (id: number) => api.get(`/associados/${id}`),
  create: (data: any) => api.post('/associados', data),
  update: (id: number, data: any) => api.put(`/associados/${id}`, data),
  delete: (id: number) => api.delete(`/associados/${id}`),
};

// Voting Sessions API
export const votingSessionsApi = {
  getAll: () => api.get('/sessoes-votacao'),
  getById: (id: number) => api.get(`/sessoes-votacao/${id}`),
  create: (data: any) => api.post('/sessoes-votacao', data),
  update: (id: number, data: any) => api.put(`/sessoes-votacao/${id}`, data),
  delete: (id: number) => api.delete(`/sessoes-votacao/${id}`),
};

// Votes API
export const votesApi = {
  getAll: () => api.get('/votos'),
  getBySessionId: (sessionId: number) => api.get(`/votos/sessao/${sessionId}`),
  getByAssociateId: (associateId: number) => api.get(`/votos/associado/${associateId}`),
  castVote: (data: any) => api.post('/votos', data),
};

// Results API
export const resultsApi = {
  getBySessionId: (sessionId: number) => api.get(`/resultados/${sessionId}`),
};

export default api;
