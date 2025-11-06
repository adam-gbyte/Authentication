// src/routes/dashboard/+page.server.js
import { redirect } from '@sveltejs/kit';

export function load({ locals }) {
	if (!locals.user) {
		throw redirect(302, '/login');
	}

	return {
		user: locals.user
	};
}
