<script>
	import api from '$lib/api';
	import { accessToken, user } from '$lib/stores/auth';
	import { refresh, logout } from '$lib/services/authService';
	import { onMount } from 'svelte';

	let data = '';
	let loading = true;

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
			data = res.data;
		} else {
			data = '';
		}

		loading = false;
	});
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-100">
	<div class="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
		<h1 class="mb-4 text-2xl font-bold text-gray-800">Protected Page</h1>
		{#if loading}
			<p class="text-gray-500">Loading...</p>
		{:else if !data}
			<p class="mb-6 text-red-500">You are not authorized. Please log in.</p>
			<a
				href="/login"
				class="w-full rounded-lg bg-red-600 py-2 text-white transition hover:bg-red-700"
				>Go to Login</a
			>
		{:else}
			<p class="mb-6 text-gray-600">{data.message}</p>
			{#if $user}
				<p class="mb-4 text-gray-700">Welcome, {$user.name}!</p>
			{/if}

			<button
				on:click={logout}
				class="w-full rounded-lg bg-red-600 py-2 text-white transition hover:bg-red-700"
			>
				Logout
			</button>
		{/if}
	</div>
</div>
