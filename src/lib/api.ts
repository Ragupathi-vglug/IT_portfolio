import axios from 'axios';
import { API_BASE_URL } from '../config';

export const AUTH_TOKEN_KEY = 'facultyAdminToken';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Attach the admin's JWT (if present) to every outgoing request.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// If the token is invalid/expired, clear it so the app knows to log the admin out.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem(AUTH_TOKEN_KEY);
    }
    return Promise.reject(error);
  }
);

export default api;

// ---------------------------------------------------------------------------
// Faculty photo URL helper
// ---------------------------------------------------------------------------
export function facultyPhotoUrl(filename: string | null | undefined): string | null {
  if (!filename) return null;
  return `${API_BASE_URL}/uploads/faculty/${filename}`;
}

// ---------------------------------------------------------------------------
// Auth API
// ---------------------------------------------------------------------------
export async function loginRequest(username: string, password: string) {
  const { data } = await api.post('/api/login', { username, password });
  return data as { token: string; username: string };
}

// ---------------------------------------------------------------------------
// Faculty API
// ---------------------------------------------------------------------------
export interface FacultyRecord {
  id: number;
  photo: string | null;
  name: string;
  qualification: string;
  designation: string;
}

export async function fetchFaculty(): Promise<FacultyRecord[]> {
  const { data } = await api.get('/api/faculty');
  return data;
}

export interface FacultyFormData {
  name: string;
  qualification: string;
  designation: string;
  photoFile?: File | null;
}

function buildFacultyFormData(payload: FacultyFormData): FormData {
  const form = new FormData();
  form.append('name', payload.name);
  form.append('qualification', payload.qualification);
  form.append('designation', payload.designation);
  if (payload.photoFile) {
    form.append('photo', payload.photoFile);
  }
  return form;
}

export async function createFaculty(payload: FacultyFormData): Promise<FacultyRecord> {
  const { data } = await api.post('/api/faculty', buildFacultyFormData(payload), {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

export async function updateFaculty(id: number, payload: FacultyFormData): Promise<FacultyRecord> {
  const { data } = await api.put(`/api/faculty/${id}`, buildFacultyFormData(payload), {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

export async function deleteFaculty(id: number): Promise<void> {
  await api.delete(`/api/faculty/${id}`);
}
