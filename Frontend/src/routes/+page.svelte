<script>
	import { LogIn, LayoutDashboard } from 'lucide-svelte';
</script>

<div
	class="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white p-6 text-gray-800 transition-all dark:from-gray-900 dark:to-gray-800 dark:text-gray-100"
>
	<div
		class="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-lg transition-all dark:border-gray-700 dark:bg-gray-900"
	>
		<h1 class="mb-4 text-4xl font-bold">Welcome to Authentication</h1>
		<p class="mb-8 text-gray-600 dark:text-gray-400">
			Selamat datang di sistem autentikasi modern. Silakan login untuk mengakses dashboard Anda.
		</p>

		<div class="flex flex-col justify-center gap-4 sm:flex-row">
			<a
				href="/login"
				class="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-all hover:bg-blue-700 dark:hover:bg-blue-500"
			>
				<LogIn class="h-5 w-5" />
				<span>Login</span>
			</a>

			<a
				href="/dashboard"
				class="flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-all hover:bg-gray-100 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-800"
			>
				<LayoutDashboard class="h-5 w-5" />
				<span>Dashboard</span>
			</a>
		</div>

		<footer class="mt-10 text-sm text-gray-400 dark:text-gray-500">
			&copy; 2025 Authentication App - All Rights Reserved
		</footer>
	</div>
</div>
