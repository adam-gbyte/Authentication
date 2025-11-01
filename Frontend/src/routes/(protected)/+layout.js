// src/routes/(protected)/+layout.js
import { browser } from '$app/environment';
import { goto } from '$app/navigation';

export async function load({ fetch }) {
	if (browser) {
		const token = localStorage.getItem('accessToken');
		if (!token) {
			try {
				const res = await fetch('http://localhost:3000/api/auth/refresh', {
					method: 'POST',
					credentials: 'include'
				});

				if (!res.ok) {
					throw new Error('Gagal refresh token');
				}

				const data = await res.json();

				if (data.accessToken) {
					localStorage.setItem('accessToken', data.accessToken);
					console.log('AccesToken barudisimpan');
				} else {
					throw new Error('Access token tidak dikirim dari server');
				}
			} catch (error) {
				setTimeout(() => {
					goto('/login');
				}, 3000);
			}
		}
	}

	return {};
}
