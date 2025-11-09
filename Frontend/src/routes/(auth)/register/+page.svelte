<script>
	import { registerUser } from '$lib/api/auth.js';
	import { goto } from '$app/navigation';
	import { Mail, User, Lock, UserPlus, AlertCircle, Loader2, House } from 'lucide-svelte';

	let email = '';
	let username = '';
	let password = '';
	let message = '';
	let loading = false;

	const handleRegister = async () => {
		message = '';
		loading = true;

		try {
			const res = await registerUser(email, username, password);
			message = res.message || 'Registrasi berhasil!';
			goto('/login');
		} catch (err) {
			message = err.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.';
		} finally {
			loading = false;
		}
	};
</script>

<div
	class="flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-50 to-white p-6 text-gray-800 transition-all dark:from-gray-900 dark:to-gray-800 dark:text-gray-100"
>
	<div
		class="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-lg dark:border-gray-700 dark:bg-gray-900"
	>
		<h1 class="mb-6 text-center text-3xl font-bold">Daftar Akun</h1>

		<form on:submit|preventDefault={handleRegister} class="space-y-4">
			<!-- Username -->
			<div class="relative">
				<User class="absolute left-3 top-3 h-5 w-5 text-gray-400" />
				<input
					type="text"
					bind:value={username}
					placeholder="Username"
					required
					class="w-full rounded-xl border border-gray-300 bg-gray-50 py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800"
				/>
			</div>

			<!-- Email -->
			<div class="relative">
				<Mail class="absolute left-3 top-3 h-5 w-5 text-gray-400" />
				<input
					type="email"
					bind:value={email}
					placeholder="Email"
					required
					class="w-full rounded-xl border border-gray-300 bg-gray-50 py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800"
				/>
			</div>

			<!-- Password -->
			<div class="relative">
				<Lock class="absolute left-3 top-3 h-5 w-5 text-gray-400" />
				<input
					type="password"
					bind:value={password}
					placeholder="Password"
					required
					class="w-full rounded-xl border border-gray-300 bg-gray-50 py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800"
				/>
			</div>

			<!-- Tombol Register -->
			<button
				type="submit"
				class="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-2 font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-70"
				disabled={loading}
			>
				{#if loading}
					<Loader2 class="h-5 w-5 animate-spin" />
					<span>Memproses...</span>
				{:else}
					<UserPlus class="h-5 w-5" />
					<span>Daftar</span>
				{/if}
			</button>
		</form>

		<!-- Pesan -->
		{#if message}
			<div
				class="mt-4 flex items-center justify-center gap-2 text-sm text-red-600 dark:text-red-400"
			>
				<AlertCircle class="h-4 w-4" />
				<span>{message}</span>
			</div>
		{/if}

		<p class="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
			Sudah punya akun?
			<a href="/login" class="text-blue-600 hover:underline">Login</a>
		</p>

		<a
			href="/"
			class="mt-6 flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-all hover:bg-gray-100 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-800"
		>
			<House class="h-5 w-5" />
			<span>Home</span>
		</a>
	</div>
</div>
