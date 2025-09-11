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

<div class="flex min-h-screen items-center justify-center bg-gray-100">
	<div class="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
		<h1 class="mb-6 text-center text-2xl font-bold text-gray-800">Login</h1>

		<form on:submit|preventDefault={handleLogin} class="space-y-4">
			<input
				placeholder="Email"
				type="email"
				bind:value={email}
				class="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
			/>

			<input
				placeholder="Password"
				type="password"
				bind:value={password}
				class="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
			/>

			<button
				type="submit"
				class="w-full rounded-lg bg-blue-600 py-2 text-white transition hover:bg-blue-700"
			>
				Login
			</button>
		</form>

		{#if message}
			<p class="mt-4 text-center text-sm text-red-500">{message}</p>
		{/if}
	</div>
</div>
