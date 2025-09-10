<script>
	import api from '$lib/api';
	import { accessToken, user } from '$lib/stores/auth';
	import { refresh, logout } from '$lib/services/authService';
	import { onMount } from 'svelte';

	let data = '';
	let unsub;

	onMount(async () => {
		let token;
		accessToken.subscribe((v) => (token = v));

		if (!token) {
			token = await refresh(); // coba refresh
		}

		if (token) {
			const res = await api.get('/protected', {
				headers: { Authorization: `Bearer ${token}` }
			});
			data = res.data.message;
		} else {
			data = 'Unauthorized';
		}
	});
</script>

<h1>Protected Page</h1>
<p>{data}</p>
<button on:click={logout}>Logout</button>
