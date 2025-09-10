import axios from 'axios';

const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	withCredentials: true // penting untuk kirim & terima cookie (refresh token)
});

export default api;
