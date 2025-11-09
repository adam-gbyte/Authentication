<script>
	import { loginUser } from '$lib/api/auth.js';
	import { goto } from '$app/navigation';
	import { Mail, Lock, LogIn, AlertCircle, Loader2, House } from 'lucide-svelte';

	let identifier = '';
	let password = '';
	let message = '';
	let loading = false;

	const handleLogin = async () => {
		message = '';
		loading = true;

		try {
			const res = await loginUser(identifier, password);
			message = res.message || 'Login berhasil!';
			goto('/dashboard');
		} catch (err) {
			message = err.response?.data?.message || 'Login gagal, periksa kembali data Anda.';
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
		<h1 class="mb-6 text-center text-3xl font-bold">Login Akun</h1>

		<form on:submit|preventDefault={handleLogin} class="space-y-4">
			<div class="relative">
				<Mail class="absolute left-3 top-3 h-5 w-5 text-gray-400" />
				<input
					type="text"
					bind:value={identifier}
					placeholder="Email atau Username"
					required
					class="w-full rounded-xl border border-gray-300 bg-gray-50 py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800"
				/>
			</div>

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

			<button
				type="submit"
				class="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-2 font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-70"
				disabled={loading}
			>
				{#if loading}
					<Loader2 class="h-5 w-5 animate-spin" />
					<span>Memproses...</span>
				{:else}
					<LogIn class="h-5 w-5" />
					<span>Login</span>
				{/if}
			</button>
		</form>

		{#if message}
			<div
				class="mt-4 flex items-center justify-center gap-2 text-sm text-red-600 dark:text-red-400"
			>
				<AlertCircle class="h-4 w-4" />
				<span>{message}</span>
			</div>
		{/if}

		<p class="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
			Belum punya akun?
			<a href="/register" class="text-blue-600 hover:underline">Daftar</a>
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
