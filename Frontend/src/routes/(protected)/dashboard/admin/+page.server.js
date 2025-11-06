import { redirect, error } from '@sveltejs/kit';
import { requireRole } from '$lib/auth.js';

export function load({ locals }) {
	if (!requireRole(locals.user, ['admin'])) {
		throw error(403, 'Tidak punya izin');
	}
}
