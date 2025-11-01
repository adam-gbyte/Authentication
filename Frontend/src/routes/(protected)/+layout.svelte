<script>
	import { logoutUser } from '$lib/api/auth.js';
	import { goto } from '$app/navigation';

	async function handleLogout() {
		try {
			await logoutUser(); // panggil API logout
			goto('/login'); // redirect ke halaman login
		} catch (err) {
			console.error('Logout gagal:', err);
		}
	}
</script>

<button on:click={handleLogout}> Logout </button>

<slot />
