<script>
	import { onMount } from 'svelte';
	import { getAllUsers } from '$lib/api/user.js';
	import { goto } from '$app/navigation';
	import { Users, AlertCircle, LayoutDashboard, Loader2 } from 'lucide-svelte';

	let users = [];
	let error = '';
	let loading = true;

	onMount(async () => {
		const token = localStorage.getItem('accessToken');

		try {
			const data = await getAllUsers(token);
			users = data;
		} catch (err) {
			error = err.message;

			if (error.includes('Akses ditolak')) {
				goto('/unauthorized');
			} else if (error.includes('token')) {
				goto('/login');
			}
		} finally {
			loading = false;
		}
	});
</script>

<div
	class="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6 text-gray-800 transition-all dark:from-gray-900 dark:to-gray-800 dark:text-gray-100"
>
	<div class="mx-auto max-w-5xl">
		<div
			class="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg transition-all dark:border-gray-700 dark:bg-gray-900"
		>
			<div class="mb-6 flex items-center justify-between">
				<h1 class="flex items-center gap-2 text-3xl font-bold">
					<Users class="h-7 w-7 text-blue-600 dark:text-blue-400" />
					<span>Daftar User</span>
				</h1>

				<a
					href="/dashboard"
					class="flex items-center gap-2 rounded-xl border border-gray-300 px-4 py-2 font-semibold text-gray-700 transition-all hover:bg-gray-100 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-800"
				>
					<LayoutDashboard class="h-5 w-5" />
					<span>Dashboard</span>
				</a>
			</div>

			{#if loading}
				<div class="flex justify-center py-10 text-gray-500">
					<Loader2 class="mr-2 h-6 w-6 animate-spin" />
					<span>Memuat data pengguna...</span>
				</div>
			{:else if error}
				<div class="flex items-center justify-center gap-2 text-red-600 dark:text-red-400">
					<AlertCircle class="h-5 w-5" />
					<span>{error}</span>
				</div>
			{:else if users.length === 0}
				<p class="text-center text-gray-500 dark:text-gray-400">Tidak ada data user.</p>
			{:else}
				<div class="overflow-x-auto">
					<table class="w-full border-collapse overflow-hidden rounded-xl shadow-sm">
						<thead class="bg-blue-100 text-left text-gray-700 dark:bg-gray-800 dark:text-gray-200">
							<tr>
								<th class="px-4 py-3">Username</th>
								<th class="px-4 py-3">Email</th>
								<th class="px-4 py-3">Roles</th>
								<th class="px-4 py-3">Verified</th>
								<th class="px-4 py-3">Created</th>
								<th class="px-4 py-3">Updated</th>
							</tr>
						</thead>
						<tbody class="divide-y divide-gray-200 dark:divide-gray-700">
							{#each users as user}
								<tr class="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800">
									<td class="px-4 py-3 font-medium">{user.username}</td>
									<td class="px-4 py-3">{user.email}</td>
									<td class="px-4 py-3">{user.roles.join(', ')}</td>
									<td class="px-4 py-3">
										{#if user.isVerified}
											<span
												class="rounded-lg bg-green-100 px-2 py-1 text-sm text-green-700 dark:bg-green-800 dark:text-green-300"
												>Yes</span
											>
										{:else}
											<span
												class="rounded-lg bg-red-100 px-2 py-1 text-sm text-red-700 dark:bg-red-800 dark:text-red-300"
												>No</span
											>
										{/if}
									</td>
									<td class="px-4 py-3 text-sm text-gray-500"
										>{new Date(user.createdAt).toLocaleString()}</td
									>
									<td class="px-4 py-3 text-sm text-gray-500"
										>{new Date(user.updatedAt).toLocaleString()}</td
									>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			{/if}
		</div>
	</div>
</div>
