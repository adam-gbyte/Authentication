// src/lib/api/client.js
import axios from 'axios';

export const api = axios.create({
	baseURL: 'http://localhost:3000/api',
	withCredentials: true
});

// api.interceptors.request.use((config) => {
// 	const token = localStorage.getItem('accessToken');
// 	if (token) config.headers.Authorization = `Bearer ${token}`;
// 	return config;
// });

// api.interceptors.response.use(
// 	(response) => response,
// 	async (error) => {
// 		if (error.response?.status === 401) {
// 			try {
// 				const res = await fetch('http://localhost:3000/api/auth/refresh', {
// 					method: 'POST',
// 					credentials: 'include'
// 				});
// 				const data = await res.json();
// 				if (data.accessToken) {
// 					localStorage.setItem('accessToken', data.accessToken);
// 					error.config.headers.Authorization = `Bearer ${data.accessToken}`;
// 					return api.request(error.config);
// 				}
// 			} catch (err) {
// 				console.error('Auto refresh gagal:', err.message);
// 			}
// 		}
// 		return Promise.reject(error);
// 	}
// );
