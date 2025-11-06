// src/lib/api/auth.js
import { api } from './client.js';

export const registerUser = async (email, username, password) => {
	const res = await api.post('/auth/register', { email, username, password });
	return res.data;
};

export const verifyEmail = async (token) => {
	const res = await api.post(`/auth/verify/${token}`);
	return res.data;
};

export const loginUser = async (identifier, password) => {
	const res = await api.post('/auth/login', { identifier, password });
	// localStorage.setItem('accessToken', res.data.accessToken);
	return res.data;
};

export const refreshToken = async () => {
	const res = await api.post('/auth/refresh');
	return res;
};

export const logoutUser = async () => {
	const res = await api.post('/auth/logout');
	localStorage.removeItem('accessToken');
	return res.data;
};
