import { writable, get } from 'svelte/store';
import { refreshToken } from '$lib/api/auth.js';

export const user = writable(null);
export const accessToken = writable(null);

export const setAccessToken = (token) => {
	accessToken.set(token);
};

export const getAccessToken = () => get(accessToken);

export const initAuth = async () => {
	try {
		const data = await refreshToken();
		setAccessToken(data.accessToken);
		user.set(data.user);
	} catch (err) {
		console.warn('Token refresh failed');
	}
};
