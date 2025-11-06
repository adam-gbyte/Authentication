<script>
	import { registerUser } from '$lib/api/auth.js';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let email = '';
	let username = '';
	let password = '';
	let message = '';

	const handleRegister = async () => {
		try {
			const res = await registerUser(email, username, password);
			message = res.message;

			goto('/login');
		} catch (err) {
			message = err.response?.data?.message || 'Terjadi kesalahan';
		}
	};
</script>

<h1>Daftar Akun</h1>

<form on:submit|preventDefault={handleRegister}>
	<input type="text" bind:value={username} placeholder="Username" required />
	<input type="email" bind:value={email} placeholder="Email" required />
	<input type="password" bind:value={password} placeholder="Password" required />
	<button type="submit">Register</button>
</form>

<p>{message}</p>
