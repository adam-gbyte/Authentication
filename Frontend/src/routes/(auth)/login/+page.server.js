// src/routes/login/+page.server.js
import { redirect } from '@sveltejs/kit';

export function load({ locals }) {
	if (locals.user) {
		throw redirect(302, '/dashboard'); // sudah login → redirect
	}
}
