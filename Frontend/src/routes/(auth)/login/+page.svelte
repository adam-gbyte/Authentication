<script>
	import { loginUser } from '$lib/api/auth.js';
	import { goto } from '$app/navigation';

	let identifier = '';
	let password = '';
	let message = '';

	const handleLogin = async () => {
		try {
			const res = await loginUser(identifier, password);
			localStorage.setItem('accessToken', res.accessToken);
			message = res.message;
			goto('/dashboard');
		} catch (err) {
			message = err.response?.data?.message || 'Login gagal';
		}
	};
</script>

<h1>Login</h1>
<form on:submit|preventDefault={handleLogin}>
	<input type="text" bind:value={identifier} placeholder="Email atau Username" required />
	<input type="password" bind:value={password} placeholder="Password" required />
	<button type="submit">Login</button>
</form>

<p>{message}</p>
