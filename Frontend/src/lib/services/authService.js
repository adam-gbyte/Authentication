import api from '../api';
import { accessToken, user } from '../stores/auth';

export async function register(data) {
	const res = await api.post('/auth/register', data);
	return res.data;
}

export async function login(credentials) {
	const res = await api.post('/auth/login', credentials);
	accessToken.set(res.data.accessToken);
	user.set(res.data.user);
}

export async function refresh() {
	try {
		const res = await api.post('/auth/refresh');
		accessToken.set(res.data.accessToken);
		return res.data.accessToken;
	} catch (err) {
		logout();
	}
}

export async function logout() {
	await api.post('/auth/logout');
	accessToken.set(null);
	user.set(null);
}
