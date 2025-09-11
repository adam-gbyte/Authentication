<script>
	import { page } from '$app/stores';
	import '../app.css';
</script>

<!-- Navbar -->
<nav class="bg-gray-900 px-6 py-4 text-white shadow-md">
	<div class="container mx-auto flex items-center justify-between">
		<div class="text-lg font-bold tracking-wide">Authentication App</div>

		<div class="space-x-6">
			<a
				href="/"
				class="transition hover:text-yellow-400"
				class:selected={$page.url.pathname === '/' ? 'text-yellow-400 font-semibold' : ''}
			>
				Home
			</a>
			<a
				href="/register"
				class="transition hover:text-yellow-400"
				class:selected={$page.url.pathname === '/register' ? 'text-yellow-400 font-semibold' : ''}
			>
				Register
			</a>
			<a
				href="/login"
				class="transition hover:text-yellow-400"
				class:selected={$page.url.pathname === '/login' ? 'text-yellow-400 font-semibold' : ''}
			>
				Login
			</a>
			<a
				href="/protected"
				class="transition hover:text-yellow-400"
				class:selected={$page.url.pathname === '/protected' ? 'text-yellow-400 font-semibold' : ''}
			>
				Protected
			</a>
		</div>
	</div>
</nav>

<!-- Content -->
<main class="container mx-auto">
	<slot />
</main>

<footer class="mt-10 bg-gray-900 px-6 py-4 text-center text-white">
	&copy; 2024 Authentication App. All rights reserved.
</footer>
