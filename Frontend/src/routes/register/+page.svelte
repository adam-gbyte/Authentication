<script>
	import { register } from '$lib/services/authService';

	let username = '';
	let email = '';
	let password = '';
	let message = '';

	async function handleSubmit() {
		try {
			const res = await register({ username, email, password });
			message = res.message;
		} catch (err) {
			message = err.response?.data?.message || 'Error';
		}
	}

	console.log("message", message);
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-100">
	<div class="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
		<h1 class="mb-6 text-center text-2xl font-bold text-gray-800">Register</h1>

		<form on:submit|preventDefault={handleSubmit} class="space-y-4">
			<input
				placeholder="Username"
				type="text"
				bind:value={username}
				class="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
			/>

			<input
				placeholder="Email"
				type="email"
				bind:value={email}
				class="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
			/>

			<input
				placeholder="Password"
				type="password"
				bind:value={password}
				class="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
			/>

			<button
				type="submit"
				class="w-full rounded-lg bg-green-600 py-2 text-white transition hover:bg-green-700"
			>
				Register
			</button>
		</form>

		{#if message}
			<p class="mt-4 text-center text-sm text-gray-700">{message}</p>
		{/if}

		<p class="mt-6 text-center text-sm text-gray-500">
			Sudah punya akun?
			<a href="/login" class="text-green-600 hover:underline">Login di sini</a>
		</p>
	</div>
</div>
