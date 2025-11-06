// src/hooks.server.js
export const handle = async ({ event, resolve }) => {
	const refreshToken = event.cookies.get('refreshToken');
	const userId = event.cookies.get('userId');
	const roles = event.cookies.get('roles');

	event.locals.user = null;

	if (refreshToken && userId) {
		try {
			event.locals.user = {
				id: userId,
				roles: roles ? JSON.parse(roles) : []
			};
		} catch {
			event.locals.user = { id: userId, roles: [] };
		}
	}

	return resolve(event);
};
