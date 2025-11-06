// Helper
// src/lib/auth.js
export function requireRole(user, allowedRoles = []) {
	if (!user) return false;
	return allowedRoles.some((role) => user.roles.includes(role));
}
