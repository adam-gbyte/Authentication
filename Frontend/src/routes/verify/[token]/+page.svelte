<script>
	import { page } from '$app/stores';
	import { verifyEmail } from '$lib/api/auth.js';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let message = '';

	onMount(async () => {
		const token = $page.params.token;
		try {
			const res = await verifyEmail(token);
			message = res.message;
			setTimeout(() => {
				goto('/login');
			}, 3000);
		} catch (err) {
			message = err.response?.data?.message || 'Verifikasi gagal';
		}
	});
</script>

<h1>Verifikasi Akun</h1>
<p>{message}</p>
