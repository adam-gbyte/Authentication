<script>
	import { page } from '$app/stores';
	import { verifyEmail } from '$lib/api/auth.js';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { Loader2, CheckCircle2, XCircle } from 'lucide-svelte';

	let message = 'Memverifikasi akun Anda...';
	let status = 'loading'; // 'loading' | 'success' | 'error'

	onMount(async () => {
		const token = $page.params.token;
		try {
			const res = await verifyEmail(token);
			message = res.message || 'Email berhasil diverifikasi!';
			status = 'success';
			setTimeout(() => goto('/login'), 3000);
		} catch (err) {
			message =
				err.response?.data?.message || 'Verifikasi gagal. Token tidak valid atau sudah kadaluarsa.';
			status = 'error';
		}
	});
</script>

<div
	class="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white p-6 text-gray-800 transition-all dark:from-gray-900 dark:to-gray-800 dark:text-gray-100"
>
	<div
		class="w-full max-w-md space-y-4 rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-lg dark:border-gray-700 dark:bg-gray-900"
	>
		<h1 class="mb-2 text-2xl font-semibold">Verifikasi Akun</h1>

		{#if status === 'loading'}
			<div class="flex animate-pulse flex-col items-center space-y-2">
				<Loader2 class="h-10 w-10 animate-spin text-blue-500" />
				<p>{message}</p>
			</div>
		{:else if status === 'success'}
			<div class="flex flex-col items-center space-y-2">
				<CheckCircle2 class="h-12 w-12 text-green-500" />
				<p class="text-green-600">{message}</p>
				<p class="text-sm text-gray-500">Mengalihkan ke halaman login...</p>
			</div>
		{:else if status === 'error'}
			<div class="flex flex-col items-center space-y-2">
				<XCircle class="h-12 w-12 text-red-500" />
				<p class="text-red-600">{message}</p>
				<a href="/register" class="mt-2 text-sm text-blue-500 hover:underline">Daftar ulang</a>
			</div>
		{/if}
	</div>

	<footer class="mt-6 text-sm text-gray-400">
		&copy; {new Date().getFullYear()} - Aplikasi Anda
	</footer>
</div>
