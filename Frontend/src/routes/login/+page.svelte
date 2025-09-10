<script>
	import { login } from '$lib/services/authService';
	import { goto } from '$app/navigation';
	let email = '';
	let password = '';
	let message = '';

	async function handleLogin() {
		try {
			await login({ email, password });
			goto('/protected');
		} catch (err) {
			message = err.response?.data?.message || 'Error';
		}
	}
</script>

<h1>Login</h1>
<form on:submit|preventDefault={handleLogin}>
	<input placeholder="Email" bind:value={email} />
	<input placeholder="Password" type="password" bind:value={password} />
	<button type="submit">Login</button>
</form>
<p>{message}</p>
