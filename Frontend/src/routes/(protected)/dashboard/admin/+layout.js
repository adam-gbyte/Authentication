import { browser } from '$app/environment';

export async function load() {
	if (browser) {
		const token = localStorage.getItem('accessToken');

		if (!token) {
			try {
				const res = await fetch('http://localhost:3000/api/user/users', {
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json'
					}
				});

				if (!res.ok) {
					throw new Error('Gagal mengambil data user!');
				}

				if (res.status === 403) {
					throw new Error('Akses ditolak: hanya admin yang boleh');
				}

				const data = await res.json();
				console.log('data', data);
			} catch (error) {
				setTimeout(() => {
					goto('/login');
				}, 3000);
			}
		}
	}

	return {};
}
