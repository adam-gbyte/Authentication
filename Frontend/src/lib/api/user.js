import { accessToken } from '$lib/stores/auth';

export async function getAllUsers() {
	const token = localStorage.getItem('accessToken');
	console.log('accessToken', accessToken);

	const res = await fetch('http://localhost:3000/api/user/users', {
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json'
		}
	});

	if (res.status === 403) {
		throw new Error('Akses ditolak: hanya admin yang boleh');
	}

	if (!res.ok) {
		const err = await res.json();
		throw new Error(err.message || 'Gagal mengambil data user');
	}

	return res.json();
}

export async function getUserById(id) {
	const token = localStorage.getItem('accessToken');

	const res = await fetch(`http://localhost:3000/api/user/id/${id}`, {
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json'
		},
		credentials: 'include' // penting jika backend pakai cookies untuk refresh token
	});

	if (!res.ok) {
		const errorData = await res.json();
		throw new Error(errorData.message || 'Gagal mengambil user');
	}

	return res.json();
}
