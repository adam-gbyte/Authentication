<script>
	import { logoutUser } from '$lib/api/auth.js';
	import { goto } from '$app/navigation';
	import { LogOut, Home, Users, LayoutDashboard } from 'lucide-svelte';

	async function handleLogout() {
		try {
			await logoutUser();
			goto('/login');
		} catch (err) {
			console.error('Logout gagal:', err);
		}
	}
</script>

<div
	class="flex min-h-screen flex-col bg-gradient-to-b from-blue-50 to-white text-gray-800 transition-all dark:from-gray-900 dark:to-gray-800 dark:text-gray-100"
>
	<nav
		class="border-b border-gray-200 bg-white/70 backdrop-blur-lg dark:border-gray-700 dark:bg-gray-900/70"
	>
		<div class="mx-auto flex max-w-6xl items-center justify-between p-4">
			<a
				href="/"
				class="flex items-center gap-2 text-xl font-bold text-blue-600 dark:text-blue-400"
			>
				<LayoutDashboard class="h-6 w-6" />
				<span>AuthApp</span>
			</a>

			<!-- 🔗 Navigasi -->
			<div class="flex items-center gap-4 text-sm font-medium">
				<a
					href="/"
					class="flex items-center gap-1 transition-colors hover:text-blue-600 dark:hover:text-blue-400"
				>
					<Home class="h-4 w-4" />
					<span>Home</span>
				</a>
				<a
					href="/dashboard"
					class="flex items-center gap-1 transition-colors hover:text-blue-600 dark:hover:text-blue-400"
				>
					<LayoutDashboard class="h-4 w-4" />
					<span>Dashboard</span>
				</a>

				<button
					on:click={handleLogout}
					class="ml-2 flex items-center gap-1 rounded-xl bg-red-600 px-3 py-1.5 font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-70"
				>
					<LogOut class="h-4 w-4" />
					<span>Logout</span>
				</button>
			</div>
		</div>
	</nav>

	<!-- 📦 Area konten -->
	<main class="mx-auto w-full max-w-6xl flex-1 p-6">
		<slot />
	</main>

	<!-- ⚙️ Footer -->
	<footer
		class="border-t border-gray-200 py-4 text-center text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400"
	>
		&copy; 2025 Authentication App — Built with ❤️ using Svelte
	</footer>
</div>
