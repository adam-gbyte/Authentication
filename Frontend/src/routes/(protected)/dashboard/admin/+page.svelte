<script>
	import { onMount } from 'svelte';
	import { getAllUsers } from '$lib/api/user.js';
	import { goto } from '$app/navigation';

	let users = [];
	let error = '';

	onMount(async () => {
		try {
			const data = await getAllUsers();
			users = data.users;
		} catch (err) {
			error = err.message;

			if (error.includes('Akses ditolak')) {
				goto('/unauthorized');
			} else if (error.includes('token')) {
				goto('/login');
			}
		}
	});
</script>

<h1 class="mb-4 text-3xl font-bold">Daftar User</h1>

{#if error}
	<p class="text-red-600">{error}</p>
{:else if users.length === 0}
	<p>Tidak ada data user.</p>
{:else}
	<ul>
		{#each users as user}
			<li>{user.username} - {user.roles.join(', ')}</li>
		{/each}
	</ul>
{/if}
