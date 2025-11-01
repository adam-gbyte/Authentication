// src/routes/(protected)/+layout.server.js
import { redirect } from '@sveltejs/kit';

export function load({ cookies }) {
	const refreshToken = cookies.get('refreshToken');

	if (!refreshToken) {
		throw redirect(302, '/login');
	}

	return {};
}
