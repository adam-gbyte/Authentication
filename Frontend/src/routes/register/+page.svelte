<script>
	import { register } from '$lib/services/authService';
	let name = '';
	let email = '';
	let password = '';
	let message = '';

	async function handleSubmit() {
		try {
			const res = await register({ name, email, password });
			message = res.message;
		} catch (err) {
			message = err.response?.data?.message || 'Error';
		}
	}
</script>

<h1>Register</h1>
<form on:submit|preventDefault={handleSubmit}>
	<input placeholder="Name" bind:value={name} />
	<input placeholder="Email" bind:value={email} />
	<input placeholder="Password" type="password" bind:value={password} />
	<button type="submit">Register</button>
</form>
<p>{message}</p>
